import React from 'react';
import './Calendar.css';

export interface CalendarEvent {
    date: Date;
    title: string;
    type?: 'primary' | 'success' | 'warning' | 'error';
}

export interface CalendarProps {
    value: Date;
    onChange: (date: Date) => void;
    events?: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ value, onChange, events = [] }) => {
    return (
        <div className="hms-calendar">
            <div className="hms-calendar-header">
                <h3>{value.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
            </div>
            <div className="hms-calendar-body">
                <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                    Calendar View Placeholder
                </p>
            </div>
        </div>
    );
};
