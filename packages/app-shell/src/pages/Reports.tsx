import React, { useMemo } from 'react';
import { Card } from '@openmrs-enterprise/ui-components';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
    generateSyntheticPatients,
    getAgeDistribution,
    getGenderDistribution,
    getTopDiagnoses,
    getRegistrationTrend,
    getStateDistribution
} from '../data/syntheticPatients';
import './Reports.css';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b'];

export const Reports: React.FC = () => {
    // Generate synthetic patient data (memoized to avoid regeneration on re-renders)
    const patients = useMemo(() => generateSyntheticPatients(150), []);

    const ageDistribution = useMemo(() => getAgeDistribution(patients), [patients]);
    const genderDistribution = useMemo(() => getGenderDistribution(patients), [patients]);
    const topDiagnoses = useMemo(() => getTopDiagnoses(patients, 5), [patients]);
    const registrationTrend = useMemo(() => getRegistrationTrend(patients), [patients]);
    const stateDistribution = useMemo(() => getStateDistribution(patients, 8), [patients]);

    const totalPatients = patients.length;
    const averageAge = Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length);
    const malePercentage = Math.round((genderDistribution.find(g => g.name === 'Male')?.value || 0) / totalPatients * 100);

    return (
        <div className="reports-page">
            <div className="page-header">
                <h1>Reports & Analytics</h1>
                <p className="subtitle">Comprehensive patient data and system metrics</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="metrics-grid">
                <Card className="metric-card">
                    <div className="metric-content">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            👥
                        </div>
                        <div className="metric-info">
                            <h3>Total Patients</h3>
                            <p className="metric-value">{totalPatients}</p>
                            <span className="metric-label">Registered</span>
                        </div>
                    </div>
                </Card>

                <Card className="metric-card">
                    <div className="metric-content">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            📊
                        </div>
                        <div className="metric-info">
                            <h3>Average Age</h3>
                            <p className="metric-value">{averageAge}</p>
                            <span className="metric-label">Years</span>
                        </div>
                    </div>
                </Card>

                <Card className="metric-card">
                    <div className="metric-content">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            ♂️
                        </div>
                        <div className="metric-info">
                            <h3>Male Patients</h3>
                            <p className="metric-value">{malePercentage}%</p>
                            <span className="metric-label">Of Total</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
                {/* Age Distribution */}
                <Card title="Age Distribution" className="chart-card">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ageDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#667eea" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Gender Distribution */}
                <Card title="Gender Distribution" className="chart-card">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {genderDistribution.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Top Diagnoses */}
                <Card title="Top Diagnoses" className="chart-card">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topDiagnoses} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#764ba2" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Registration Trend */}
                <Card title="Patient Registration Trend" className="chart-card">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={registrationTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#4facfe" strokeWidth={2} name="New Patients" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* State Distribution */}
                <Card title="Patients by State" className="chart-card full-width">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stateDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#43e97b" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Data Note */}
            <div className="data-note">
                <p>📊 <strong>Note:</strong> This data is synthetically generated for demonstration purposes and does not represent real patient information.</p>
            </div>
        </div>
    );
};
