import type { CalendarEvent } from '@openmrs-enterprise/ui-components';

export interface TeamNote {
    id: string;
    date: Date;
    content: string;
    priority: 'Normal' | 'Urgent';
    author: string;
}

export const generateScheduleData = () => {
    const today = new Date();
    const events: CalendarEvent[] = [];
    const notes: TeamNote[] = [];

    // Generate Shifts and Appointments
    for (let i = -10; i < 20; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);

        // Random Shift
        if (Math.random() > 0.3) {
            const start = new Date(date);
            start.setHours(8, 0, 0);
            const end = new Date(date);
            end.setHours(16, 0, 0);

            events.push({
                id: `shift-${i}`,
                title: Math.random() > 0.5 ? 'Dr. Sharma - On Duty' : 'Nurse Priya - Morning Shift',
                start,
                end,
                resource: { type: 'shift' }
            });
        }

        // Random Appointments
        const numAppts = Math.floor(Math.random() * 3);
        for (let j = 0; j < numAppts; j++) {
            const start = new Date(date);
            start.setHours(10 + j * 2, 0, 0);
            const end = new Date(start);
            end.setHours(start.getHours() + 1);

            events.push({
                id: `appt-${i}-${j}`,
                title: `Patient Follow-up`,
                start,
                end,
                resource: { type: 'appointment' }
            });
        }

        // Random Notes
        if (Math.random() > 0.7) {
            notes.push({
                id: `note-${i}`,
                date: new Date(date),
                content: Math.random() > 0.5 ? 'Check inventory for ICU.' : 'Staff meeting at 2 PM.',
                priority: Math.random() > 0.8 ? 'Urgent' : 'Normal',
                author: 'Admin'
            });
        }
    }

    return { events, notes };
};
