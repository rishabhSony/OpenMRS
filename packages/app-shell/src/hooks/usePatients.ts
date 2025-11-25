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
            // OpenMRS requires a query parameter for patient search
            // If no query is provided, we won't fetch anything to avoid overloading
            // In a real app, we might fetch a specific cohort or recent patients
            if (query) {
                const endpoint = `/patient?q=${query}&v=full`;
                const response = await client.get<{ results: Patient[] }>(endpoint);
                setPatients(response.results || []);
            } else {
                // Fetch recent patients from active visits if no query
                const endpoint = `/visit?includeInactive=false&v=default&limit=10`;
                const response = await client.get<{ results: any[] }>(endpoint);

                // Extract unique patient UUIDs
                const patientUuids = new Set<string>();
                response.results.forEach((visit) => {
                    if (visit.patient) {
                        patientUuids.add(visit.patient.uuid);
                    }
                });

                // Fetch full details for each patient
                const patientPromises = Array.from(patientUuids).map(uuid =>
                    client.get<Patient>(`/patient/${uuid}?v=full`)
                );

                const patients = await Promise.all(patientPromises);
                setPatients(patients);
            }
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
            // 1. Generate a valid OpenMRS ID
            // Source UUID for "Generator for OpenMRS ID" on dev3
            const idSourceUuid = '8549f706-7e85-4c1d-9424-217d50a2988b';
            const idResponse = await client.post<{ identifier: string }>(`/idgen/identifiersource/${idSourceUuid}/identifier`, {});
            const openMrsId = idResponse.identifier;

            // 2. Construct OpenMRS Person/Patient payload
            const payload = {
                person: {
                    names: [{
                        givenName: patientData.firstName,
                        familyName: patientData.lastName,
                        preferred: true
                    }],
                    gender: patientData.gender === 'Male' ? 'M' : patientData.gender === 'Female' ? 'F' : 'U',
                    birthdate: patientData.birthDate,
                    addresses: [{
                        address1: patientData.address,
                        cityVillage: patientData.city,
                        country: patientData.country || 'India', // Default to India if missing
                        postalCode: patientData.zipCode
                    }]
                },
                identifiers: [{
                    identifier: openMrsId,
                    identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334', // OpenMRS ID Type UUID
                    location: '2ccae22b-26ab-4c40-a813-55462e27a0c8', // Site 44 UUID (Valid Location)
                    preferred: true
                }]
            };

            const response = await client.post<Patient>('/patient', payload);
            setPatients(prev => [...prev, response]);
            showToast(`Patient created: ${openMrsId}`, 'success');
            return response;
        } catch (err) {
            console.error('Failed to create patient:', err);
            showToast('Failed to create patient. Please try again.', 'error');
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
