import React from 'react';
import { Card } from '@openmrs-enterprise/ui-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './VitalsTrends.css';

interface VitalReading {
    timestamp: string;
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
}

interface VitalsTrendsProps {
    data: VitalReading[];
}

export const VitalsTrends: React.FC<VitalsTrendsProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Card title="Vitals Trends">
                <div className="no-data">
                    No vitals data available for visualization
                </div>
            </Card>
        );
    }

    // Format data for chart
    const chartData = data.map(reading => ({
        date: new Date(reading.timestamp).toLocaleDateString(),
        'BP Systolic': reading.bloodPressureSystolic,
        'BP Diastolic': reading.bloodPressureDiastolic,
        'Heart Rate': reading.heartRate,
        'Temperature': reading.temperature,
        'SpO2': reading.oxygenSaturation
    }));

    return (
        <Card title="Vitals Trends" className="vitals-trends">
            <div className="chart-container">
                <h4>Blood Pressure & Heart Rate</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="BP Systolic" stroke="#f44336" strokeWidth={2} />
                        <Line type="monotone" dataKey="BP Diastolic" stroke="#ff9800" strokeWidth={2} />
                        <Line type="monotone" dataKey="Heart Rate" stroke="#2196f3" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h4>Temperature & Oxygen Saturation</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Temperature" stroke="#4caf50" strokeWidth={2} />
                        <Line type="monotone" dataKey="SpO2" stroke="#9c27b0" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
