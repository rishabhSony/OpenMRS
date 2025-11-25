import React from 'react';
import { Card, Badge } from '@openmrs-enterprise/ui-components';

interface StaffMember {
    id: string;
    name: string;
    role: 'Doctor' | 'Nurse' | 'Specialist';
    status: 'Available' | 'Busy' | 'On Break' | 'Off Duty';
    department: string;
}

const MOCK_STAFF: StaffMember[] = [
    { id: '1', name: 'Dr. Sarah Wilson', role: 'Doctor', status: 'Available', department: 'Cardiology' },
    { id: '2', name: 'Nurse John Doe', role: 'Nurse', status: 'Busy', department: 'ER' },
    { id: '3', name: 'Dr. Emily Chen', role: 'Specialist', status: 'On Break', department: 'Pediatrics' },
    { id: '4', name: 'Nurse Jane Smith', role: 'Nurse', status: 'Available', department: 'General' },
    { id: '5', name: 'Dr. Michael Brown', role: 'Doctor', status: 'Busy', department: 'Surgery' },
];

export const StaffAvailability: React.FC = () => {
    const getStatusVariant = (status: StaffMember['status']) => {
        switch (status) {
            case 'Available': return 'success';
            case 'Busy': return 'warning';
            case 'On Break': return 'default';
            case 'Off Duty': return 'error';
            default: return 'default';
        }
    };

    return (
        <Card title="Staff Availability" className="staff-availability-widget">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MOCK_STAFF.map(staff => (
                    <div key={staff.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: 'var(--color-background)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--color-primary-bg)',
                                color: 'var(--color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                            }}>
                                {staff.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{staff.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                    {staff.role} • {staff.department}
                                </div>
                            </div>
                        </div>
                        <Badge variant={getStatusVariant(staff.status)}>
                            {staff.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </Card>
    );
};
