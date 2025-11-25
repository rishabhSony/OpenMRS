import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, ApiClient } from '@openmrs-enterprise/core';

// Android Emulator loopback address. Use your machine's IP for iOS or physical device.
// const API_BASE_URL = 'http://10.0.2.2:8080/openmrs/ws/rest/v1';
const API_BASE_URL = 'http://192.168.29.252:8080/openmrs/ws/rest/v1';
const AUTH_TOKEN_KEY = 'auth_token';

export const mobileAuthService = {
    async init() {
        // Configure the core client
        authService.configure({ baseUrl: API_BASE_URL });

        // Set unauthorized handler
        authService.getClient().setOnUnauthorized(() => {
            this.logout();
        });

        // Restore session
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
            authService.getClient().setHeader('Authorization', `Basic ${token}`);
            return true;
        }
        return false;
    },

    async login(username: string, password: string) {
        const token = btoa(`${username}:${password}`);
        const authHeader = `Basic ${token}`;

        // Set header temporarily to test credentials
        authService.getClient().setHeader('Authorization', authHeader);

        try {
            // Verify credentials by fetching session
            const response = await authService.getClient().get<{ authenticated: boolean }>('/session');

            if (response.authenticated) {
                // Save token and keep header set
                await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
                return true;
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            // Clear header on failure
            authService.getClient().setHeader('Authorization', '');
            throw error;
        }
    },

    async logout() {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        authService.getClient().setHeader('Authorization', '');
        // Navigation reset should be handled by the UI consuming this
    }
};

// Polyfill btoa for React Native if needed (usually available in modern RN/Expo)
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64');
    };
}
