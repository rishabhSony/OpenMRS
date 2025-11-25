import React, { useState } from 'react';
import { Card, Button, Calendar } from '@openmrs-enterprise/ui-components';
import type { CalendarEvent } from '@openmrs-enterprise/ui-components';
import moment from 'moment';

export const Appointments: React.FC = () => {
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    // Mock appointments
    const [events, setEvents] = useState<CalendarEvent[]>([
        {
            id: '1',
            title: 'John Doe - General Checkup',
            start: moment().toDate(),
            end: moment().add(1, 'hour').toDate(),
        },
        {
            id: '2',
            title: 'Jane Smith - Dental Cleaning',
            start: moment().add(1, 'day').hour(10).minute(0).toDate(),
            end: moment().add(1, 'day').hour(11).minute(0).toDate(),
        },
        {
            id: '3',
            title: 'Alice Johnson - Follow-up',
            start: moment().add(2, 'days').hour(14).minute(0).toDate(),
            end: moment().add(2, 'days').hour(14).minute(30).toDate(),
        }
    ]);

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        const title = window.prompt('New Appointment Name');
        if (title) {
            // Conflict detection
            const hasConflict = events.some(event =>
                (start >= event.start && start < event.end) ||
                (end > event.start && end <= event.end)
            );

            if (hasConflict) {
                alert('Conflict detected! This slot overlaps with an existing appointment.');
                return;
            }

            setEvents([...events, {
                id: Math.random().toString(),
                title,
                start,
                end
            }]);
        }
    };

    return (
        <div className="appointments-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1>Appointments</h1>
                <div>
                    <Button variant="secondary" onClick={() => setView('list')} style={{ marginRight: '0.5rem' }}>List View</Button>
                    <Button variant="primary" onClick={() => setView('calendar')}>Calendar View</Button>
                </div>
            </div>

            {view === 'calendar' ? (
                <Card>
                    <Calendar
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={(event) => alert(event.title)}
                        height={700}
                    />
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {events.map(event => (
                        <Card key={event.id} title={event.title}>
                            <p>Start: {moment(event.start).format('LLL')}</p>
                            <p>End: {moment(event.end).format('LLL')}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
