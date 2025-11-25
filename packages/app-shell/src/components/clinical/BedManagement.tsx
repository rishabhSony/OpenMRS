import React, { useState } from 'react';
import { Card, Badge, Modal, Table } from '@openmrs-enterprise/ui-components';
import type { Bed, PrescriptionLog } from '../../data/syntheticClinicalData';

interface BedManagementProps {
    beds: Bed[];
    prescriptions: PrescriptionLog[];
}

export const BedManagement: React.FC<BedManagementProps> = ({ beds, prescriptions }) => {
    const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

    const getStatusColor = (status: Bed['status']) => {
        switch (status) {
            case 'Available': return 'var(--color-success)';
            case 'Occupied': return 'var(--color-error)';
            case 'Cleaning': return 'var(--color-warning)';
            case 'Maintenance': return 'var(--color-text-secondary)';
            default: return 'var(--color-text-secondary)';
        }
    };

    const getAcuityColor = (acuity?: Bed['acuity']) => {
        switch (acuity) {
            case 'Critical': return 'error';
            case 'Isolation': return 'warning';
            case 'Recovery': return 'success';
            case 'Stable': return 'primary';
            default: return 'default';
        }
    };

    const bedPrescriptions = selectedBed?.patient
        ? prescriptions.filter(p => p.patientId === selectedBed.patient!.id)
        : [];

    return (
        <>
            <Card title="Bed Management (Ward View)" className="bed-management-card">
                <div className="bed-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    {beds.map(bed => (
                        <div
                            key={bed.id}
                            onClick={() => bed.status === 'Occupied' && setSelectedBed(bed)}
                            style={{
                                border: `2px solid ${getStatusColor(bed.status)}`,
                                borderRadius: '12px',
                                padding: '1rem',
                                cursor: bed.status === 'Occupied' ? 'pointer' : 'default',
                                background: 'var(--color-surface)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                transition: 'transform 0.2s',
                                opacity: bed.status === 'Maintenance' ? 0.6 : 1
                            }}
                            className="bed-item"
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{bed.bedNumber}</span>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: getStatusColor(bed.status)
                                }} />
                            </div>

                            {bed.patient ? (
                                <>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '0.25rem' }}>
                                        {bed.patient.name}
                                    </div>
                                    <Badge variant={getAcuityColor(bed.acuity)} className="mt-2">
                                        {bed.acuity}
                                    </Badge>
                                </>
                            ) : (
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--color-text-secondary)',
                                    fontStyle: 'italic',
                                    marginTop: 'auto'
                                }}>
                                    {bed.status}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            <Modal
                isOpen={!!selectedBed}
                onClose={() => setSelectedBed(null)}
                title={`Patient Details - ${selectedBed?.bedNumber}`}
            >
                {selectedBed && selectedBed.patient && (
                    <div className="bed-details-modal">
                        <div className="patient-header" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                            <h2 style={{ margin: 0 }}>{selectedBed.patient.name}</h2>
                            <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-secondary)' }}>
                                {selectedBed.patient.age} yrs • {selectedBed.patient.gender === 'M' ? 'Male' : 'Female'} • {selectedBed.acuity}
                            </p>
                            <p style={{ margin: '0.25rem 0 0', fontWeight: 500 }}>
                                Diagnosis: {selectedBed.patient.diagnosis || 'Under Observation'}
                            </p>
                        </div>

                        <h3>Active Prescriptions</h3>
                        {bedPrescriptions.length > 0 ? (
                            <Table
                                columns={[
                                    { key: 'medication', header: 'Medication', render: (p: PrescriptionLog) => p.medication },
                                    { key: 'dosage', header: 'Dosage', render: (p: PrescriptionLog) => `${p.dosage} (${p.frequency})` },
                                    { key: 'start', header: 'Start Date', render: (p: PrescriptionLog) => new Date(p.startDate).toLocaleDateString() },
                                    { key: 'doctor', header: 'Prescribed By', render: (p: PrescriptionLog) => p.prescribedBy }
                                ]}
                                data={bedPrescriptions}
                                keyExtractor={(p) => p.id}
                            />
                        ) : (
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No active prescriptions found.</p>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
};
