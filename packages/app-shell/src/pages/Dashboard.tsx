import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '@openmrs-enterprise/ui-components';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <h1>Welcome back, {user?.username}</h1>
            <p>Welcome to the HMS Dashboard.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <Card title="Quick Actions">
                    <p>Select an option from the sidebar to get started.</p>
                </Card>
            </div>
        </div>
    );
};
