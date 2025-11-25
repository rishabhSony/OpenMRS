import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Patient } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

/**
 * Custom hook for managing patient data.
 * Provides functionality to fetch, search, and create patients via the API.
 * 
 * @returns {Object} An object containing patient data, loading state, and action methods.
 */
export const usePatients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const client = authService.getClient();

    /**
     * Fetches patients from the API.
     * If a query is provided, performs a search; otherwise, fetches recent patients.
     * 
     * @param {string} [query] - Optional search string (name or identifier).
     */
    const fetchPatients = useCallback(async (query?: string) => {
        setLoading(true);
        setError(null);
        try {
            // In a real OpenMRS instance, we would use the /patient endpoint with 'q' parameter
            // For now, we'll assume a standard REST endpoint structure
            const endpoint = query ? `/patient?q=${query}&v=full` : '/patient?v=full';
            const response = await client.get<{ results: Patient[] }>(endpoint);

            // Map the API response to our internal Patient type if needed
            // The core Patient type matches OpenMRS REST representation closely
            setPatients(response.results || []);
        } catch (err) {
            console.error('Failed to fetch patients:', err);
            setError('Failed to load patients');
            showToast('Failed to load patients', 'error');
        } finally {
            setLoading(false);
        }
    }, [client, showToast]);

    const createPatient = async (patientData: any) => {
        setLoading(true);
        try {
            // Construct OpenMRS Person/Patient payload
            const payload = {
                person: {
                    names: [{
                        givenName: patientData.firstName,
                        familyName: patientData.lastName,
                        preferred: true
                    }],
                    gender: patientData.gender,
                    birthdate: patientData.birthDate,
                    addresses: [{
                        address1: patientData.address,
                        cityVillage: patientData.city,
                        country: patientData.country,
                        postalCode: patientData.postalCode
                    }]
                },
                identifiers: [{
                    identifier: Math.floor(Math.random() * 1000000).toString(), // Generate random ID for now
                    identifierType: '8d79403a-c2cc-11de-8d13-0010c6dffd0f', // OpenMRS ID Type UUID (example)
                    location: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f', // Unknown Location UUID (example)
                    preferred: true
                }]
            };

            const response = await client.post<Patient>('/patient', payload);
            setPatients(prev => [...prev, response]);
            showToast('Patient created successfully', 'success');
            return response;
        } catch (err) {
            console.error('Failed to create patient:', err);
            showToast('Failed to create patient', 'error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        patients,
        loading,
        error,
        fetchPatients,
        createPatient
    };
};
