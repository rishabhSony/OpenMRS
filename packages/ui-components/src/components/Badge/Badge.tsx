import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className = ''
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return { background: 'rgba(0, 102, 204, 0.15)', color: 'var(--color-primary-light)', border: '1px solid rgba(0, 102, 204, 0.3)' };
            case 'success':
                return { background: 'rgba(0, 200, 83, 0.15)', color: 'var(--color-success)', border: '1px solid rgba(0, 200, 83, 0.3)' };
            case 'warning':
                return { background: 'rgba(255, 165, 0, 0.15)', color: 'var(--color-warning)', border: '1px solid rgba(255, 165, 0, 0.3)' };
            case 'error':
                return { background: 'rgba(255, 61, 0, 0.15)', color: 'var(--color-error)', border: '1px solid rgba(255, 61, 0, 0.3)' };
            default:
                return { background: 'var(--color-surface)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' };
        }
    };

    return (
        <span
            className={`badge ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                lineHeight: 1,
                ...getVariantStyles()
            }}
        >
            {children}
        </span>
    );
};
