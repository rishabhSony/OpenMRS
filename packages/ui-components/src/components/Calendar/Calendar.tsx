import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource?: any;
}

export interface CalendarProps {
    events: CalendarEvent[];
    onSelectEvent?: (event: CalendarEvent) => void;
    onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
    defaultView?: View;
    height?: number | string;
}

export const Calendar: React.FC<CalendarProps> = ({
    events,
    onSelectEvent,
    onSelectSlot,
    defaultView = Views.MONTH,
    height = 600
}) => {
    return (
        <div style={{ height, padding: '1rem', borderRadius: '8px', background: 'white' }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable
                defaultView={defaultView}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
            />
        </div>
    );
};
