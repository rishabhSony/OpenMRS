import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@openmrs-enterprise/core';
import type { Patient } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

/**
 * Custom hook for managing patient data.
 * Provides functionality to fetch, search, and create patients via the API.
 * Uses TanStack Query for caching and offline support.
 * 
 * @returns {Object} An object containing patient data, loading state, and action methods.
 */
export const usePatients = () => {
    const [query, setQuery] = useState<string>('');
    const { showToast } = useToast();
    const client = authService.getClient();
    const queryClient = useQueryClient();

    const fetchPatientsFn = async () => {
        // Use synthetic data for demo purposes
        // In a real app, this would be an API call
        const { generateSyntheticPatients } = await import('../data/syntheticPatients');
        const syntheticData = generateSyntheticPatients(1248);

        // Map synthetic data to OpenMRS Patient structure
        return syntheticData.map(p => ({
            uuid: p.id,
            display: p.name,
            identifiers: [{
                uuid: 'id-' + p.id,
                identifier: p.id.replace('PAT-', ''),
                identifierType: { uuid: 'type-1', name: 'OpenMRS ID', description: '' },
                preferred: true
            }],
            person: {
                uuid: 'person-' + p.id,
                display: p.name,
                gender: p.gender,
                age: p.age,
                birthdate: new Date(new Date().getFullYear() - p.age, 0, 1).toISOString(),
                birthdateEstimated: true,
                dead: false,
                names: [{
                    uuid: 'name-' + p.id,
                    givenName: p.name.split(' ')[0],
                    familyName: p.name.split(' ').slice(1).join(' '),
                    preferred: true
                }],
                addresses: [{
                    uuid: 'addr-' + p.id,
                    preferred: true,
                    cityVillage: p.city,
                    stateProvince: p.state,
                    country: 'India'
                }],
                attributes: []
            },
            voided: false
        } as Patient));
    };

    const { data: patients = [], isLoading, error } = useQuery({
        queryKey: ['patients', query],
        queryFn: fetchPatientsFn,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const createPatientMutation = useMutation({
        mutationFn: async (patientData: any) => {
            // 1. Generate a valid OpenMRS ID
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
                        country: patientData.country || 'India',
                        postalCode: patientData.zipCode
                    }]
                },
                identifiers: [{
                    identifier: openMrsId,
                    identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
                    location: '2ccae22b-26ab-4c40-a813-55462e27a0c8',
                    preferred: true
                }]
            };

            const response = await client.post<Patient>('/patient', payload);
            return { response, openMrsId };
        },
        onSuccess: ({ openMrsId }) => {
            showToast(`Patient created: ${openMrsId}`, 'success');
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
        onError: (err) => {
            console.error('Failed to create patient:', err);
            showToast('Failed to create patient. Please try again.', 'error');
        }
    });

    return {
        patients,
        loading: isLoading || createPatientMutation.isPending,
        error: error ? (error as Error).message : null,
        fetchPatients: setQuery,
        createPatient: async (data: any) => {
            const result = await createPatientMutation.mutateAsync(data);
            return result.response;
        }
    };
};
