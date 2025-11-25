import React from 'react';
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
    return (
        <header className="header glass">
            <div className="header-content">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {logo && <div className="logo-icon">{logo}</div>}
                    <div className="logo-text">
                        <h1 className="gradient-text">{title}</h1>
                        {subtitle && <p className="logo-subtitle">{subtitle}</p>}
                    </div>
                </Link>

                <div style={{ flex: 1 }} />

                <div className="header-actions">
                    {actions}
                    {user && (
                        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="user-avatar">
                                <span>{user.initials}</span>
                            </div>
                            {onLogout && (
                                <button
                                    onClick={onLogout}
                                    className="btn-ghost"
                                    style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                                    title="Logout"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
