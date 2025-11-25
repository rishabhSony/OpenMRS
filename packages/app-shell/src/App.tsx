import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Shell, ToastProvider } from '@openmrs-enterprise/ui-components';
import type { NavItem } from '@openmrs-enterprise/ui-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Patients } from './pages/Patients';
import { Clinical } from './pages/Clinical';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Appointments } from './pages/Appointments';
import { FormBuilderDemo } from './pages/FormBuilderDemo';
import './App.css';

import { ProtectedRoute } from './components/ProtectedRoute';

interface AppNavItem extends NavItem {
    roles?: string[];
}

const AppContent: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const allNavItems: AppNavItem[] = [
        { label: 'Dashboard', path: '/', icon: <span>📊</span> },
        { label: 'Patients', path: '/patients', icon: <span>📋</span> },
        { label: 'Clinical', path: '/clinical', icon: <span>🏥</span> },
        { label: 'Appointments', path: '/appointments', icon: <span>📅</span> },
        { label: 'Reports', path: '/reports', icon: <span>📈</span>, roles: ['System Developer'] },
    ];

    const navItems = allNavItems.filter(item => {
        if (!item.roles) return true;
        return user?.roles.some(role => item.roles!.includes(role));
    });

    const shellUser = {
        name: user?.username || 'User',
        initials: user?.username?.substring(0, 2).toUpperCase() || 'US'
    };

    return (
        <Routes>
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login toggleTheme={toggleTheme} currentTheme={theme} />
            } />

            <Route path="/*" element={
                <ProtectedRoute>
                    <Shell
                        title="HMS"
                        subtitle="Hospital Management System"
                        logo={
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'var(--color-primary)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>+</div>
                        }
                        user={shellUser}
                        items={navItems}
                        onLogout={logout}
                        actions={
                            <button
                                onClick={toggleTheme}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-primary)'
                                }}
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="/clinical" element={<Clinical />} />
                            <Route path="/appointments" element={<Appointments />} />
                            <Route path="/reports" element={
                                <ProtectedRoute allowedRoles={['System Developer']}>
                                    <Reports />
                                </ProtectedRoute>
                            } />
                            <Route path="/form-builder" element={
                                <ProtectedRoute allowedRoles={['System Developer']}>
                                    <FormBuilderDemo />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Shell>
                </ProtectedRoute>
            } />
        </Routes>
    );
};

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from './lib/queryClient';

const App: React.FC = () => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <ThemeProvider>
                <AuthProvider>
                    <ToastProvider>
                        <BrowserRouter>
                            <AppContent />
                        </BrowserRouter>
                    </ToastProvider>
                </AuthProvider>
            </ThemeProvider>
        </PersistQueryClientProvider>
    );
};

export default App;
