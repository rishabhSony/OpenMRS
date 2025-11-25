import React from 'react';
import { Modal, Button } from '@openmrs-enterprise/ui-components';

interface EventTypeSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectType: (type: 'appointment' | 'note') => void;
}

export const EventTypeSelectionModal: React.FC<EventTypeSelectionModalProps> = ({
    isOpen,
    onClose,
    onSelectType
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Item"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                    What would you like to add to the schedule?
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Button
                        variant="primary"
                        onClick={() => onSelectType('appointment')}
                        style={{ height: '100px', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1.1rem' }}
                    >
                        <span style={{ fontSize: '2rem' }}>📅</span>
                        Appointment
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => onSelectType('note')}
                        style={{ height: '100px', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1.1rem' }}
                    >
                        <span style={{ fontSize: '2rem' }}>📝</span>
                        Team Note
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
