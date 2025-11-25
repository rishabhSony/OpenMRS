import React from 'react';
import { StatCard } from './StatCard';
import { StaffAvailability } from './StaffAvailability';
import { PerformanceMetrics } from './PerformanceMetrics';
import { PredictiveOccupancy } from '../analytics/PredictiveOccupancy';
import { ExportControls } from '../analytics/ExportControls';
import { Button } from '@openmrs-enterprise/ui-components';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-content" id="admin-dashboard">
            <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 className="text-xl font-bold">Hospital Overview</h2>
                <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" onClick={() => navigate('/reports/builder')}>
                        🛠️ Custom Reports
                    </Button>
                    <ExportControls targetId="admin-dashboard" fileName="admin-dashboard" />
                </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard
                    title="Total Patients"
                    value="1,248"
                    icon={<span style={{ fontSize: '1.5rem' }}>👥</span>}
                    trend={{ value: 12, label: 'vs last month', direction: 'up' }}
                    color="primary"
                />
                <StatCard
                    title="Available Beds"
                    value="45/200"
                    icon={<span style={{ fontSize: '1.5rem' }}>🛏️</span>}
                    trend={{ value: 5, label: 'occupancy', direction: 'down' }}
                    color="warning"
                />
                <StatCard
                    title="Active Staff"
                    value="84"
                    icon={<span style={{ fontSize: '1.5rem' }}>👨‍⚕️</span>}
                    trend={{ value: 0, label: 'stable', direction: 'neutral' }}
                    color="success"
                />
                <StatCard
                    title="Avg Wait Time"
                    value="14m"
                    icon={<span style={{ fontSize: '1.5rem' }}>⏱️</span>}
                    trend={{ value: 2, label: 'improvement', direction: 'down' }}
                    color="success"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <PerformanceMetrics />
                <PredictiveOccupancy />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="lg:col-span-2">
                    <StaffAvailability />
                </div>
                <div>
                    {/* Additional widgets can go here */}
                </div>
            </div>
        </div>
    );
};
