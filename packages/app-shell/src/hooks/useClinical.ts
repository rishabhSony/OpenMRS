import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicalService } from '@openmrs-enterprise/core';
import type { Encounter, Observation } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

export const useClinical = (patientUuid?: string) => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const encountersQuery = useQuery({
        queryKey: ['encounters', patientUuid],
        queryFn: () => clinicalService.getEncounters({ patient: patientUuid! }),
        enabled: !!patientUuid,
    });

    const observationsQuery = useQuery({
        queryKey: ['observations', patientUuid],
        queryFn: () => clinicalService.getObservations(patientUuid!),
        enabled: !!patientUuid,
    });

    const createEncounterMutation = useMutation({
        mutationFn: (data: Partial<Encounter>) => clinicalService.createEncounter(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['encounters', patientUuid] });
            showToast('Encounter created successfully', 'success');
        },
        onError: () => {
            showToast('Failed to create encounter', 'error');
        }
    });

    const createObservationMutation = useMutation({
        mutationFn: (data: Partial<Observation>) => clinicalService.createObservation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['observations', patientUuid] });
            showToast('Observation recorded successfully', 'success');
        },
        onError: () => {
            showToast('Failed to record observation', 'error');
        }
    });

    return {
        encounters: encountersQuery.data || [],
        observations: observationsQuery.data || [],
        isLoading: encountersQuery.isLoading || observationsQuery.isLoading,
        createEncounter: createEncounterMutation.mutateAsync,
        createObservation: createObservationMutation.mutateAsync,
    };
};
