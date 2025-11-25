import { ApiClient } from './client';
import type { User } from '../types';

export interface Session {
    user: User;
    token: string; // Basic Auth token
    expiresAt?: string;
}

/**
 * Service for handling user authentication and session management.
 * Uses Basic Authentication and stores credentials/session data in localStorage.
 */
export class AuthService {
    private static instance: AuthService;
    private client: ApiClient;
    private session: Session | null = null;
    private readonly STORAGE_KEY = 'hms_session';
    private readonly TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
    private lastActivity: number = Date.now();
    private timeoutInterval: any = null;

    private constructor() {
        // Use relative path to go through Vite proxy
        this.client = new ApiClient({ baseUrl: '/openmrs/ws/rest/v1' });
        this.loadSession();
    }

    /**
     * Returns the singleton instance of AuthService.
     */
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public configure(config: { baseUrl: string }) {
        this.client.setBaseUrl(config.baseUrl);
    }

    private async loadSession() {
        // Try to restore session from backend (cookie)
        try {
            const response = await this.client.get<{ authenticated: boolean; user: any }>('/session');
            if (response.authenticated && response.user) {
                this.session = {
                    user: this.mapUser(response.user),
                    token: '', // No longer storing token
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                };
                this.startInactivityTimer();
                this.notifyListeners();
            } else {
                this.logout();
            }
        } catch (e) {
            console.warn('Failed to restore session', e);
            this.logout();
        }
    }

    private listeners: ((user: User | null) => void)[] = [];

    public subscribe(listener: (user: User | null) => void): () => void {
        this.listeners.push(listener);
        // Immediately notify new listener of current state
        listener(this.getUser());
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        const user = this.getUser();
        this.listeners.forEach(listener => listener(user));
    }

    /**
     * Authenticates a user with username and password.
     * @param {string} username
     * @param {string} password
     */
    public async login(username: string, password: string): Promise<User> {
        const token = btoa(`${username}:${password}`);
        // Send Basic Auth ONLY for this request
        this.client.setHeader('Authorization', `Basic ${token}`);

        try {
            // OpenMRS /session endpoint returns { authenticated: boolean, user: { ... } }
            const response = await this.client.get<{ authenticated: boolean; user: any }>('/session');

            // Clear header immediately after request
            this.client.setHeader('Authorization', '');

            if (!response.authenticated || !response.user) {
                throw new Error('Authentication failed');
            }

            const user = this.mapUser(response.user);

            this.session = {
                user,
                token: '', // Do not store token
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };

            // No need to save to localStorage anymore for auth
            this.startInactivityTimer();
            this.notifyListeners();
            return user;
        } catch (error) {
            this.client.setHeader('Authorization', '');
            throw error;
        }
    }

    public async logout() {
        this.stopInactivityTimer();
        this.session = null;
        this.client.setHeader('Authorization', '');

        try {
            await this.client.delete('/session');
        } catch (e) {
            console.warn('Failed to delete session on backend', e);
        }

        this.notifyListeners();
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    private mapUser(openMrsUser: any): User {
        return {
            id: openMrsUser.uuid,
            username: openMrsUser.username || openMrsUser.display,
            personId: openMrsUser.person.uuid,
            roles: openMrsUser.roles ? openMrsUser.roles.map((r: any) => r.display) : []
        };
    }

    // Removed saveSession as we don't store sensitive data in localStorage anymore

    public getUser(): User | null {
        return this.session?.user || null;
    }

    public isAuthenticated(): boolean {
        return !!this.session?.user; // Check user existence instead of token
    }

    public getClient(): ApiClient {
        return this.client;
    }

    // --- Session Timeout Logic ---

    private startInactivityTimer() {
        this.stopInactivityTimer(); // Clear existing if any
        this.lastActivity = Date.now();

        // Listen for activity
        window.addEventListener('mousemove', this.resetTimer);
        window.addEventListener('keydown', this.resetTimer);
        window.addEventListener('click', this.resetTimer);
        window.addEventListener('scroll', this.resetTimer);

        // Check for timeout every minute
        this.timeoutInterval = setInterval(() => {
            this.checkTimeout();
        }, 60 * 1000);
    }

    private stopInactivityTimer() {
        if (this.timeoutInterval) {
            clearInterval(this.timeoutInterval);
            this.timeoutInterval = null;
        }
        window.removeEventListener('mousemove', this.resetTimer);
        window.removeEventListener('keydown', this.resetTimer);
        window.removeEventListener('click', this.resetTimer);
        window.removeEventListener('scroll', this.resetTimer);
    }

    private resetTimer = () => {
        this.lastActivity = Date.now();
    }

    private checkTimeout() {
        if (!this.isAuthenticated()) return;

        const now = Date.now();
        if (now - this.lastActivity > this.TIMEOUT_MS) {
            console.warn('Session timed out due to inactivity');
            this.logout();
        }
    }
}

export const authService = AuthService.getInstance();
