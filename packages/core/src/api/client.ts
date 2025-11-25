/**
 * API client utilities for OpenMRS Enterprise
 */

export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    headers?: Record<string, string>;
}

export class ApiClient {
    private config: ApiConfig;

    constructor(config: ApiConfig) {
        this.config = {
            timeout: 30000,
            ...config,
        };
    }

    public setHeaders(headers: Record<string, string>) {
        this.config.headers = {
            ...this.config.headers,
            ...headers,
        };
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.config.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...this.config.headers,
            ...options.headers,
        };

        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal,
            });

            clearTimeout(id);

            if (response.status === 401) {
                // Handle unauthorized access (e.g., clear session, redirect)
                // For now, we just throw, but the AuthService will handle the cleanup
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            // Handle 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const queryString = params
            ? '?' + new URLSearchParams(params).toString()
            : '';
        return this.request<T>(`${endpoint}${queryString}`, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

// Default API client instance (can be configured later)
export const createApiClient = (config: ApiConfig) => new ApiClient(config);
