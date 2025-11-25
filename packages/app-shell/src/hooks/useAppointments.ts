import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Appointment } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const client = authService.getClient();

    const fetchAppointments = useCallback(async (startDate?: string, endDate?: string) => {
        setLoading(true);
        try {
            // In a real OpenMRS instance with Appointment Module, the endpoint is usually /appointment
            // We'll assume a standard REST endpoint
            const start = startDate || new Date().toISOString().split('T')[0];
            // Default to 7 days ahead if no end date
            const end = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const response = await client.get<{ results: Appointment[] }>(
                `/appointment?fromDate=${start}&toDate=${end}&v=full`
            );
            setAppointments(response.results || []);
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
            showToast('Failed to load appointments', 'error');
        } finally {
            setLoading(false);
        }
    }, [client, showToast]);

    const createAppointment = async (appointmentData: any) => {
        setLoading(true);
        try {
            const payload = {
                patient: appointmentData.patientUuid,
                appointmentType: appointmentData.typeUuid,
                startDateTime: appointmentData.startDateTime,
                endDateTime: appointmentData.endDateTime,
                provider: appointmentData.providerUuid,
                location: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f', // Example location
                status: 'SCHEDULED'
            };

            const response = await client.post<Appointment>('/appointment', payload);
            setAppointments(prev => [...prev, response]);
            showToast('Appointment scheduled successfully', 'success');
            return response;
        } catch (err) {
            console.error('Failed to schedule appointment:', err);
            showToast('Failed to schedule appointment', 'error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        appointments,
        loading,
        fetchAppointments,
        createAppointment
    };
};
