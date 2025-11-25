import React from 'react';
import { Card, Badge } from '@openmrs-enterprise/ui-components';

interface Appointment {
    id: string;
    patientName: string;
    time: string;
    type: string;
    doctor: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: '1', patientName: 'Rahul Kumar', time: '09:00 AM', type: 'General Checkup', doctor: 'Dr. Wilson', status: 'Completed' },
    { id: '2', patientName: 'Priya Singh', time: '10:30 AM', type: 'Cardiology', doctor: 'Dr. Chen', status: 'In Progress' },
    { id: '3', patientName: 'Amit Patel', time: '11:45 AM', type: 'Follow-up', doctor: 'Dr. Brown', status: 'Scheduled' },
    { id: '4', patientName: 'Sneha Gupta', time: '02:00 PM', type: 'Pediatrics', doctor: 'Dr. Chen', status: 'Scheduled' },
];

export const AppointmentSchedule: React.FC = () => {
    const getStatusVariant = (status: Appointment['status']) => {
        switch (status) {
            case 'Scheduled': return 'primary';
            case 'In Progress': return 'warning';
            case 'Completed': return 'success';
            case 'Cancelled': return 'error';
            default: return 'default';
        }
    };

    return (
        <Card title="Today's Schedule" className="appointment-schedule-widget">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
                {MOCK_APPOINTMENTS.map((apt, index) => (
                    <div key={apt.id} style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '0.75rem 0',
                        borderBottom: index < MOCK_APPOINTMENTS.length - 1 ? '1px solid var(--color-border)' : 'none'
                    }}>
                        <div style={{
                            minWidth: '70px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--color-surface-hover)',
                            borderRadius: '8px',
                            padding: '0.25rem'
                        }}>
                            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{apt.time.split(' ')[0]}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{apt.time.split(' ')[1]}</span>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: 500 }}>{apt.patientName}</span>
                                <Badge variant={getStatusVariant(apt.status)}>{apt.status}</Badge>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {apt.type} with {apt.doctor}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
