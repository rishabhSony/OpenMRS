import React, { useState } from 'react';
import { mockPatients } from '../data/mockData';
import { Patient } from '../types';
import './Patients.css';

export const Patients: React.FC = () => {
    const [patients] = useState<Patient[]>(mockPatients);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);

    const filteredPatients = patients.filter(
        (p) =>
            p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (showRegistration) {
        return <PatientRegistration onClose={() => setShowRegistration(false)} />;
    }

    if (selectedPatient) {
        return <PatientDetails patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }

    return (
        <div className="patients-page">
            <div className="patients-header">
                <div>
                    <h1>Patient Management</h1>
                    <p className="subtitle">Manage patient records and information</p>
                </div>
                <button className="btn-primary" onClick={() => setShowRegistration(true)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                    New Patient
                </button>
            </div>

            <div className="search-section">
                <div className="search-box">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="patients-stats">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #0066cc, #3385d6)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="stat-label">Total Patients</p>
                        <h3 className="stat-value">{patients.length}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #00a86b, #00c853)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="stat-label">Active</p>
                        <h3 className="stat-value">{patients.filter(p => p.status === 'Active').length}</h3>
                    </div>
                </div>
            </div>

            <div className="patients-table-container">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Age/Gender</th>
                            <th>Contact</th>
                            <th>Last Visit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} onClick={() => setSelectedPatient(patient)}>
                                <td><span className="patient-id">{patient.id}</span></td>
                                <td>
                                    <div className="patient-name">
                                        <div className="avatar">{patient.firstName[0]}{patient.lastName[0]}</div>
                                        <span>{patient.firstName} {patient.lastName}</span>
                                    </div>
                                </td>
                                <td>{calculateAge(patient.dateOfBirth)} / {patient.gender}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.lastVisit || 'N/A'}</td>
                                <td>
                                    <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setSelectedPatient(patient); }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 8a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm10 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PatientDetails: React.FC<{ patient: Patient; onBack: () => void }> = ({ patient, onBack }) => {
    const [activeTab, setActiveTab] = useState('demographics');

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    return (
        <div className="patient-details">
            <div className="details-header">
                <button className="btn-back" onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
                    </svg>
                    Back to Patients
                </button>
            </div>

            <div className="patient-header-card card-glass">
                <div className="patient-avatar-large">
                    {patient.firstName[0]}{patient.lastName[0]}
                </div>
                <div className="patient-header-info">
                    <h2>{patient.firstName} {patient.lastName}</h2>
                    <div className="patient-meta">
                        <span className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z" />
                            </svg>
                            ID: {patient.id}
                        </span>
                        <span className="meta-item">
                            {calculateAge(patient.dateOfBirth)} years old
                        </span>
                        <span className="meta-item">{patient.gender}</span>
                        <span className="meta-item">{patient.bloodType || 'N/A'}</span>
                    </div>
                </div>
                <div className="patient-header-actions">
                    <button className="btn-secondary">Edit Patient</button>
                </div>
            </div>

            <div className="details-tabs">
                <button
                    className={`tab ${activeTab === 'demographics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('demographics')}
                >
                    Demographics
                </button>
                <button
                    className={`tab ${activeTab === 'medical' ? 'active' : ''}`}
                    onClick={() => setActiveTab('medical')}
                >
                    Medical History
                </button>
                <button
                    className={`tab ${activeTab === 'encounters' ? 'active' : ''}`}
                    onClick={() => setActiveTab('encounters')}
                >
                    Encounters
                </button>
            </div>

            <div className="details-content">
                {activeTab === 'demographics' && (
                    <div className="demographics-grid">
                        <div className="info-card card">
                            <h3>Personal Information</h3>
                            <div className="info-row">
                                <span className="label">Full Name:</span>
                                <span className="value">{patient.firstName} {patient.middleName} {patient.lastName}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Date of Birth:</span>
                                <span className="value">{patient.dateOfBirth}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Gender:</span>
                                <span className="value">{patient.gender}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Blood Type:</span>
                                <span className="value">{patient.bloodType || 'Not specified'}</span>
                            </div>
                        </div>

                        <div className="info-card card">
                            <h3>Contact Information</h3>
                            <div className="info-row">
                                <span className="label">Phone:</span>
                                <span className="value">{patient.phone}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Email:</span>
                                <span className="value">{patient.email || 'Not provided'}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Address:</span>
                                <span className="value">{patient.address}, {patient.city}, {patient.state} {patient.zipCode}</span>
                            </div>
                        </div>

                        <div className="info-card card">
                            <h3>Emergency Contact</h3>
                            <div className="info-row">
                                <span className="label">Name:</span>
                                <span className="value">{patient.emergencyContact.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Relationship:</span>
                                <span className="value">{patient.emergencyContact.relationship}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Phone:</span>
                                <span className="value">{patient.emergencyContact.phone}</span>
                            </div>
                        </div>

                        <div className="info-card card">
                            <h3>Medical Information</h3>
                            <div className="info-row">
                                <span className="label">Allergies:</span>
                                <span className="value">{patient.allergies?.join(', ') || 'None reported'}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Chronic Conditions:</span>
                                <span className="value">{patient.chronicConditions?.join(', ') || 'None reported'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'medical' && (
                    <div className="medical-history">
                        <p className="placeholder-text">Medical history timeline will be displayed here</p>
                    </div>
                )}

                {activeTab === 'encounters' && (
                    <div className="encounters-list">
                        <p className="placeholder-text">Patient encounters will be displayed here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PatientRegistration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        alert('Patient registration submitted! (Mock functionality)');
        onClose();
    };

    return (
        <div className="patient-registration">
            <div className="registration-header">
                <button className="btn-back" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
                    </svg>
                    Back
                </button>
                <h1>New Patient Registration</h1>
            </div>

            <form onSubmit={handleSubmit} className="registration-form card">
                <h3>Personal Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>First Name *</label>
                        <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name *</label>
                        <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth *</label>
                        <input
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender *</label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <h3>Contact Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Phone *</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Address *</label>
                        <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>City *</label>
                        <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>State *</label>
                        <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Zip Code *</label>
                        <input
                            type="text"
                            required
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Register Patient
                    </button>
                </div>
            </form>
        </div>
    );
};
