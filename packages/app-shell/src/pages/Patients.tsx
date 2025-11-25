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
                    label="First Name *"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                    label="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <DatePicker
                    label="Date of Birth *"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
                <Select
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
                    label="Phone *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <Input
                label="Address *"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <Input
                    label="City *"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                    label="State *"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <Input
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
                                        <InfoRow label="Gender" value={patient.person.gender === 'M' ? 'Male' : patient.person.gender === 'F' ? 'Female' : patient.person.gender} />
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

export const Patients: React.FC = () => {
    const { patients, loading, fetchPatients, createPatient } = usePatients();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPatients(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, fetchPatients]);

    const calculateAge = (dob: string) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const columns: Column<Patient>[] = [
        {
            key: 'uuid',
            header: 'Patient ID',
            render: (p) => <span className="patient-id">{p.identifiers?.[0]?.identifier || 'N/A'}</span>
        },
        {
            key: 'name',
            header: 'Name',
            render: (p) => {
                const name = p.person.names.find(n => n.preferred) || p.person.names[0];
                const fullName = name ? `${name.givenName} ${name.familyName}` : 'Unknown';
                const initials = name ? `${name.givenName[0]}${name.familyName[0]}` : '??';
                return (
                    <div className="patient-name">
                        <div className="avatar">{initials}</div>
                        <span>{fullName}</span>
                    </div>
                );
            }
        },
        {
            key: 'age',
            header: 'Age/Gender',
            render: (p) => `${p.person.age || calculateAge(p.person.birthdate)} / ${p.person.gender}`
        },
        {
            key: 'address',
            header: 'Address',
            render: (p) => {
                const addr = p.person.addresses?.[0];
                return addr ? `${addr.cityVillage || ''}, ${addr.country || ''}` : 'N/A';
            }
        },
        {
            key: 'status',
            header: 'Status',
            render: (p) => (
                <Badge variant={!p.voided ? 'success' : 'default'}>
                    {!p.voided ? 'Active' : 'Voided'}
                </Badge>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (p) => (
                <Button
                    variant="secondary"
                    size="small"
                    onClick={(e) => { e.stopPropagation(); setSelectedPatient(p); }}
                >
                    View
                </Button>
            )
        }
    ];

    const handleRegister = async (data: any) => {
        try {
            await createPatient(data);
            setShowRegistration(false);
        } catch (error) {
            // Error handled in hook
        }
    };

    return (
        <div className="patients-page">
            <div className="patients-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Patient Management</h1>
                    <p className="subtitle">Manage patient records and information</p>
                </div>
                <Button variant="primary" onClick={() => setShowRegistration(true)}>
                    New Patient
                </Button>
            </div>

            <div className="patients-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card className="stat-card card-glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #0066cc, #3385d6)', padding: '1rem', borderRadius: '0.75rem', color: 'white' }}>
                            📊
                        </div>
                        <div>
                            <p className="stat-label" style={{ margin: 0, color: 'var(--color-text-muted)' }}>Total Patients</p>
                            <h3 className="stat-value" style={{ margin: 0, fontSize: '1.5rem' }}>{patients.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="stat-card card-glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #00a86b, #00c853)', padding: '1rem', borderRadius: '0.75rem', color: 'white' }}>
                            ✅
                        </div>
                        <div>
                            <p className="stat-label" style={{ margin: 0, color: 'var(--color-text-muted)' }}>Active</p>
                            <h3 className="stat-value" style={{ margin: 0, fontSize: '1.5rem' }}>{patients.filter(p => !p.voided).length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="search-section" style={{ marginBottom: '1.5rem' }}>
                    <Input
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ maxWidth: '400px' }}
                    />
                </div>

                <Table
                    columns={columns}
                    data={patients}
                    onRowClick={(p) => setSelectedPatient(p)}
                    isLoading={loading}
                    keyExtractor={(p) => p.uuid}
                />
            </Card>

            <Modal
                isOpen={showRegistration}
                onClose={() => setShowRegistration(false)}
                title="New Patient Registration"
                size="lg"
            >
                <PatientRegistrationForm onSubmit={handleRegister} onCancel={() => setShowRegistration(false)} />
            </Modal>

            {selectedPatient && (
                <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
            )}
        </div>
    );
};
