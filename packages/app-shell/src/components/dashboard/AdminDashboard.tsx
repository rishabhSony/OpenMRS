import React from 'react';
import { StatCard } from './StatCard';
import { StaffAvailability } from './StaffAvailability';
import { PerformanceMetrics } from './PerformanceMetrics';

export const AdminDashboard: React.FC = () => {
    return (
        <div className="dashboard-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Key Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <StatCard
                    title="Total Patients"
                    value="1,248"
                    icon={<span style={{ fontSize: '1.5rem' }}>👥</span>}
                    trend={{ value: 12, label: 'vs last month', direction: 'up' }}
                    color="primary"
                />
                <StatCard
                    title="Avg Length of Stay"
                    value="4.2 Days"
                    icon={<span style={{ fontSize: '1.5rem' }}>🏥</span>}
                    trend={{ value: 0.5, label: 'vs last month', direction: 'down' }}
                    color="success"
                />
                <StatCard
                    title="Bed Occupancy"
                    value="87%"
                    icon={<span style={{ fontSize: '1.5rem' }}>🛏️</span>}
                    trend={{ value: 5, label: 'vs last month', direction: 'up' }}
                    color="warning"
                />
                <StatCard
                    title="Revenue (Est)"
                    value="₹45.2L"
                    icon={<span style={{ fontSize: '1.5rem' }}>💰</span>}
                    trend={{ value: 8, label: 'vs last month', direction: 'up' }}
                    color="secondary"
                />
            </div>

            {/* Performance Charts */}
            <PerformanceMetrics />

            {/* Staff Availability */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <StaffAvailability />
            </div>
        </div>
    );
};
