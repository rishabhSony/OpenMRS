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

    private constructor() {
        // Initialize with default demo URL
        this.client = new ApiClient({ baseUrl: 'https://demo.openmrs.org/openmrs/ws/rest/v1' });
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
                }
            } catch (e) {
                console.error('Failed to parse session', e);
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
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
            return user;
        } catch (error) {
            this.client.setHeader('Authorization', '');
            throw error;
        }
    }

    public logout() {
        this.session = null;
        this.client.setHeader('Authorization', '');
        localStorage.removeItem(this.STORAGE_KEY);
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
}

export const authService = AuthService.getInstance();
