import React from 'react';
import { Card, Badge } from '@openmrs-enterprise/ui-components';

export const AdmissionsList: React.FC = () => {
    const admissions = [
        { id: 1, name: 'Sohan Lal', time: '14:00', type: 'Emergency', status: 'Incoming' },
        { id: 2, name: 'Meena Kumari', time: '15:30', type: 'Elective', status: 'Incoming' },
        { id: 3, name: 'Rajiv Gandhi', time: '11:00', type: 'Discharge', status: 'Outgoing' },
    ];

    return (
        <Card title="Admissions & Discharges">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {admissions.map(adm => (
                    <div key={adm.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'var(--color-background)',
                        borderRadius: '8px'
                    }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>{adm.name}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {adm.time} • {adm.type}
                            </div>
                        </div>
                        <Badge variant={adm.status === 'Incoming' ? 'primary' : 'success'}>
                            {adm.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </Card>
    );
};
