import React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
    label,
    className = '',
    ...props
}) => {
    return (
        <label className={`switch-wrapper ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
        }}>
            <div className="switch" style={{ position: 'relative', width: '3rem', height: '1.5rem' }}>
                <input
                    type="checkbox"
                    style={{
                        opacity: 0,
                        width: 0,
                        height: 0
                    }}
                    {...props}
                />
                <span className="slider" style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: props.checked ? 'var(--color-primary)' : 'var(--color-surface)',
                    transition: '.4s',
                    borderRadius: '34px',
                    border: '1px solid var(--color-border)'
                }}>
                    <span style={{
                        position: 'absolute',
                        content: '""',
                        height: '1.1rem',
                        width: '1.1rem',
                        left: props.checked ? '1.6rem' : '0.2rem',
                        bottom: '0.15rem',
                        backgroundColor: 'white',
                        transition: '.4s',
                        borderRadius: '50%'
                    }} />
                </span>
            </div>
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
