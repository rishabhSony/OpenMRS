import React, { useState, useEffect } from 'react';
import type { Column } from '@openmrs-enterprise/ui-components';
import {
    Table,
    Card,
    Badge,
    Button,
    Input,
    Modal,
    Select,
    DatePicker,
    Tabs
} from '@openmrs-enterprise/ui-components';
import { usePatients } from '../hooks/usePatients';
import type { Patient } from '@openmrs-enterprise/core';
import './Patients.css';

// --- Helper Components ---

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
);

const PatientRegistrationForm: React.FC<{ onSubmit: (data: any) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'Male',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <Input
                    id="firstName"
                    label="First Name *"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                    id="lastName"
                    label="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <DatePicker
                    id="dateOfBirth"
                    label="Date of Birth *"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
                <Select
                    id="gender"
                    label="Gender *"
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' }
                    ]}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                <Input
                    id="phone"
                    label="Phone *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <Input
                id="address"
                label="Address *"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <Input
                    id="city"
                    label="City *"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                    id="state"
                    label="State *"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <Input
                    id="zipCode"
                    label="Zip Code *"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Register Patient
                </Button>
            </div>
        </form>
    );
};

const PatientDetails: React.FC<{ patient: Patient; onClose: () => void }> = ({ patient, onClose }) => {
    const name = patient.person.names.find(n => n.preferred) || patient.person.names[0];
    const fullName = name ? `${name.givenName} ${name.familyName}` : 'Unknown';
    const address = patient.person.addresses?.[0];

    return (
        <div className="patient-details-overlay">
            <div className="patient-details-content slide-up">
                <div className="details-header">
                    <div className="patient-info-header">
                        <div className="avatar large">{name?.givenName[0]}{name?.familyName[0]}</div>
                        <div>
                            <h2>{fullName}</h2>
                            <p className="patient-id-badge">{patient.identifiers?.[0]?.identifier}</p>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={onClose}>✕</Button>
                </div>

                <Tabs
                    tabs={[
                        {
                            id: 'demographics',
                            label: 'Demographics',
                            content: (
                                <div className="details-grid">
                                    <Card title="Personal Information">
                                        <InfoRow label="Gender" value={
                                            patient.person.gender === 'M' ? 'Male' :
                                                patient.person.gender === 'F' ? 'Female' :
                                                    ((patient.person.gender as string) === 'O' || (patient.person.gender as string) === 'T') ? 'Transgender' :
                                                        patient.person.gender
                                        } />
                                        <InfoRow label="Birth Date" value={new Date(patient.person.birthdate).toLocaleDateString()} />
                                        <InfoRow label="Age" value={patient.person.age.toString()} />
                                    </Card>
                                    <Card title="Address">
                                        <InfoRow label="Address" value={address?.address1 || 'N/A'} />
                                        <InfoRow label="City" value={address?.cityVillage || 'N/A'} />
                                        <InfoRow label="Country" value={address?.country || 'N/A'} />
                                    </Card>
                                </div>
                            )
                        },
                        {
                            id: 'medical',
                            label: 'Medical History',
                            content: (
                                <Card>
                                    <p className="placeholder-text">Medical history timeline will be displayed here</p>
                                </Card>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
};

// --- Main Component ---

/**
 * Patients Page Component.
 * Displays a list of patients with search functionality and a registration modal.
 * Uses the `usePatients` hook for data fetching and state management.
 */
export const Patients: React.FC = () => {
    const { patients, loading, fetchPatients, createPatient } = usePatients();
    const [searchQuery, setSearchQuery] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    // Debounce search to avoid excessive API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPatients(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, fetchPatients]);

    const handleCreatePatient = async (data: any) => {
        try {
            await createPatient(data);
            setShowRegistration(false);
        } catch (err) {
            // Error handled in hook
        }
    };

    const columns: Column<Patient>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (patient: Patient) => {
                const name = patient.person.names.find(n => n.preferred) || patient.person.names[0];
                const fullName = name ? `${name.givenName} ${name.familyName}` : 'Unknown';
                return (
                    <div className="patient-name-cell">
                        <div>
                            <span className="patient-name" style={{ fontSize: '1rem', fontWeight: 600 }}>
                                {fullName}
                            </span>
                            <span className="patient-id" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                {patient.identifiers[0]?.identifier}
                            </span>
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'gender',
            header: 'Gender',
            render: (patient: Patient) => {
                const genderCode = patient.person.gender;
                let genderLabel = 'Unknown';
                let variant: 'primary' | 'success' | 'warning' | 'default' = 'default';

                if (genderCode === 'M') {
                    genderLabel = 'Male';
                    variant = 'primary';
                } else if (genderCode === 'F') {
                    genderLabel = 'Female';
                    variant = 'success';
                } else if ((genderCode as string) === 'O' || (genderCode as string) === 'T') {
                    genderLabel = 'Transgender';
                    variant = 'warning';
                }

                return (
                    <Badge variant={variant}>
                        {genderLabel}
                    </Badge>
                );
            }
        },
        {
            key: 'age',
            header: 'Age',
            render: (patient: Patient) => patient.person.age?.toString() || 'N/A'
        },
        {
            key: 'birthdate',
            header: 'Birthdate',
            render: (patient: Patient) => new Date(patient.person.birthdate).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (patient: Patient) => (
                <Button
                    size="small"
                    variant="ghost"
                    onClick={() => setSelectedPatient(patient)}
                >
                    View Details
                </Button>
            )
        }
    ];

    return (
        <div className="patients-page">
            <div className="page-header">
                <div>
                    <h1>Patients</h1>
                    <p className="subtitle">Manage patient records and registration</p>
                </div>
                <Button onClick={() => setShowRegistration(true)}>
                    + Register Patient
                </Button>
            </div>

            <div className="patients-content">
                <Card className="search-card">
                    <Input
                        placeholder="Search patients by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </Card>

                <Card className="table-card">
                    <Table
                        columns={columns}
                        data={patients}
                        isLoading={loading}
                        keyExtractor={(patient) => patient.uuid}
                        onRowClick={(patient) => setSelectedPatient(patient)}
                    />
                </Card>
            </div>

            <Modal
                isOpen={showRegistration}
                onClose={() => setShowRegistration(false)}
                title="Register New Patient"
            >
                <PatientRegistrationForm
                    onSubmit={handleCreatePatient}
                    onCancel={() => setShowRegistration(false)}
                />
            </Modal>

            <Modal
                isOpen={!!selectedPatient}
                onClose={() => setSelectedPatient(null)}
                title="Patient Details"
            >
                {selectedPatient && <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
            </Modal>
        </div>
    );
};
