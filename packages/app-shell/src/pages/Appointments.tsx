import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Table,
    Badge,
    Calendar,
    Modal,
    Input,
    Select,
    DatePicker
} from '@openmrs-enterprise/ui-components';
import { useAppointments } from '../hooks/useAppointments';
import { usePatients } from '../hooks/usePatients';
import type { Appointment } from '@openmrs-enterprise/core';
import './Appointments.css';

export const Appointments: React.FC = () => {
    const { appointments, loading, fetchAppointments, createAppointment } = useAppointments();
    const { patients, fetchPatients } = usePatients();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [view, setView] = useState<'list' | 'calendar'>('list');

    useEffect(() => {
        fetchAppointments();
        fetchPatients();
    }, [fetchAppointments, fetchPatients]);

    const handleSchedule = async (data: any) => {
        try {
            await createAppointment(data);
            setShowScheduleModal(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = [
        {
            key: 'time',
            header: 'Time',
            render: (apt: Appointment) => new Date(apt.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            key: 'patient',
            header: 'Patient',
            render: (apt: Appointment) => apt.patient.person.display || apt.patient.display
        },
        {
            key: 'type',
            header: 'Type',
            render: (apt: Appointment) => apt.appointmentType?.name || 'General Visit'
        },
        {
            key: 'provider',
            header: 'Provider',
            render: (apt: Appointment) => apt.provider?.person.display || 'Unassigned'
        },
        {
            key: 'status',
            header: 'Status',
            render: (apt: Appointment) => {
                const variant =
                    apt.status === 'COMPLETED' ? 'success' :
                        apt.status === 'SCHEDULED' ? 'primary' :
                            apt.status === 'CANCELLED' ? 'error' : 'default';
                return <Badge variant={variant}>{apt.status}</Badge>;
            }
        },
        {
            key: 'actions',
            header: 'Actions',
            render: () => (
                <div className="action-buttons">
                    <Button size="small" variant="ghost">Edit</Button>
                    <Button size="small" variant="ghost" className="text-danger">Cancel</Button>
                </div>
            )
        }
    ];

    const filteredAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.startDateTime);
        return aptDate.toDateString() === selectedDate.toDateString();
    });

    return (
        <div className="appointments-page">
            <div className="page-header">
                <div>
                    <h1>Appointments</h1>
                    <p className="subtitle">Manage patient visits and schedules</p>
                </div>
                <div className="header-actions">
                    <div className="view-toggle">
                        <Button
                            variant={view === 'list' ? 'primary' : 'outline'}
                            onClick={() => setView('list')}
                            size="small"
                        >
                            List
                        </Button>
                        <Button
                            variant={view === 'calendar' ? 'primary' : 'outline'}
                            onClick={() => setView('calendar')}
                            size="small"
                        >
                            Calendar
                        </Button>
                    </div>
                    <Button onClick={() => setShowScheduleModal(true)}>
                        + Schedule Appointment
                    </Button>
                </div>
            </div>

            <div className="appointments-content">
                <div className="calendar-sidebar">
                    <Card className="calendar-card">
                        <Calendar
                            value={selectedDate}
                            onChange={setSelectedDate}
                            events={appointments.map(apt => ({
                                date: new Date(apt.startDateTime),
                                title: apt.appointmentType?.name || 'Visit',
                                type: apt.status === 'COMPLETED' ? 'success' : 'primary'
                            }))}
                        />
                    </Card>
                </div>

                <div className="appointments-list">
                    <Card title={`Appointments for ${selectedDate.toLocaleDateString()}`}>
                        {view === 'list' ? (
                            <Table
                                columns={columns}
                                data={filteredAppointments}
                                isLoading={loading}
                                keyExtractor={(apt) => apt.uuid}
                            />
                        ) : (
                            <div className="calendar-view-placeholder">
                                <p>Detailed calendar view coming soon</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <Modal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                title="Schedule Appointment"
            >
                <AppointmentForm
                    onSubmit={handleSchedule}
                    onCancel={() => setShowScheduleModal(false)}
                    patients={patients}
                />
            </Modal>
        </div>
    );
};

const AppointmentForm: React.FC<{
    onSubmit: (data: any) => void;
    onCancel: () => void;
    patients: any[];
}> = ({ onSubmit, onCancel, patients }) => {
    const [formData, setFormData] = useState({
        patientUuid: '',
        typeUuid: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f', // Example type
        providerUuid: '',
        date: '',
        time: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const startDateTime = `${formData.date}T${formData.time}:00`;
        const endDateTime = `${formData.date}T${parseInt(formData.time.split(':')[0]) + 1}:${formData.time.split(':')[1]}:00`;

        onSubmit({
            ...formData,
            startDateTime,
            endDateTime
        });
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <Select
                label="Patient *"
                options={patients.map(p => ({ value: p.uuid, label: p.person.names[0]?.givenName + ' ' + p.person.names[0]?.familyName }))}
                value={formData.patientUuid}
                onChange={(e) => setFormData({ ...formData, patientUuid: e.target.value })}
            />

            <div className="form-row">
                <DatePicker
                    label="Date *"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <Input
                    label="Time *"
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <Select
                    label="Type *"
                    options={[
                        { value: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f', label: 'General Visit' },
                        { value: 'followup', label: 'Follow-up' }
                    ]}
                    value={formData.typeUuid}
                    onChange={(e) => setFormData({ ...formData, typeUuid: e.target.value })}
                />
                <Select
                    label="Provider *"
                    options={[
                        { value: '', label: 'Select Provider' },
                        { value: 'provider-uuid-1', label: 'Dr. Smith' }
                    ]}
                    value={formData.providerUuid}
                    onChange={(e) => setFormData({ ...formData, providerUuid: e.target.value })}
                />
            </div>

            <Input
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Reason for visit..."
            />

            <div className="form-actions">
                <Button variant="secondary" onClick={onCancel} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Schedule</Button>
            </div>
        </form>
    );
};
