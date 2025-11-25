import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Observation, Order, Encounter } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

export const useClinical = () => {
    const [vitals, setVitals] = useState<Observation[]>([]);
    const [medications, setMedications] = useState<Order[]>([]);
    const [labs, setLabs] = useState<Encounter[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const client = authService.getClient();

    const fetchPatientClinicalData = useCallback(async (patientUuid: string) => {
        if (!patientUuid) return;

        setLoading(true);
        try {
            // Fetch Vitals (Observations)
            // In a real app, we would filter by concept class "Diagnosis" or specific concept UUIDs
            const vitalsResponse = await client.get<{ results: Observation[] }>(
                `/obs?patient=${patientUuid}&v=full&limit=10`
            );
            setVitals(vitalsResponse.results || []);

            // Fetch Medications (Orders)
            const medsResponse = await client.get<{ results: Order[] }>(
                `/order?patient=${patientUuid}&v=full&type=drugorder&status=active`
            );
            setMedications(medsResponse.results || []);

            // Fetch Labs (Encounters with type 'Lab Result' or similar)
            // Assuming a standard encounter type for labs, or just fetching recent encounters
            const labsResponse = await client.get<{ results: Encounter[] }>(
                `/encounter?patient=${patientUuid}&v=full&limit=5`
            );
            setLabs(labsResponse.results || []);

        } catch (err) {
            console.error('Failed to fetch clinical data:', err);
            showToast('Failed to load clinical data', 'error');
        } finally {
            setLoading(false);
        }
    }, [client, showToast]);

    const addVital = async (patientUuid: string, conceptUuid: string, value: number) => {
        try {
            const payload = {
                person: patientUuid,
                concept: conceptUuid,
                obsDatetime: new Date().toISOString(),
                value: value
            };
            const response = await client.post<Observation>('/obs', payload);
            setVitals(prev => [response, ...prev]);
            showToast('Vital recorded successfully', 'success');
            return response;
        } catch (err) {
            console.error('Failed to record vital:', err);
            showToast('Failed to record vital', 'error');
            throw err;
        }
    };

    return {
        vitals,
        medications,
        labs,
        loading,
        fetchPatientClinicalData,
        addVital
    };
};
