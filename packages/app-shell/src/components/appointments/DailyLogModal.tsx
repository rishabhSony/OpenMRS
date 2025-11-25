import React, { useState } from 'react';
import { Modal, Button, Input } from '@openmrs-enterprise/ui-components';

export interface DailyLogEntry {
    id: string;
    date: Date;
    patientName: string;
    info: string;
    timestamp: Date;
}

interface DailyLogModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    entries: DailyLogEntry[];
    onAddEntry: (entry: Omit<DailyLogEntry, 'id' | 'timestamp'>) => void;
}

export const DailyLogModal: React.FC<DailyLogModalProps> = ({
    isOpen,
    onClose,
    date,
    entries,
    onAddEntry
}) => {
    const [patientName, setPatientName] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !patientName.trim()) return;

        onAddEntry({
            date,
            patientName,
            info
        });

        // Reset form for next entry
        setPatientName('');
        setInfo('');
    };

    if (!date) return null;

    const dayEntries = entries.filter(e =>
        e.date.getDate() === date.getDate() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getFullYear() === date.getFullYear()
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Daily Patient Log - ${date.toLocaleDateString()}`}
        >
            <div className="daily-log-container">
                {/* Add New Entry Form */}
                <div className="add-entry-form" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Add New Entry</h4>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Patient Name"
                            required
                        />
                        <textarea
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            placeholder="Information / Notes (e.g., Vitals checked, Medication given)"
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
                            required
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" disabled={!patientName.trim() || !info.trim()}>
                                + Add to Log
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Existing Entries List */}
                <div className="existing-entries">
                    <h4 style={{ marginBottom: '1rem' }}>Entries for Today ({dayEntries.length})</h4>
                    {dayEntries.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {dayEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    style={{
                                        padding: '1rem',
                                        background: 'var(--color-background)',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid var(--color-primary)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600 }}>{entry.patientName}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                            {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{entry.info}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', textAlign: 'center' }}>
                            No entries yet. Add one above!
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
};
