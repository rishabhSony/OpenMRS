import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md'
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getSizeStyles = () => {
        switch (size) {
            case 'sm': return { maxWidth: '400px' };
            case 'lg': return { maxWidth: '800px' };
            case 'xl': return { maxWidth: '1100px' };
            default: return { maxWidth: '600px' };
        }
    };

    return createPortal(
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div
                className="modal-content card-glass"
                style={{
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                    ...getSizeStyles()
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header" style={{
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {title && <h3 style={{ margin: 0 }}>{title}</h3>}
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.25rem'
                        }}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body" style={{
                    padding: '1.5rem 0',
                    overflowY: 'auto'
                }}>
                    {children}
                </div>
                {footer && (
                    <div className="modal-footer" style={{
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1rem'
                    }}>
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
