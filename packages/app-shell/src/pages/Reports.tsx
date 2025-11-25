import React, { useEffect } from 'react';
import { Card, Spinner } from '@openmrs-enterprise/ui-components';
import { useReports } from '../hooks/useReports';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Reports: React.FC = () => {
    const { data, loading, fetchReports } = useReports();

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="reports-page p-6 space-y-6">
            <div className="page-header mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400">Overview of patient demographics and clinic activity</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <div className="text-center py-4">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider">Total Patients</h3>
                        <p className="text-4xl font-bold text-blue-600 mt-2">{data.totalPatients}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center py-4">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider">Active Visits</h3>
                        <p className="text-4xl font-bold text-green-600 mt-2">{data.activeVisits}</p>
                    </div>
                </Card>
                <Card>
                    <div className="text-center py-4">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider">Today's Appointments</h3>
                        <p className="text-4xl font-bold text-purple-600 mt-2">{data.todayAppointments}</p>
                    </div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gender Distribution */}
                <Card title="Patient Gender Distribution">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.genderDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.genderDistribution.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Weekly Appointments */}
                <Card title="Appointments This Week">
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data.appointmentsByDay}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Appointments" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
