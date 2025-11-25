import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    title,
    children,
    className = '',
    actions,
    footer,
    ...props
}) => {
    return (
        <div className={`card ${className}`} {...props}>
            {(title || actions) && (
                <div className="card-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    {title && <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>}
                    {actions && <div className="card-actions">{actions}</div>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
            {footer && (
                <div className="card-footer" style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)'
                }}>
                    {footer}
                </div>
            )}
        </div>
    );
};
