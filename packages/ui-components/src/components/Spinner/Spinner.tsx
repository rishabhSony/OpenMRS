import React from 'react';

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    color = 'var(--color-primary)'
}) => {
    const getSize = () => {
        switch (size) {
            case 'sm': return '1rem';
            case 'lg': return '3rem';
            default: return '2rem';
        }
    };

    return (
        <div
            className="spinner"
            style={{
                width: getSize(),
                height: getSize(),
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTopColor: color,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}
        />
    );
};

// Add keyframes to document if not present
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(style);
}
