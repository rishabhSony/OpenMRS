import React, { useState } from 'react';
import { Modal, Button, Badge } from '@openmrs-enterprise/ui-components';
import type { TeamNote } from '../../data/syntheticSchedule';

interface TeamNotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    notes: TeamNote[];
    onAddNote: (note: Omit<TeamNote, 'id' | 'author'>) => void;
}

export const TeamNotesModal: React.FC<TeamNotesModalProps> = ({
    isOpen,
    onClose,
    date,
    notes,
    onAddNote
}) => {
    const [newNoteContent, setNewNoteContent] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !newNoteContent.trim()) return;

        onAddNote({
            date,
            content: newNoteContent,
            priority: isUrgent ? 'Urgent' : 'Normal'
        });

        setNewNoteContent('');
        setIsUrgent(false);
    };

    if (!date) return null;

    const dayNotes = notes.filter(n =>
        n.date.getDate() === date.getDate() &&
        n.date.getMonth() === date.getMonth() &&
        n.date.getFullYear() === date.getFullYear()
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Team Notes - ${date.toLocaleDateString()}`}
        >
            <div className="team-notes-container">
                <div className="existing-notes" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.75rem' }}>Notes for Today</h4>
                    {dayNotes.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {dayNotes.map(note => (
                                <div
                                    key={note.id}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'var(--color-background)',
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${note.priority === 'Urgent' ? 'var(--color-error)' : 'var(--color-primary)'}`
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{note.author}</span>
                                        {note.priority === 'Urgent' && <Badge variant="error">Urgent</Badge>}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{note.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No notes for this day.</p>
                    )}
                </div>

                <div className="add-note-form" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.75rem' }}>Add New Note</h4>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <textarea
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                placeholder="Enter note content..."
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
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={isUrgent}
                                    onChange={(e) => setIsUrgent(e.target.checked)}
                                    style={{ width: '16px', height: '16px' }}
                                />
                                <span style={{ fontWeight: 500 }}>Mark as Urgent / Necessary</span>
                            </label>

                            <Button type="submit" disabled={!newNoteContent.trim()}>
                                Add Note
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};
