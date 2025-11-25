import { ApiClient } from './client';
import { authService } from './auth';
import type { Encounter, Observation } from '../types';

class ClinicalService {
    private get client(): ApiClient {
        return authService.getClient();
    }

    async getEncounters(params: { patient?: string; fromdate?: string; todate?: string }): Promise<Encounter[]> {
        const response = await this.client.get<{ results: Encounter[] }>('/encounter', {
            ...params,
            v: 'full'
        });
        return response.results;
    }

    async createEncounter(data: Partial<Encounter>): Promise<Encounter> {
        return this.client.post<Encounter>('/encounter', data);
    }

    async getObservations(patientUuid: string): Promise<Observation[]> {
        const response = await this.client.get<{ results: Observation[] }>('/obs', {
            patient: patientUuid,
            v: 'full'
        });
        return response.results;
    }

    async createObservation(data: Partial<Observation>): Promise<Observation> {
        return this.client.post<Observation>('/obs', data);
    }
}

export const clinicalService = new ClinicalService();
