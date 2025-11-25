import React from 'react';
import { Card } from '@openmrs-enterprise/ui-components';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const INFECTION_DATA = [
    { month: 'Jan', rate: 1.2 },
    { month: 'Feb', rate: 1.5 },
    { month: 'Mar', rate: 1.1 },
    { month: 'Apr', rate: 0.9 },
    { month: 'May', rate: 0.8 },
    { month: 'Jun', rate: 0.7 },
];

const ALOS_DATA = [
    { dept: 'Cardiology', days: 4.5 },
    { dept: 'Surgery', days: 5.2 },
    { dept: 'Pediatrics', days: 3.1 },
    { dept: 'Neurology', days: 6.8 },
    { dept: 'Orthopedics', days: 4.2 },
];

export const PerformanceMetrics: React.FC = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
            <Card title="Infection Rates (%) - Last 6 Months">
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={INFECTION_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                            <YAxis stroke="var(--color-text-secondary)" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="var(--color-primary)"
                                strokeWidth={3}
                                dot={{ fill: 'var(--color-primary)', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Average Length of Stay (Days)">
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ALOS_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis dataKey="dept" stroke="var(--color-text-secondary)" />
                            <YAxis stroke="var(--color-text-secondary)" />
                            <Tooltip
                                cursor={{ fill: 'var(--color-surface-hover)' }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="days" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};
