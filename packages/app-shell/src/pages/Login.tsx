import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Spinner } from '@openmrs-enterprise/ui-components';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import './Login.css';

interface LoginProps {
    toggleTheme?: () => void;
    currentTheme?: 'light' | 'dark';
}

export const Login: React.FC<LoginProps> = ({ toggleTheme, currentTheme }) => {
    const { t } = useTranslation();
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
            setError(t('auth.loginError'));
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

            <div className="login-box">
                <div className="login-header">
                    <div className="logo">🏥</div>
                    <h1>{t('auth.loginTitle')}</h1>
                    <p>{t('auth.loginSubtitle')}</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}

                        <Input
                            id="username"
                            label={t('auth.username')}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />

                        <Input
                            id="password"
                            label={t('auth.password')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span style={{ marginLeft: '0.5rem' }}>{t('auth.loggingIn')}</span>
                                </>
                            ) : t('auth.loginButton')}
                        </Button>
                    </form>
                </Card>

                <div className="login-footer">
                    <LanguageSwitcher />
                </div>
            </div>

            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
        </div>
    );
};
