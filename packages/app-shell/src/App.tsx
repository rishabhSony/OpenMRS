import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Shell, ToastProvider, Spinner } from '@openmrs-enterprise/ui-components';
import type { NavItem } from '@openmrs-enterprise/ui-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Patients } from './pages/Patients';
import { Clinical } from './pages/Clinical';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Appointments } from './pages/Appointments';
import './App.css';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={
                            <ProtectedRoute>
                                <AppContent />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ToastProvider>
    );
}

function AppContent() {
    const { user, logout } = useAuth();

    const navItems: NavItem[] = [
        { label: 'Dashboard', path: '/', icon: <span>📊</span> },
        { label: 'Patients', path: '/patients', icon: <span>📋</span> },
        { label: 'Clinical', path: '/clinical', icon: <span>🏥</span> },
        { label: 'Appointments', path: '/appointments', icon: <span>📅</span> },
        { label: 'Reports', path: '/reports', icon: <span>📈</span> },
    ];

    const shellUser = {
        name: user?.username || 'User',
        initials: user?.username?.substring(0, 2).toUpperCase() || 'US'
    };

    return (
        <Shell
            title="HMS"
            subtitle="Hospital Management System"
            logo={
                <img src="/hms-logo.png" alt="HMS Logo" width="32" height="32" style={{ borderRadius: '8px' }} />
            }
            user={shellUser}
            items={navItems}
            onLogout={logout}
        >
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/clinical" element={<Clinical />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Shell>
    );
}

export default App;
