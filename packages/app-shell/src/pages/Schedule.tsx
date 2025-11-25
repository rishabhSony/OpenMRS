import React, { useState, useEffect } from 'react';
import { Calendar, Card, Button } from '@openmrs-enterprise/ui-components';
import type { CalendarEvent } from '@openmrs-enterprise/ui-components';
import { TeamNotesModal } from '../components/schedule/TeamNotesModal';
import { AppointmentModal } from '../components/schedule/AppointmentModal';
import type { AppointmentData } from '../components/schedule/AppointmentModal';
import { EventTypeSelectionModal } from '../components/schedule/EventTypeSelectionModal';
import { generateScheduleData } from '../data/syntheticSchedule';
import type { TeamNote } from '../data/syntheticSchedule';

export const Schedule: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [notes, setNotes] = useState<TeamNote[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Modal States
    const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    useEffect(() => {
        const { events: initialEvents, notes: initialNotes } = generateScheduleData();
        setEvents(initialEvents);
        setNotes(initialNotes);
    }, []);

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

        // Also add a visual indicator to the calendar if it's urgent
        if (newNote.priority === 'Urgent') {
            setEvents([...events, {
                id: `note-event-${note.id}`,
                title: '⚠️ Urgent Note',
                start: newNote.date,
                end: newNote.date,
                resource: { type: 'note', priority: 'Urgent' }
            }]);
        }
    };

    const handleAddAppointment = (data: AppointmentData) => {
        if (!selectedDate) return;

        // Parse time strings (HH:mm) to Date objects
        const [startHour, startMinute] = data.startTime.split(':').map(Number);
        const [endHour, endMinute] = data.endTime.split(':').map(Number);

        const start = new Date(selectedDate);
        start.setHours(startHour, startMinute);

        const end = new Date(selectedDate);
        end.setHours(endHour, endMinute);

        const newEvent: CalendarEvent = {
            id: `appt-${Date.now()}`,
            title: `${data.patientName} - ${data.type}`,
            start,
            end,
            resource: { type: 'appointment', notes: data.notes }
        };

        setEvents([...events, newEvent]);
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
                <Card>
                    <Calendar
                        events={calendarEvents}
                        onSelectSlot={handleSelectSlot}
                        height={700}
                    />
                </Card>
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
