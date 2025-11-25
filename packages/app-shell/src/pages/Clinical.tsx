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
import { VitalsForm } from '../components/VitalsForm';
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
    const [viewMode, setViewMode] = useState<'dashboard' | 'patient'>('dashboard');

    // Dashboard Data
    const [dashboardData, setDashboardData] = useState<any>(null);

    // Initial fetch of patients and dashboard data
    useEffect(() => {
        fetchPatients('');

        // Load synthetic dashboard data
        import('../data/syntheticClinicalData').then(({ generateClinicalData }) => {
            setDashboardData(generateClinicalData());
        });
    }, [fetchPatients]);

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const uuid = e.target.value;
        setSelectedPatientUuid(uuid);
        if (uuid) {
            fetchPatientClinicalData(uuid);
            setViewMode('patient');
        } else {
            setViewMode('dashboard');
        }
    };

    // Import components dynamically to avoid circular dependencies if any
    const KPISection = React.lazy(() => import('../components/clinical/KPISection').then(m => ({ default: m.KPISection })));
    const BedManagement = React.lazy(() => import('../components/clinical/BedManagement').then(m => ({ default: m.BedManagement })));
    const AdmissionsList = React.lazy(() => import('../components/clinical/AdmissionsList').then(m => ({ default: m.AdmissionsList })));

    return (
        <div className="clinical-dashboard">
            <div className="page-header">
                <div>
                    <h1>Clinical Dashboard</h1>
                    <p className="subtitle">
                        {viewMode === 'dashboard' ? 'Inpatient Ward Overview & Bed Management' : 'Patient Clinical Record'}
                    </p>
                </div>
                <div className="header-actions">
                    <div className="view-toggle" style={{ marginRight: '1rem' }}>
                        <Button
                            variant={viewMode === 'dashboard' ? 'primary' : 'ghost'}
                            onClick={() => { setViewMode('dashboard'); setSelectedPatientUuid(''); }}
                        >
                            Ward View
                        </Button>
                        <Button
                            variant={viewMode === 'patient' ? 'primary' : 'ghost'}
                            onClick={() => { if (selectedPatientUuid) setViewMode('patient'); }}
                            disabled={!selectedPatientUuid}
                        >
                            Patient View
                        </Button>
                    </div>

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
                    {viewMode === 'patient' && (
                        <Button
                            onClick={() => setShowVitalsModal(true)}
                            disabled={!selectedPatientUuid}
                        >
                            + Record Vitals
                        </Button>
                    )}
                </div>
            </div>

            <React.Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
                {viewMode === 'dashboard' && dashboardData ? (
                    <div className="ward-dashboard">
                        <KPISection kpis={dashboardData.kpis} />
                        <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
                            <div className="main-content">
                                <BedManagement beds={dashboardData.beds} prescriptions={dashboardData.prescriptions} />
                            </div>
                            <div className="sidebar-content">
                                <AdmissionsList />
                            </div>
                        </div>
                    </div>
                ) : selectedPatientUuid ? (
                    <div className="dashboard-grid">
                        <div className="dashboard-section vitals-section">
                            <Card title="Vitals History">
                                <Table
                                    columns={[
                                        { key: 'date', header: 'Date', render: (obs: Observation) => new Date(obs.obsDatetime).toLocaleDateString() },
                                        { key: 'concept', header: 'Type', render: (obs: Observation) => obs.concept.display },
                                        { key: 'value', header: 'Value', render: (obs: Observation) => typeof obs.value === 'object' ? obs.value.display : `${obs.value}` }
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
            </React.Suspense>

            <Modal
                isOpen={showVitalsModal}
                onClose={() => setShowVitalsModal(false)}
                title="Record Vitals"
            >
                <VitalsForm
                    onSubmit={(data) => {
                        console.log('Vitals submitted:', data);
                        // TODO: Integrate with API to save vitals
                        setShowVitalsModal(false);
                    }}
                    onCancel={() => setShowVitalsModal(false)}
                />
            </Modal>
        </div>
    );
};
