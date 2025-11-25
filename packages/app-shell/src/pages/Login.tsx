import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Input, Button, useToast, Spinner } from '@openmrs-enterprise/ui-components';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            showToast('Please enter both username and password', 'error');
            return;
        }

        setLoading(true);
        try {
            await login(username, password);
            showToast('Login successful', 'success');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            showToast('Invalid credentials', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <img src="/hms-logo.png" alt="HMS Logo" className="login-logo" />
                    <h1>Welcome Back</h1>
                    <p>Sign in to OpenMRS Enterprise</p>
                </div>

                <Card className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="login-btn"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {loading ? <Spinner size="sm" color="white" /> : 'Sign In'}
                        </Button>
                    </form>
                </Card>

                <div className="login-footer">
                    <p>Powered by OpenMRS Enterprise</p>
                </div>
            </div>
        </div>
    );
};
