import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Table,
    Select,
    Modal
} from '@openmrs-enterprise/ui-components';
import { useClinical } from '../hooks/useClinical';
import { usePatients } from '../hooks/usePatients';
import type { Observation, Order, Encounter } from '@openmrs-enterprise/core';
import './Clinical.css';

/**
 * Clinical Dashboard Page Component.
 * Displays clinical data (vitals, medications, labs) for a selected patient.
 * Integrates `usePatients` for selection and `useClinical` for data fetching.
 */
export const Clinical: React.FC = () => {
    const { patients, fetchPatients } = usePatients();
    const {
        vitals,
        medications,
        labs,
        loading,
        fetchPatientClinicalData
    } = useClinical();

    const [selectedPatientUuid, setSelectedPatientUuid] = useState<string>('');
    const [showVitalsModal, setShowVitalsModal] = useState(false);

    // Initial fetch of patients for the dropdown
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const uuid = e.target.value;
        setSelectedPatientUuid(uuid);
        if (uuid) {
            fetchPatientClinicalData(uuid);
        }
    };

    return (
        <div className="clinical-dashboard">
            <div className="page-header">
                <div>
                    <h1>Clinical Dashboard</h1>
                    <p className="subtitle">Patient vitals, medications, and lab results</p>
                </div>
                <div className="header-actions">
                    <Select
                        value={selectedPatientUuid}
                        onChange={handlePatientChange}
                        options={[
                            { value: '', label: 'Select Patient' },
                            ...patients.map(p => ({
                                value: p.uuid,
                                label: `${p.person.names[0]?.givenName} ${p.person.names[0]?.familyName}`
                            }))
                        ]}
                        className="patient-select"
                    />
                    <Button
                        onClick={() => setShowVitalsModal(true)}
                        disabled={!selectedPatientUuid}
                    >
                        + Record Vitals
                    </Button>
                </div>
            </div>

            {selectedPatientUuid ? (
                <div className="dashboard-grid">
                    <div className="dashboard-section vitals-section">
                        <Card title="Vitals History">
                            <Table
                                columns={[
                                    { key: 'date', header: 'Date', render: (obs: Observation) => new Date(obs.obsDatetime).toLocaleDateString() },
                                    { key: 'concept', header: 'Type', render: (obs: Observation) => obs.concept.display },
                                    { key: 'value', header: 'Value', render: (obs: Observation) => `${obs.value}` }
                                ]}
                                data={vitals}
                                isLoading={loading}
                                keyExtractor={(obs) => obs.uuid}
                            />
                        </Card>
                    </div>

                    <div className="dashboard-section medications-section">
                        <Card title="Active Medications">
                            <Table
                                columns={[
                                    { key: 'drug', header: 'Drug', render: (order: Order) => order.concept.display },
                                    { key: 'dosage', header: 'Dosage', render: (order: Order) => order.orderType?.name || 'Standard' },
                                    { key: 'start', header: 'Start Date', render: (order: Order) => new Date(order.dateActivated).toLocaleDateString() }
                                ]}
                                data={medications}
                                isLoading={loading}
                                keyExtractor={(order) => order.uuid}
                            />
                        </Card>
                    </div>

                    <div className="dashboard-section labs-section">
                        <Card title="Lab Results">
                            <Table
                                columns={[
                                    { key: 'test', header: 'Test', render: (enc: Encounter) => enc.encounterType.name },
                                    { key: 'date', header: 'Date', render: (enc: Encounter) => new Date(enc.encounterDatetime).toLocaleDateString() },
                                    { key: 'provider', header: 'Provider', render: (enc: Encounter) => enc.encounterProviders[0]?.provider.person.display || 'Unknown' }
                                ]}
                                data={labs}
                                isLoading={loading}
                                keyExtractor={(enc) => enc.uuid}
                            />
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <Card>
                        <div className="text-center py-8">
                            <h3>Select a patient to view clinical data</h3>
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
