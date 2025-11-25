import { ApiClient } from './client';
import { authService } from './auth';
import type { Patient, ApiResponse } from '../types';

class PatientService {
    private get client(): ApiClient {
        return authService.getClient();
    }

    async searchPatients(query: string): Promise<Patient[]> {
        const response = await this.client.get<{ results: Patient[] }>('/patient', {
            q: query,
            v: 'full',
            limit: 50
        });
        return response.results;
    }

    async getPatient(uuid: string): Promise<Patient> {
        return this.client.get<Patient>(`/patient/${uuid}`, {
            v: 'full'
        });
    }
}

export const patientService = new PatientService();
