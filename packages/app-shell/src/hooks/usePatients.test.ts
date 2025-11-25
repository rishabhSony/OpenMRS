import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePatients } from './usePatients';
import { authService } from '@openmrs-enterprise/core';

// Mock authService and client
vi.mock('@openmrs-enterprise/core', () => ({
    authService: {
        getClient: vi.fn()
    }
}));

// Mock useToast
vi.mock('@openmrs-enterprise/ui-components', () => ({
    useToast: () => ({
        showToast: vi.fn()
    })
}));

describe('usePatients', () => {
    const mockGet = vi.fn();
    const mockPost = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (authService.getClient as any).mockReturnValue({
            get: mockGet,
            post: mockPost
        });
    });

    it('should fetch patients successfully', async () => {
        const mockPatients = [{ uuid: '123', person: { names: [{ givenName: 'John' }] } }];
        mockGet.mockResolvedValue({ results: mockPatients });

        const { result } = renderHook(() => usePatients());

        await act(async () => {
            await result.current.fetchPatients('John');
        });

        expect(mockGet).toHaveBeenCalledWith('/patient?q=John&v=full');
        expect(result.current.patients).toEqual(mockPatients);
    });

    it('should create patient successfully', async () => {
        const mockIdResponse = { identifier: '10000G' };
        const mockPatientResponse = { uuid: '123', person: { names: [{ givenName: 'Test' }] } };

        mockPost.mockImplementation((url) => {
            if (url.includes('/idgen')) return Promise.resolve(mockIdResponse);
            if (url === '/patient') return Promise.resolve(mockPatientResponse);
            return Promise.reject('Unknown URL');
        });

        const { result } = renderHook(() => usePatients());

        const patientData = {
            firstName: 'Test',
            lastName: 'Patient',
            gender: 'Male',
            birthDate: '1990-01-01',
            address: '123 St',
            city: 'City',
            zipCode: '12345'
        };

        await act(async () => {
            await result.current.createPatient(patientData);
        });

        // Verify ID generation call
        expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining('/idgen/identifiersource/'),
            {}
        );

        // Verify Patient creation call
        expect(mockPost).toHaveBeenCalledWith('/patient', expect.objectContaining({
            person: expect.objectContaining({
                gender: 'M'
            }),
            identifiers: expect.arrayContaining([
                expect.objectContaining({
                    identifier: '10000G'
                })
            ])
        }));

        expect(result.current.patients).toContainEqual(mockPatientResponse);
    });
});
