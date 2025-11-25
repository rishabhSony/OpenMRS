import React from 'react';
import { Card } from '@openmrs-enterprise/ui-components';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        label: string;
        direction: 'up' | 'down' | 'neutral';
    };
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color = 'primary' }) => {
    const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
        switch (direction) {
            case 'up': return 'var(--color-success)';
            case 'down': return 'var(--color-error)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <Card className="stat-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, marginBottom: '0.5rem' }}>
                        {title}
                    </p>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                        {value}
                    </h3>
                </div>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: `var(--color-${color}-bg, var(--color-surface-hover))`,
                    color: `var(--color-${color})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{
                        color: getTrendColor(trend.direction),
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '•'} {Math.abs(trend.value)}%
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{trend.label}</span>
                </div>
            )}
        </Card>
    );
};
