import React, { useState } from 'react';
import { mockPatients, mockVitals, mockMedications, mockLabResults } from '../data/mockData';
import { Patient, Vital, Medication, LabResult } from '../types';
import './Clinical.css';

export const Clinical: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [activeSection, setActiveSection] = useState<'vitals' | 'medications' | 'labs'>('vitals');

    if (!selectedPatient) {
        return <PatientSelector onSelect={setSelectedPatient} />;
    }

    return (
        <div className="clinical-page">
            <div className="clinical-header">
                <button className="btn-back" onClick={() => setSelectedPatient(null)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
                    </svg>
                    Change Patient
                </button>
                <div className="patient-banner card-glass">
                    <div className="patient-avatar-small">
                        {selectedPatient.firstName[0]}{selectedPatient.lastName[0]}
                    </div>
                    <div>
                        <h2>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
                        <p className="patient-id-text">ID: {selectedPatient.id}</p>
                    </div>
                </div>
            </div>

            <div className="clinical-nav">
                <button
                    className={`nav-btn ${activeSection === 'vitals' ? 'active' : ''}`}
                    onClick={() => setActiveSection('vitals')}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Vitals
                </button>
                <button
                    className={`nav-btn ${activeSection === 'medications' ? 'active' : ''}`}
                    onClick={() => setActiveSection('medications')}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
                    </svg>
                    Medications
                </button>
                <button
                    className={`nav-btn ${activeSection === 'labs' ? 'active' : ''}`}
                    onClick={() => setActiveSection('labs')}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" />
                    </svg>
                    Lab Results
                </button>
            </div>

            <div className="clinical-content">
                {activeSection === 'vitals' && <VitalsSection patientId={selectedPatient.id} />}
                {activeSection === 'medications' && <MedicationsSection patientId={selectedPatient.id} />}
                {activeSection === 'labs' && <LabResultsSection patientId={selectedPatient.id} />}
            </div>
        </div>
    );
};

const PatientSelector: React.FC<{ onSelect: (patient: Patient) => void }> = ({ onSelect }) => {
    return (
        <div className="patient-selector">
            <h1>Clinical Dashboard</h1>
            <p className="subtitle">Select a patient to view clinical information</p>

            <div className="patient-grid">
                {mockPatients.map((patient) => (
                    <div key={patient.id} className="patient-card card" onClick={() => onSelect(patient)}>
                        <div className="patient-avatar-medium">
                            {patient.firstName[0]}{patient.lastName[0]}
                        </div>
                        <div className="patient-info">
                            <h3>{patient.firstName} {patient.lastName}</h3>
                            <p className="patient-id-text">ID: {patient.id}</p>
                            <p className="patient-meta-text">{patient.gender} • {patient.phone}</p>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VitalsSection: React.FC<{ patientId: string }> = ({ patientId }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
    });

    const patientVitals = mockVitals.filter(v => v.patientId === patientId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Vitals recorded successfully! (Mock functionality)');
        setShowForm(false);
        setFormData({
            bloodPressureSystolic: '',
            bloodPressureDiastolic: '',
            heartRate: '',
            temperature: '',
            respiratoryRate: '',
            oxygenSaturation: '',
            weight: '',
            height: '',
        });
    };

    return (
        <div className="vitals-section">
            <div className="section-header">
                <h2>Vital Signs</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Record Vitals'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="vitals-form card">
                    <h3>Record New Vitals</h3>
                    <div className="vitals-grid">
                        <div className="vital-input">
                            <label>Blood Pressure</label>
                            <div className="bp-inputs">
                                <input
                                    type="number"
                                    placeholder="Systolic"
                                    value={formData.bloodPressureSystolic}
                                    onChange={(e) => setFormData({ ...formData, bloodPressureSystolic: e.target.value })}
                                />
                                <span>/</span>
                                <input
                                    type="number"
                                    placeholder="Diastolic"
                                    value={formData.bloodPressureDiastolic}
                                    onChange={(e) => setFormData({ ...formData, bloodPressureDiastolic: e.target.value })}
                                />
                                <span className="unit">mmHg</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Heart Rate</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    value={formData.heartRate}
                                    onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                                />
                                <span className="unit">BPM</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Temperature</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.temperature}
                                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                                />
                                <span className="unit">°F</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Respiratory Rate</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    value={formData.respiratoryRate}
                                    onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                                />
                                <span className="unit">/min</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Oxygen Saturation</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    value={formData.oxygenSaturation}
                                    onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
                                />
                                <span className="unit">%</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Weight</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                />
                                <span className="unit">lbs</span>
                            </div>
                        </div>

                        <div className="vital-input">
                            <label>Height</label>
                            <div className="input-with-unit">
                                <input
                                    type="number"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                                <span className="unit">in</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary">Save Vitals</button>
                </form>
            )}

            <div className="vitals-history">
                <h3>Recent Vitals</h3>
                {patientVitals.length > 0 ? (
                    <div className="vitals-cards">
                        {patientVitals.map((vital) => (
                            <div key={vital.id} className="vital-card card">
                                <div className="vital-header">
                                    <span className="vital-date">{new Date(vital.date).toLocaleDateString()}</span>
                                    <span className="vital-time">{new Date(vital.date).toLocaleTimeString()}</span>
                                </div>
                                <div className="vital-data-grid">
                                    {vital.bloodPressureSystolic && (
                                        <div className="vital-item">
                                            <span className="vital-label">BP</span>
                                            <span className="vital-value">{vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic}</span>
                                            <span className="vital-unit">mmHg</span>
                                        </div>
                                    )}
                                    {vital.heartRate && (
                                        <div className="vital-item">
                                            <span className="vital-label">HR</span>
                                            <span className="vital-value">{vital.heartRate}</span>
                                            <span className="vital-unit">BPM</span>
                                        </div>
                                    )}
                                    {vital.temperature && (
                                        <div className="vital-item">
                                            <span className="vital-label">Temp</span>
                                            <span className="vital-value">{vital.temperature}</span>
                                            <span className="vital-unit">°F</span>
                                        </div>
                                    )}
                                    {vital.oxygenSaturation && (
                                        <div className="vital-item">
                                            <span className="vital-label">SpO2</span>
                                            <span className="vital-value">{vital.oxygenSaturation}</span>
                                            <span className="vital-unit">%</span>
                                        </div>
                                    )}
                                </div>
                                <div className="vital-footer">
                                    <span className="recorded-by">Recorded by: {vital.recordedBy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No vitals recorded yet</p>
                )}
            </div>
        </div>
    );
};

const MedicationsSection: React.FC<{ patientId: string }> = ({ patientId }) => {
    const patientMeds = mockMedications.filter(m => m.patientId === patientId);

    return (
        <div className="medications-section">
            <div className="section-header">
                <h2>Medications</h2>
                <button className="btn-primary">Order Medication</button>
            </div>

            {patientMeds.length > 0 ? (
                <div className="medications-list">
                    {patientMeds.map((med) => (
                        <div key={med.id} className="medication-card card">
                            <div className="med-header">
                                <h3>{med.name}</h3>
                                <span className={`status-badge status-${med.status.toLowerCase()}`}>
                                    {med.status}
                                </span>
                            </div>
                            <div className="med-details">
                                <div className="med-detail-row">
                                    <span className="label">Dosage:</span>
                                    <span className="value">{med.dosage}</span>
                                </div>
                                <div className="med-detail-row">
                                    <span className="label">Frequency:</span>
                                    <span className="value">{med.frequency}</span>
                                </div>
                                <div className="med-detail-row">
                                    <span className="label">Route:</span>
                                    <span className="value">{med.route}</span>
                                </div>
                                <div className="med-detail-row">
                                    <span className="label">Start Date:</span>
                                    <span className="value">{med.startDate}</span>
                                </div>
                                {med.instructions && (
                                    <div className="med-instructions">
                                        <span className="label">Instructions:</span>
                                        <p>{med.instructions}</p>
                                    </div>
                                )}
                            </div>
                            <div className="med-footer">
                                <span className="prescribed-by">Prescribed by: {med.prescribedBy}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-data">No medications prescribed</p>
            )}
        </div>
    );
};

const LabResultsSection: React.FC<{ patientId: string }> = ({ patientId }) => {
    const patientLabs = mockLabResults.filter(l => l.patientId === patientId);

    return (
        <div className="labs-section">
            <div className="section-header">
                <h2>Lab Results</h2>
                <button className="btn-primary">Order Lab Test</button>
            </div>

            {patientLabs.length > 0 ? (
                <div className="labs-table-container card">
                    <table className="labs-table">
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th>Category</th>
                                <th>Value</th>
                                <th>Reference Range</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Ordered By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientLabs.map((lab) => (
                                <tr key={lab.id}>
                                    <td><strong>{lab.testName}</strong></td>
                                    <td>{lab.category}</td>
                                    <td><strong>{lab.value} {lab.unit}</strong></td>
                                    <td>{lab.referenceRange} {lab.unit}</td>
                                    <td>
                                        <span className={`lab-status lab-status-${lab.status.toLowerCase()}`}>
                                            {lab.status}
                                        </span>
                                    </td>
                                    <td>{lab.date}</td>
                                    <td>{lab.orderedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-data">No lab results available</p>
            )}
        </div>
    );
};
