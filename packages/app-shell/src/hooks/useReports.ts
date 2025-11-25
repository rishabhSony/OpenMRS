import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Patient, Appointment, Visit } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

export interface ReportData {
    totalPatients: number;
    activeVisits: number;
    todayAppointments: number;
    genderDistribution: { name: string; value: number }[];
    appointmentsByDay: { name: string; value: number }[];
}

export const useReports = () => {
    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const client = authService.getClient();

    const fetchReports = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch Patients (limit to 100 for stats to avoid heavy load)
            // Wrap in try-catch to prevent crashing if /patient fails (which it does on dev3 with limit)
            const patientsPromise = client.get<{ results: Patient[]; totalCount?: number }>('/patient?v=full&limit=100')
                .catch(err => {
                    console.warn('Failed to fetch patients for reports:', err);
                    return { results: [], totalCount: 0 };
                });

            // Fetch Active Visits
            const visitsPromise = client.get<{ results: Visit[]; totalCount?: number }>('/visit?includeInactive=false&v=default&limit=100')
                .catch(err => {
                    console.warn('Failed to fetch visits for reports:', err);
                    return { results: [], totalCount: 0 };
                });

            // Fetch Appointments for this week
            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

            const startStr = startOfWeek.toISOString().split('T')[0];
            const endStr = endOfWeek.toISOString().split('T')[0];

            const appointmentsPromise = client.get<Appointment[]>(
                `/appointments?fromDate=${startStr}&toDate=${endStr}&v=default`
            ).catch(err => {
                console.warn('Failed to fetch appointments for reports:', err);
                return [];
            });

            const [patientsRes, visitsRes, appointmentsRes] = await Promise.all([
                patientsPromise,
                visitsPromise,
                appointmentsPromise
            ]);

            // Process Patient Data for Gender Distribution
            // If patients API failed, try to use patients from visits
            let patientsForStats = patientsRes.results;
            if (patientsForStats.length === 0 && visitsRes.results.length > 0) {
                // Extract patients from visits if main patient fetch failed
                // Note: Visits v=default might not have full person details, but let's try
                patientsForStats = visitsRes.results
                    .map(v => v.patient)
                    .filter(p => p && p.person) as unknown as Patient[];
            }

            const genderCounts: Record<string, number> = { M: 0, F: 0, O: 0, U: 0 };
            patientsForStats.forEach(p => {
                const gender = p.person?.gender || 'U';
                genderCounts[gender] = (genderCounts[gender] || 0) + 1;
            });

            const genderDistribution = [
                { name: 'Male', value: genderCounts['M'] || 0 },
                { name: 'Female', value: genderCounts['F'] || 0 },
                { name: 'Other', value: (genderCounts['O'] || 0) + (genderCounts['U'] || 0) }
            ].filter(d => d.value > 0);

            // Process Appointments for Bar Chart
            const appointmentsByDay: Record<string, number> = {};
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(d => appointmentsByDay[d] = 0);

            // appointmentsRes is an array, not { results: ... }
            const appointments = Array.isArray(appointmentsRes) ? appointmentsRes : [];

            appointments.forEach(appt => {
                const date = new Date(appt.startDateTime);
                const dayName = days[date.getDay()];
                appointmentsByDay[dayName]++;
            });

            const appointmentsChartData = days.map(day => ({
                name: day,
                value: appointmentsByDay[day]
            }));

            // Calculate Today's Appointments
            const todayStr = new Date().toISOString().split('T')[0];
            const todayCount = appointments.filter(a =>
                a.startDateTime.startsWith(todayStr)
            ).length;

            setData({
                totalPatients: patientsRes.totalCount || patientsRes.results.length,
                activeVisits: visitsRes.totalCount || visitsRes.results.length,
                todayAppointments: todayCount,
                genderDistribution,
                appointmentsByDay: appointmentsChartData
            });

        } catch (err) {
            console.error('Failed to fetch report data:', err);
            showToast('Failed to load reports', 'error');
        } finally {
            setLoading(false);
        }
    }, [client, showToast]);

    return {
        data,
        loading,
        fetchReports
    };
};
