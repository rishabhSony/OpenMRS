import React from 'react';

export interface Option {
    value: string;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`select-wrapper ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {label && (
                <label style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)'
                }}>
                    {label}
                </label>
            )}
            <select
                className="select-input"
                style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: error ? '1px solid var(--color-error)' : '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                    width: '100%',
                    cursor: 'pointer'
                }}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                    {error}
                </span>
            )}
        </div>
    );
};
