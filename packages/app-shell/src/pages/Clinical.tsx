import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Table,
    Badge,
    Select,
    Modal
} from '@openmrs-enterprise/ui-components';
import { useClinical } from '../hooks/useClinical';
import { usePatients } from '../hooks/usePatients';
import type { Patient, Observation, Order, Encounter } from '@openmrs-enterprise/core';
import './Clinical.css';

export const Clinical: React.FC = () => {
    const { patients, fetchPatients } = usePatients();
    const { vitals, medications, labs, loading, fetchPatientClinicalData } = useClinical();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showVitalsModal, setShowVitalsModal] = useState(false);

    // Initial fetch of patients
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // Fetch clinical data when patient is selected
    useEffect(() => {
        if (selectedPatient) {
            fetchPatientClinicalData(selectedPatient.uuid);
        }
    }, [selectedPatient, fetchPatientClinicalData]);

    const handlePatientSelect = (patientId: string) => {
        const patient = patients.find(p => p.uuid === patientId);
        setSelectedPatient(patient || null);
    };

    const getPatientName = (p: Patient) => {
        const name = p.person.names.find(n => n.preferred) || p.person.names[0];
        return name ? `${name.givenName} ${name.familyName}` : 'Unknown';
    };

    const vitalsColumns = [
        { key: 'display', header: 'Type', render: (obs: Observation) => obs.concept?.display || 'Unknown' },
        { key: 'value', header: 'Value', render: (obs: Observation) => `${obs.value}` },
        { key: 'obsDatetime', header: 'Date', render: (obs: Observation) => new Date(obs.obsDatetime).toLocaleString() },
        { key: 'status', header: 'Status', render: (obs: Observation) => <Badge variant="success">{obs.status || 'FINAL'}</Badge> }
    ];

    const medsColumns = [
        { key: 'concept', header: 'Medication', render: (order: Order) => order.concept?.display || 'Unknown' },
        { key: 'instructions', header: 'Instructions', render: (order: Order) => order.orderType?.name || 'Standard' },
        { key: 'dateActivated', header: 'Start Date', render: (order: Order) => new Date(order.dateActivated).toLocaleDateString() },
        { key: 'status', header: 'Status', render: () => <Badge variant="primary">Active</Badge> }
    ];

    const labsColumns = [
        { key: 'encounterType', header: 'Test', render: (enc: Encounter) => enc.encounterType?.name || 'Unknown' },
        { key: 'encounterDatetime', header: 'Date', render: (enc: Encounter) => new Date(enc.encounterDatetime).toLocaleDateString() },
        { key: 'provider', header: 'Ordered By', render: (enc: Encounter) => enc.encounterProviders?.[0]?.provider?.display || 'Unknown' },
        { key: 'status', header: 'Status', render: () => <Badge variant="success">Completed</Badge> }
    ];

    return (
        <div className="clinical-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Clinical Dashboard</h1>
                    <p className="subtitle">Patient care and clinical overview</p>
                </div>
                <div className="patient-selector">
                    <Select
                        label=""
                        options={patients.map(p => ({ value: p.uuid, label: getPatientName(p) }))}
                        value={selectedPatient?.uuid || ''}
                        onChange={(e) => handlePatientSelect(e.target.value)}
                    />
                </div>
            </div>

            {selectedPatient ? (
                <div className="dashboard-grid">
                    <div className="main-content">
                        <Card title="Vitals" className="vitals-card">
                            <div className="card-actions">
                                <Button size="small" variant="outline" onClick={() => setShowVitalsModal(true)}>+ Add Vitals</Button>
                            </div>
                            <Table
                                columns={vitalsColumns}
                                data={vitals}
                                isLoading={loading}
                                keyExtractor={(item) => item.uuid}
                            />
                        </Card>

                        <Card title="Active Medications" className="meds-card">
                            <div className="card-actions">
                                <Button size="small" variant="outline">+ Prescribe</Button>
                            </div>
                            <Table
                                columns={medsColumns}
                                data={medications}
                                isLoading={loading}
                                keyExtractor={(item) => item.uuid}
                            />
                        </Card>

                        <Card title="Recent Lab Results" className="labs-card">
                            <div className="card-actions">
                                <Button size="small" variant="outline">+ Order Lab</Button>
                            </div>
                            <Table
                                columns={labsColumns}
                                data={labs}
                                isLoading={loading}
                                keyExtractor={(item) => item.uuid}
                            />
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <Card>
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <h3>Select a patient to view clinical data</h3>
                            <p>Use the dropdown above to select a patient.</p>
                        </div>
                    </Card>
                </div>
            )}

            <Modal
                isOpen={showVitalsModal}
                onClose={() => setShowVitalsModal(false)}
                title="Record Vitals"
            >
                <div style={{ padding: '1rem' }}>
                    <p>Vitals form placeholder</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button onClick={() => setShowVitalsModal(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
