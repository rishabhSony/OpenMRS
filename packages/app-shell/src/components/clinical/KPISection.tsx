import React from 'react';
import { StatCard } from '../dashboard/StatCard';
import type { ClinicalKPIs } from '../../data/syntheticClinicalData';

interface KPISectionProps {
    kpis: ClinicalKPIs;
}

export const KPISection: React.FC<KPISectionProps> = ({ kpis }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <StatCard
                title="Occupancy Rate"
                value={`${kpis.occupancyRate}%`}
                icon={<span style={{ fontSize: '1.5rem' }}>🛏️</span>}
                color={kpis.occupancyRate > 85 ? 'error' : kpis.occupancyRate > 70 ? 'warning' : 'success'}
                trend={{ value: 2, label: 'vs yesterday', direction: 'up' }}
            />
            <StatCard
                title="Available Beds"
                value={kpis.availableBeds}
                icon={<span style={{ fontSize: '1.5rem' }}>✅</span>}
                color="success"
            />
            <StatCard
                title="Incoming Admissions"
                value={kpis.incomingAdmissions}
                icon={<span style={{ fontSize: '1.5rem' }}>📥</span>}
                color="primary"
            />
            <StatCard
                title="Avg Length of Stay"
                value={`${kpis.averageLoS} Days`}
                icon={<span style={{ fontSize: '1.5rem' }}>⏱️</span>}
                color="secondary"
            />
            <StatCard
                title="Avg Wait Time"
                value={`${kpis.avgWaitTime} min`}
                icon={<span style={{ fontSize: '1.5rem' }}>⏳</span>}
                color={kpis.avgWaitTime > 60 ? 'error' : 'success'}
            />
        </div>
    );
};
