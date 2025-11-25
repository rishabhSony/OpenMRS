import { ApiClient } from './client';
import { authService } from './auth';
import type { Appointment } from '../types';

export interface ProviderSchedule {
    uuid: string;
    provider: { uuid: string; display: string };
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

class AppointmentService {
    private get client(): ApiClient {
        return authService.getClient();
    }

    async getAppointments(params: { fromDate?: string; toDate?: string; provider?: string }): Promise<Appointment[]> {
        const response = await this.client.get<{ results: Appointment[] }>('/appointment', params);
        return response.results;
    }

    async createAppointment(data: Partial<Appointment>): Promise<Appointment> {
        return this.client.post<Appointment>('/appointment', data);
    }

    async getProviderSchedules(params: { fromDate?: string; toDate?: string }): Promise<ProviderSchedule[]> {
        // Note: This endpoint might vary based on the installed module (e.g., Provider Management)
        // Using a generic endpoint for now
        const response = await this.client.get<{ results: ProviderSchedule[] }>('/providerschedule', params);
        return response.results;
    }
}

export const appointmentService = new AppointmentService();
