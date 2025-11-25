import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Appointment } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

/**
 * Custom hook for managing appointments.
 * Handles fetching appointments by date range and creating new appointments.
 * 
 * @returns {Object} Appointment data, loading state, and management methods.
 */
export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const client = authService.getClient();

    /**
     * Fetches appointments within a specified date range.
     * Defaults to the next 14 days if no dates are provided.
     * 
     * @param {string} [startDate] - ISO date string for the start of the range.
     * @param {string} [endDate] - ISO date string for the end of the range.
     */
    const fetchAppointments = useCallback(async (startDate?: string, endDate?: string) => {
        setLoading(true);
        try {
            // In a real OpenMRS instance with Appointment Module, the endpoint is usually /appointment
            // We'll assume a standard REST endpoint
            const start = startDate || new Date().toISOString().split('T')[0];
            // Default to 7 days ahead if no end date
            const end = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const response = await client.get<Appointment[]>(
                `/appointments?fromDate=${start}&toDate=${end}&v=full`
            );
            setAppointments(Array.isArray(response) ? response : []);
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
            // Don't show toast on 404/empty, just set empty
            setAppointments([]);
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

            const response = await client.post<Appointment>('/appointments', payload);
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
