import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@openmrs-enterprise/core';
import type { Appointment } from '@openmrs-enterprise/core';
import { useToast } from '@openmrs-enterprise/ui-components';

export const useAppointments = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const appointmentsQuery = useQuery({
        queryKey: ['appointments'],
        queryFn: () => appointmentService.getAppointments({}),
    });

    const createAppointmentMutation = useMutation({
        mutationFn: (data: Partial<Appointment>) => appointmentService.createAppointment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showToast('Appointment created successfully', 'success');
        },
        onError: () => {
            showToast('Failed to create appointment', 'error');
        }
    });

    const providerSchedulesQuery = useQuery({
        queryKey: ['providerSchedules'],
        queryFn: () => appointmentService.getProviderSchedules({}),
    });

    return {
        appointments: appointmentsQuery.data || [],
        providerSchedules: providerSchedulesQuery.data || [],
        isLoading: appointmentsQuery.isLoading || providerSchedulesQuery.isLoading,
        createAppointment: createAppointmentMutation.mutateAsync,
    };
};
