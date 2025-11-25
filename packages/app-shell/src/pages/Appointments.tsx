import React, { useState } from 'react';
import { Card, Calendar } from '@openmrs-enterprise/ui-components';
import type { CalendarEvent } from '@openmrs-enterprise/ui-components';
import { DailyLogModal } from '../components/appointments/DailyLogModal';
import type { DailyLogEntry } from '../components/appointments/DailyLogModal';

export const Appointments: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logs, setLogs] = useState<DailyLogEntry[]>([]);

    const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedDate(start);
        setIsModalOpen(true);
    };

    const handleAddEntry = (newEntry: Omit<DailyLogEntry, 'id' | 'timestamp'>) => {
        const entry: DailyLogEntry = {
            ...newEntry,
            id: `log-${Date.now()}`,
            timestamp: new Date()
        };
        setLogs([...logs, entry]);
    };

    // Convert logs to calendar events for visualization
    // We group logs by date to show a summary event like "5 Patient Logs"
    const getCalendarEvents = (): CalendarEvent[] => {
        const events: CalendarEvent[] = [];
        const logsByDate = new Map<string, number>();

        logs.forEach(log => {
            const dateKey = log.date.toDateString();
            logsByDate.set(dateKey, (logsByDate.get(dateKey) || 0) + 1);
        });

        logsByDate.forEach((count, dateString) => {
            const date = new Date(dateString);
            events.push({
                id: `summary-${dateString}`,
                title: `📝 ${count} Patient Log${count > 1 ? 's' : ''}`,
                start: date,
                end: date,
                resource: { type: 'log-summary' }
            });
        });

        return events;
    };

    return (
        <div className="appointments-page">
            <div style={{ marginBottom: '1.5rem' }}>
                <h1>Daily Patient Logs</h1>
                <p className="subtitle">Click any date to add or view patient information logs.</p>
            </div>

            <Card>
                <Calendar
                    events={getCalendarEvents()}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={(event) => {
                        setSelectedDate(event.start);
                        setIsModalOpen(true);
                    }}
                    height={700}
                />
            </Card>

            <DailyLogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={selectedDate}
                entries={logs}
                onAddEntry={handleAddEntry}
            />
        </div>
    );
};
