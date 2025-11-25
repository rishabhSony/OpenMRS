import React from 'react';
import { StatCard } from './StatCard';
import { AppointmentSchedule } from './AppointmentSchedule';
import { Card } from '@openmrs-enterprise/ui-components';

export const NurseDashboard: React.FC = () => {
    return (
        <div className="dashboard-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Operational Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <StatCard
                    title="My Patients"
                    value="8"
                    icon={<span style={{ fontSize: '1.5rem' }}>🤕</span>}
                    color="primary"
                />
                <StatCard
                    title="Pending Vitals"
                    value="3"
                    icon={<span style={{ fontSize: '1.5rem' }}>💓</span>}
                    color="warning"
                />
                <StatCard
                    title="New Admissions"
                    value="2"
                    icon={<span style={{ fontSize: '1.5rem' }}>📥</span>}
                    color="secondary"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Schedule */}
                <AppointmentSchedule />

                {/* Quick Tasks / Notifications */}
                <Card title="Shift Notifications">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'var(--color-warning-bg)', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Urgent Lab Result</div>
                            <div style={{ fontSize: '0.875rem' }}>Patient Rahul Kumar (Bed 4) - High Potassium</div>
                        </div>
                        <div style={{ padding: '0.75rem', background: 'var(--color-surface-hover)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Shift Handover</div>
                            <div style={{ fontSize: '0.875rem' }}>Meeting at 2:00 PM in Conference Room B</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
