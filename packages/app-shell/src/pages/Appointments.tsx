import React, { useState } from 'react';
import { Card, Calendar } from '@openmrs-enterprise/ui-components';
import type { CalendarEvent } from '@openmrs-enterprise/ui-components';
import { DailyLogModal } from '../components/appointments/DailyLogModal';
import type { DailyLogEntry } from '../components/appointments/DailyLogModal';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicalService } from '@openmrs-enterprise/core';

export const Appointments: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch all encounters (Daily Logs)
    // In a real app, you might filter by date range or encounter type 'Visit Note'
    const { data: encounters = [] } = useQuery({
        queryKey: ['daily-logs'],
        queryFn: () => clinicalService.getEncounters({})
    });

    const createLogMutation = useMutation({
        mutationFn: (data: any) => clinicalService.createEncounter(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['daily-logs'] });
        }
    });

    const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedDate(start);
        setIsModalOpen(true);
    };

    const handleAddEntry = async (newEntry: Omit<DailyLogEntry, 'id' | 'timestamp'>) => {
        await createLogMutation.mutateAsync({
            patient: { uuid: 'patient-uuid-placeholder', display: newEntry.patientName } as any,
            encounterDatetime: newEntry.date.toISOString(),
            encounterType: { uuid: 'visit-note-uuid', display: 'Visit Note' } as any,
            // Store the note content in an observation or just assume the encounter represents the log
            obs: []
        });
    };

    // Map encounters to DailyLogEntry format for the modal
    const logs: DailyLogEntry[] = encounters.map(enc => ({
        id: enc.uuid,
        patientName: enc.patient.display,
        info: 'Visit Note', // In real app, extract from obs
        date: new Date(enc.encounterDatetime),
        timestamp: new Date(enc.encounterDatetime)
    }));

    // Convert logs to calendar events for visualization
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
