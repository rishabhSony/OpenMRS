import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { User } from '@openmrs-enterprise/core';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUser(user);
        }
        setIsLoading(false);

        // Subscribe to auth changes (e.g. timeout logout)
        const unsubscribe = authService.subscribe((updatedUser) => {
            setUser(updatedUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const login = async (username: string, password: string) => {
        const user = await authService.login(username, password);
        setUser(user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
