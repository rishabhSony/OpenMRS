import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface HeaderProps {
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    user?: {
        name: string;
        avatar?: string;
        initials: string;
    };
    actions?: React.ReactNode;
    onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    logo,
    title = 'HMS',
    subtitle = 'Hospital Management System',
    user,
    actions,
    onLogout
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header glass">
            <div className="header-content">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit', animation: 'none' }}>
                    {logo && <div className="logo-icon" style={{ animation: 'none' }}>{logo}</div>}
                    <div className="logo-text">
                        <h1 className="gradient-text" style={{ animation: 'none' }}>{title}</h1>
                        {subtitle && <p className="logo-subtitle">{subtitle}</p>}
                    </div>
                </Link>

                <div style={{ flex: 1 }} />

                <div className="header-actions">
                    {actions}
                    {user && (
                        <div className="user-profile" style={{ position: 'relative' }} ref={menuRef}>
                            <div
                                className="user-avatar"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                style={{
                                    cursor: 'pointer',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Cool purple gradient
                                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                                    border: '2px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} />
                                ) : (
                                    <span style={{ fontSize: '1.2rem' }}>😎</span> // Cool emoji or icon
                                )}
                            </div>

                            {isMenuOpen && (
                                <div className="dropdown-menu glass" style={{
                                    position: 'absolute',
                                    top: '120%',
                                    right: 0,
                                    width: '240px',
                                    background: 'var(--color-surface)',
                                    borderRadius: '12px',
                                    padding: '0.5rem',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    border: '1px solid var(--color-border)',
                                    zIndex: 1000
                                }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.5rem' }}>
                                        <p style={{ fontWeight: 'bold', margin: 0 }}>{user.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>Administrator</p>
                                    </div>

                                    <button
                                        className="dropdown-item"
                                        style={dropdownItemStyle}
                                        onClick={() => alert('System Logs module coming soon!')}
                                    >
                                        <span>📜</span> System Logs
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        style={dropdownItemStyle}
                                        onClick={() => window.open('https://demo.openmrs.org/openmrs/admin/index.htm', '_blank')}
                                    >
                                        <span>⚙️</span> OpenMRS Settings
                                    </button>

                                    <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.5rem 0' }} />

                                    {onLogout && (
                                        <button
                                            onClick={onLogout}
                                            className="dropdown-item"
                                            style={{ ...dropdownItemStyle, color: 'var(--color-error)' }}
                                        >
                                            <span>🚪</span> Logout
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem 1rem',
    border: 'none',
    background: 'transparent',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    borderRadius: '8px',
    textAlign: 'left' as const,
    fontSize: '0.9rem',
    transition: 'background 0.2s'
};
