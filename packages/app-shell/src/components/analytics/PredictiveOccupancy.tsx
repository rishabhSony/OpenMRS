import React, { useMemo } from 'react';
import { Card } from '@openmrs-enterprise/ui-components';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface DataPoint {
    date: string;
    occupancy: number;
    type: 'Historical' | 'Projected';
}

export const PredictiveOccupancy: React.FC = () => {
    // Generate synthetic data and forecast
    const data = useMemo(() => {
        const points: DataPoint[] = [];
        const today = new Date();
        const historicalDays = 14;
        const forecastDays = 7;

        // Generate historical data with some randomness and trend
        let currentOccupancy = 75;
        for (let i = historicalDays; i > 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            // Random fluctuation
            const change = (Math.random() - 0.5) * 10;
            currentOccupancy = Math.max(50, Math.min(100, currentOccupancy + change));

            points.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                occupancy: Math.round(currentOccupancy),
                type: 'Historical'
            });
        }

        // Simple Linear Regression (Least Squares Method) for Forecast
        // We calculate the slope (m) and intercept (b) for the line y = mx + b
        // where x is the day index and y is the occupancy percentage.
        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        points.forEach((p, i) => {
            sumX += i;
            sumY += p.occupancy;
            sumXY += i * p.occupancy;
            sumXX += i * i;
        });

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Generate forecast
        for (let i = 0; i < forecastDays; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const x = n + i;
            const projectedOccupancy = Math.min(100, Math.max(0, slope * x + intercept));

            points.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                occupancy: Math.round(projectedOccupancy),
                type: 'Projected'
            });
        }

        return points;
    }, []);

    return (
        <Card title="AI Bed Occupancy Prediction">
            <div style={{ height: 300, width: '100%' }}>
                <ResponsiveContainer>
                    <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="occupancy"
                            data={data.filter(d => d.type === 'Historical')}
                            name="Historical"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorHistorical)"
                        />
                        <Line
                            type="monotone"
                            dataKey="occupancy"
                            data={data.filter(d => d.type === 'Projected')}
                            name="Projected (AI)"
                            stroke="#82ca9d"
                            strokeDasharray="5 5"
                            dot={{ stroke: '#82ca9d', strokeWidth: 2 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
                <p>
                    <strong>Analysis:</strong> Based on the last 14 days, bed occupancy is trending
                    {data[data.length - 1].occupancy > data[0].occupancy ? ' upwards 📈' : ' downwards 📉'}.
                    Predicted to reach {data[data.length - 1].occupancy}% by next week.
                </p>
            </div>
        </Card>
    );
};
