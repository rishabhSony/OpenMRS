/**
 * API client utilities for OpenMRS Enterprise
 */

export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    headers?: Record<string, string>;
}

/**
 * Generic API Client for communicating with the OpenMRS REST API.
 * Handles common tasks like setting headers, managing timeouts, and parsing responses.
 */
export class ApiClient {
    private baseUrl: string;
    private headers: Record<string, string>;
    private timeout: number;

    /**
     * Creates an instance of ApiClient.
     * @param {ApiConfig} config - The configuration object for the API client.
     */
    constructor(config: ApiConfig) {
        this.baseUrl = config.baseUrl;
        this.headers = {
            'Content-Type': 'application/json',
            ...(config.headers || {}),
        };
        this.timeout = config.timeout || 30000; // Default to 30 seconds
    }

    public setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    /**
     * Sets a custom header for all subsequent requests.
     * @param {string} key - The header name.
     * @param {string} value - The header value.
     */
    setHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            ...this.headers,
            ...options.headers as Record<string, string>,
        };

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), this.timeout);
            config.signal = controller.signal;

            const response = await fetch(url, config);
            clearTimeout(id);

            if (response.status === 401) {
                // Handle unauthorized
                window.location.href = '/login';
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            return response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    public get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const queryString = params
            ? '?' + new URLSearchParams(params).toString()
            : '';
        return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
    }

    public post<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    public put<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

// Default API client instance (can be configured later)
export const createApiClient = (config: ApiConfig) => new ApiClient(config);
