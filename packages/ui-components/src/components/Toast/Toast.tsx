import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {createPortal(
                <div className="toast-container" style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    zIndex: 3000
                }}>
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`toast toast-${toast.type}`}
                            style={{
                                background: 'var(--color-surface)',
                                color: 'var(--color-text-primary)',
                                padding: '1rem 1.5rem',
                                borderRadius: '0.5rem',
                                boxShadow: 'var(--shadow-lg)',
                                borderLeft: `4px solid ${toast.type === 'success' ? 'var(--color-success)' :
                                        toast.type === 'error' ? 'var(--color-error)' :
                                            toast.type === 'warning' ? 'var(--color-warning)' :
                                                'var(--color-primary)'
                                    }`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                minWidth: '300px',
                                animation: 'slideIn 0.3s ease-out'
                            }}
                        >
                            <span style={{ flex: 1 }}>{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-muted)',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};

// Add keyframes
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
    document.head.appendChild(style);
}
