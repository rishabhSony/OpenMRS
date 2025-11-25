import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, icon, fullWidth, className = '', ...props }, ref) => {
        const inputClasses = [
            'hms-input',
            error && 'hms-input--error',
            icon && 'hms-input--with-icon',
            fullWidth && 'hms-input--full-width',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={`hms-input-wrapper ${fullWidth ? 'hms-input-wrapper--full-width' : ''}`}>
                {label && <label htmlFor={inputId} className="hms-input__label">{label}</label>}
                <div className="hms-input__container">
                    {icon && <span className="hms-input__icon">{icon}</span>}
                    <input ref={ref} id={inputId} className={inputClasses} {...props} />
                </div>
                {error && <span className="hms-input__error">{error}</span>}
                {helperText && !error && <span className="hms-input__helper">{helperText}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
