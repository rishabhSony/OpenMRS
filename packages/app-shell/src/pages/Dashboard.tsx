import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';
import { NurseDashboard } from '../components/dashboard/NurseDashboard';
import { hasRole, ROLES } from '@openmrs-enterprise/core';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const isNurse = user && hasRole(user.roles, [ROLES.NURSE]) && !hasRole(user.roles, [ROLES.DOCTOR]);

    return (
        <div className="dashboard-page">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Welcome back, {user?.username}
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                    Here's what's happening in the hospital today.
                </p>
            </div>

            {isNurse ? <NurseDashboard /> : <AdminDashboard />}
        </div>
    );
};
