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
    private readonly TIMEOUT_MS = 10 * 1000; // 10 seconds for testing
    private lastActivity: number = Date.now();
    private timeoutInterval: any = null;

    private constructor() {
        // Initialize with default URL (can be overridden by configure)
        this.client = new ApiClient({ baseUrl: 'https://dev3.openmrs.org/openmrs/ws/rest/v1' });
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

    private loadSession() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.session = JSON.parse(stored);
                if (this.session?.token) {
                    this.client.setHeader('Authorization', `Basic ${this.session.token}`);
                    this.startInactivityTimer();
                }
            } catch (e) {
                console.error('Failed to parse session', e);
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
    }

    private listeners: ((user: User | null) => void)[] = [];

    public subscribe(listener: (user: User | null) => void): () => void {
        this.listeners.push(listener);
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
        this.client.setHeader('Authorization', `Basic ${token}`);

        try {
            // OpenMRS /session endpoint returns { authenticated: boolean, user: { ... } }
            const response = await this.client.get<{ authenticated: boolean; user: any }>('/session');

            if (!response.authenticated || !response.user) {
                throw new Error('Authentication failed');
            }

            // Map OpenMRS user object to our User interface
            const user: User = {
                id: response.user.uuid,
                username: response.user.username || response.user.display,
                personId: response.user.person.uuid,
                roles: response.user.roles ? response.user.roles.map((r: any) => r.display) : []
            };

            this.session = {
                user,
                token,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };

            this.saveSession();
            this.startInactivityTimer();
            this.notifyListeners();
            return user;
        } catch (error) {
            this.client.setHeader('Authorization', '');
            throw error;
        }
    }

    public logout() {
        this.stopInactivityTimer();
        this.session = null;
        this.client.setHeader('Authorization', '');
        localStorage.removeItem(this.STORAGE_KEY);
        this.notifyListeners();
        window.location.href = '/login';
    }

    private saveSession() {
        if (this.session) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.session));
        }
    }

    public getUser(): User | null {
        return this.session?.user || null;
    }

    public isAuthenticated(): boolean {
        return !!this.session?.token;
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
