import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Spinner } from '@openmrs-enterprise/ui-components';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

interface LoginProps {
    toggleTheme?: () => void;
    currentTheme?: 'light' | 'dark';
}

export const Login: React.FC<LoginProps> = ({ toggleTheme, currentTheme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {toggleTheme && (
                <button
                    onClick={toggleTheme}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {currentTheme === 'light' ? '🌙' : '☀️'}
                </button>
            )}
            <div className="login-content">
                <div className="login-header">
                    <div className="logo-placeholder" style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--color-primary)',
                        borderRadius: '12px',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>
                        +
                    </div>
                    <h1>Hospital Management</h1>
                    <p>Sign in to access your dashboard</p>
                </div>

                <Card className="login-card">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                background: 'rgba(255, 61, 0, 0.1)',
                                color: 'var(--color-error)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <Input
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner size="sm" /> : 'Sign In'}
                        </Button>
                    </form>
                </Card>

                <div className="login-footer">
                    <p>© 2023 OpenMRS Enterprise. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};
