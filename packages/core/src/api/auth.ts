import { ApiClient, createApiClient } from './client';
import type { User } from '../types';

const SESSION_KEY = 'hms_session';

export interface Session {
    user: User;
    token: string; // Basic Auth token
}

export class AuthService {
    private client: ApiClient;
    private session: Session | null = null;

    constructor(baseUrl: string) {
        this.client = createApiClient({ baseUrl });
        this.loadSession();
    }

    private loadSession() {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            try {
                this.session = JSON.parse(stored);
                if (this.session?.token) {
                    this.client.setHeaders({
                        Authorization: `Basic ${this.session.token}`,
                    });
                }
            } catch (e) {
                console.error('Failed to load session', e);
                localStorage.removeItem(SESSION_KEY);
            }
        }
    }

    async login(username: string, password: string): Promise<User> {
        const token = btoa(`${username}:${password}`);

        // Test credentials against the API
        // We use the /session endpoint to verify credentials
        this.client.setHeaders({
            Authorization: `Basic ${token}`,
        });

        try {
            const response = await this.client.get<any>('/session');

            if (response.authenticated) {
                const user: User = {
                    id: response.user.uuid,
                    username: response.user.username || username,
                    personId: response.user.person.uuid,
                    roles: response.user.roles.map((r: any) => r.name),
                };

                this.session = { user, token };
                localStorage.setItem(SESSION_KEY, JSON.stringify(this.session));
                return user;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.client.setHeaders({ Authorization: '' }); // Clear header on failure
            throw error;
        }
    }

    logout() {
        this.session = null;
        localStorage.removeItem(SESSION_KEY);
        this.client.setHeaders({ Authorization: '' });

        // Optional: Call API to invalidate session if supported
        try {
            this.client.delete('/session').catch(() => { });
        } catch (e) {
            // Ignore logout errors
        }
    }

    getSession(): Session | null {
        return this.session;
    }

    isAuthenticated(): boolean {
        return !!this.session;
    }

    getClient(): ApiClient {
        return this.client;
    }
}

// Create a singleton instance pointing to a default OpenMRS URL
// In a real app, this URL might come from env vars
export const authService = new AuthService('http://localhost:8080/openmrs/ws/rest/v1');
