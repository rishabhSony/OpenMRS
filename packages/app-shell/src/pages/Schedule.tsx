import React, { useState } from 'react';
import { Calendar, Card, Button, Spinner } from '@openmrs-enterprise/ui-components';
import type { CalendarEvent } from '@openmrs-enterprise/ui-components';
import { TeamNotesModal } from '../components/schedule/TeamNotesModal';
import { AppointmentModal } from '../components/schedule/AppointmentModal';
import type { AppointmentData } from '../components/schedule/AppointmentModal';
import { EventTypeSelectionModal } from '../components/schedule/EventTypeSelectionModal';
import type { TeamNote } from '../data/syntheticSchedule';

import { useAppointments } from '../hooks/useAppointments';

export const Schedule: React.FC = () => {
    const { appointments, providerSchedules, createAppointment, isLoading } = useAppointments();
    const [notes, setNotes] = useState<TeamNote[]>([]); // Keep notes local for now
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Modal States
    const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    // Map API data to Calendar Events
    const events: CalendarEvent[] = [
        ...appointments.map(appt => ({
            id: appt.uuid,
            title: `${appt.patient.display} - ${appt.appointmentType?.display || 'Appointment'}`,
            start: new Date(appt.startDateTime),
            end: new Date(appt.endDateTime),
            resource: { type: 'appointment', status: appt.status }
        })),
        ...providerSchedules.map(sch => ({
            id: sch.uuid,
            title: `${sch.provider.display} - Shift`,
            start: new Date(`${sch.startDate}T${sch.startTime}`),
            end: new Date(`${sch.endDate}T${sch.endTime}`),
            resource: { type: 'shift' }
        }))
    ];

    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        setSelectedDate(slotInfo.start);
        setIsSelectionModalOpen(true);
    };

    const handleTypeSelection = (type: 'appointment' | 'note') => {
        setIsSelectionModalOpen(false);
        if (type === 'appointment') {
            setIsAppointmentModalOpen(true);
        } else {
            setIsNoteModalOpen(true);
        }
    };

    const handleAddNote = (newNote: Omit<TeamNote, 'id' | 'author'>) => {
        const note: TeamNote = {
            ...newNote,
            id: `note-${Date.now()}`,
            author: 'Current User' // In a real app, this would be the logged-in user
        };
        setNotes([...notes, note]);
    };

    const handleAddAppointment = async (data: AppointmentData) => {
        if (!selectedDate) return;

        const [startHour, startMinute] = data.startTime.split(':').map(Number);
        const [endHour, endMinute] = data.endTime.split(':').map(Number);

        const start = new Date(selectedDate);
        start.setHours(startHour, startMinute);

        const end = new Date(selectedDate);
        end.setHours(endHour, endMinute);

        await createAppointment({
            patient: { uuid: 'patient-uuid-placeholder', display: data.patientName } as any, // In real app, select patient first
            startDateTime: start.toISOString(),
            endDateTime: end.toISOString(),
            status: 'SCHEDULED',
            appointmentType: { uuid: 'type-uuid', display: data.type, name: data.type }
        });
    };

    // Merge notes into events for visualization
    const calendarEvents = [
        ...events,
        ...notes.filter(n => n.priority === 'Urgent').map(n => ({
            id: `note-event-${n.id}`,
            title: '⚠️ Urgent Note',
            start: n.date,
            end: n.date,
            resource: { type: 'note', priority: 'Urgent' }
        }))
    ];

    return (
        <div className="schedule-page">
            <div className="page-header">
                <div>
                    <h1>Schedule & Team Notes</h1>
                    <p className="subtitle">Manage shifts, appointments, and team communication</p>
                </div>
                <Button onClick={() => {
                    setSelectedDate(new Date());
                    setIsSelectionModalOpen(true);
                }}>
                    + Add New Item
                </Button>
            </div>

            <div className="schedule-content" style={{ marginTop: '1.5rem' }}>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <Card>
                        <Calendar
                            events={calendarEvents}
                            onSelectSlot={handleSelectSlot}
                            height={700}
                        />
                    </Card>
                )}
            </div>

            <EventTypeSelectionModal
                isOpen={isSelectionModalOpen}
                onClose={() => setIsSelectionModalOpen(false)}
                onSelectType={handleTypeSelection}
            />

            <TeamNotesModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                date={selectedDate}
                notes={notes}
                onAddNote={handleAddNote}
            />

            <AppointmentModal
                isOpen={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
                date={selectedDate}
                onSave={handleAddAppointment}
            />
        </div>
    );
};
