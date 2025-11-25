import React, { useState } from 'react';
import { Modal, Button, Input, Select } from '@openmrs-enterprise/ui-components';

export interface AppointmentData {
    patientName: string;
    type: 'Checkup' | 'Follow-up' | 'Emergency' | 'Consultation';
    startTime: string;
    endTime: string;
    notes: string;
}

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    onSave: (data: AppointmentData) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
    isOpen,
    onClose,
    date,
    onSave
}) => {
    const [patientName, setPatientName] = useState('');
    const [type, setType] = useState<AppointmentData['type']>('Checkup');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            patientName,
            type,
            startTime,
            endTime,
            notes
        });
        // Reset form
        setPatientName('');
        setType('Checkup');
        setNotes('');
        onClose();
    };

    if (!date) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`New Appointment - ${date.toLocaleDateString()}`}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Patient Name</label>
                    <Input
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name"
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Type</label>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value as AppointmentData['type'])}
                        options={[
                            { value: 'Checkup', label: 'General Checkup' },
                            { value: 'Follow-up', label: 'Follow-up' },
                            { value: 'Emergency', label: 'Emergency' },
                            { value: 'Consultation', label: 'Consultation' }
                        ]}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Start Time</label>
                        <Input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>End Time</label>
                        <Input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional notes..."
                        style={{
                            width: '100%',
                            minHeight: '80px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--color-border)',
                            background: 'var(--color-surface)',
                            color: 'var(--color-text)',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
                    <Button variant="primary" type="submit" disabled={!patientName}>Create Appointment</Button>
                </div>
            </form>
        </Modal>
    );
};
