import React from 'react';

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`datepicker-wrapper ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {label && (
                <label style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)'
                }}>
                    {label}
                </label>
            )}
            <input
                type="date"
                className="datepicker-input"
                style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: error ? '1px solid var(--color-error)' : '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                    width: '100%',
                    fontFamily: 'inherit'
                }}
                {...props}
            />
            {error && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                    {error}
                </span>
            )}
        </div>
    );
};
