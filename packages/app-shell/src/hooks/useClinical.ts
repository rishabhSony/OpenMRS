import { useState, useCallback } from 'react';
import { authService } from '@openmrs-enterprise/core';
import type { Observation, Order, Encounter } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

/**
 * Custom hook for fetching clinical data for a specific patient.
 * Manages state for vitals (observations), medications (orders), and lab results (encounters).
 * 
 * @returns {Object} Clinical data states and fetch methods.
 */
export const useClinical = () => {
    const [vitals, setVitals] = useState<Observation[]>([]);
    const [medications, setMedications] = useState<Order[]>([]);
    const [labs, setLabs] = useState<Encounter[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const client = authService.getClient();

    /**
     * Fetches all clinical data for a given patient UUID.
     * 
     * @param {string} patientUuid - The UUID of the patient to fetch data for.
     */
    const fetchPatientClinicalData = useCallback(async (patientUuid: string) => {
        if (!patientUuid) return;

        setLoading(true);
        try {
            // Fetch Vitals (Observations)
            // Using a custom representation to get exactly what we need
            const obsRep = 'custom:(uuid,obsDatetime,value,concept:(uuid,display,units),status)';
            const vitalsResponse = await client.get<{ results: Observation[] }>(
                `/obs?patient=${patientUuid}&v=${obsRep}&limit=10`
            );
            setVitals(vitalsResponse.results || []);

            // Fetch Medications (Orders)
            const orderRep = 'custom:(uuid,dateActivated,instructions,dosingInstructions,concept:(uuid,display),orderType:(uuid,name,display))';
            const medsResponse = await client.get<{ results: Order[] }>(
                `/order?patient=${patientUuid}&v=${orderRep}&type=drugorder&status=active`
            );
            setMedications(medsResponse.results || []);

            // Fetch Labs (Encounters)
            const encRep = 'custom:(uuid,encounterDatetime,encounterType:(uuid,name,display),encounterProviders:(uuid,provider:(person:(display))))';
            const labsResponse = await client.get<{ results: Encounter[] }>(
                `/encounter?patient=${patientUuid}&v=${encRep}&limit=5`
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
