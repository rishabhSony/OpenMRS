import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    className = '',
    ...props
}) => {
    return (
        <label className={`checkbox-wrapper ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
        }}>
            <input
                type="checkbox"
                style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary)'
                }}
                {...props}
            />
            {label && (
                <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)'
                }}>
                    {label}
                </span>
            )}
        </label>
    );
};
