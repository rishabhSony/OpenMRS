import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    icon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const classes = [
        'hms-button',
        `hms-button--${variant}`,
        `hms-button--${size}`,
        fullWidth && 'hms-button--full-width',
        loading && 'hms-button--loading',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <span className="hms-button__spinner">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30" />
                    </svg>
                </span>
            )}
            {icon && !loading && <span className="hms-button__icon">{icon}</span>}
            {children && <span className="hms-button__text">{children}</span>}
        </button>
    );
};
