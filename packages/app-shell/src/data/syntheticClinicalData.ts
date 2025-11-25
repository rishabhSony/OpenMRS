import { generateSyntheticPatients } from './syntheticPatients';
import type { SyntheticPatient } from './syntheticPatients';

export interface Bed {
    id: string;
    bedNumber: string;
    status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
    patient?: SyntheticPatient;
    acuity?: 'Stable' | 'Critical' | 'Isolation' | 'Recovery';
    unit: 'ICU' | 'General Ward' | 'Emergency';
}

export interface PrescriptionLog {
    id: string;
    patientId: string;
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    status: 'Active' | 'Discontinued' | 'Completed';
    prescribedBy: string;
}

export interface ClinicalKPIs {
    occupancyRate: number;
    availableBeds: number;
    occupiedBeds: number;
    incomingAdmissions: number;
    anticipatedDischarges: number;
    averageLoS: number; // Days
    avgWaitTime: number; // Minutes
}

const MEDICATIONS = [
    { name: 'Amoxicillin', dosage: '500mg' },
    { name: 'Paracetamol', dosage: '650mg' },
    { name: 'Metformin', dosage: '500mg' },
    { name: 'Atorvastatin', dosage: '20mg' },
    { name: 'Omeprazole', dosage: '40mg' },
    { name: 'Amlodipine', dosage: '5mg' },
    { name: 'Ibuprofen', dosage: '400mg' },
    { name: 'Ceftriaxone', dosage: '1g IV' },
    { name: 'Insulin Glargine', dosage: '10 units' },
    { name: 'Pantoprazole', dosage: '40mg IV' }
];

export const generateClinicalData = () => {
    // Generate base patients
    const patients = generateSyntheticPatients(50);

    // Generate Beds
    const beds: Bed[] = [];

    let occupiedCount = 0;
    const totalBeds = 24;

    for (let i = 1; i <= totalBeds; i++) {
        const isOccupied = Math.random() > 0.3; // 70% occupancy chance
        const status = isOccupied ? 'Occupied' : (Math.random() > 0.8 ? 'Cleaning' : 'Available');

        let patient: SyntheticPatient | undefined;
        let acuity: Bed['acuity'];

        if (status === 'Occupied') {
            patient = patients[i % patients.length];
            occupiedCount++;
            const rand = Math.random();
            acuity = rand > 0.8 ? 'Critical' : rand > 0.6 ? 'Isolation' : 'Stable';
        }

        beds.push({
            id: `bed-${i}`,
            bedNumber: `B-${String(i).padStart(3, '0')}`,
            status: status as Bed['status'],
            patient,
            acuity,
            unit: i <= 6 ? 'ICU' : i <= 18 ? 'General Ward' : 'Emergency'
        });
    }

    // Generate Prescriptions for occupied beds
    const prescriptions: PrescriptionLog[] = [];
    beds.filter(b => b.status === 'Occupied' && b.patient).forEach(bed => {
        const numMeds = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numMeds; j++) {
            const med = MEDICATIONS[Math.floor(Math.random() * MEDICATIONS.length)];
            prescriptions.push({
                id: `rx-${bed.patient!.id}-${j}`,
                patientId: bed.patient!.id,
                medication: med.name,
                dosage: med.dosage,
                frequency: ['QD', 'BID', 'TID', 'Q4H'][Math.floor(Math.random() * 4)],
                startDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
                status: 'Active',
                prescribedBy: 'Dr. ' + ['Sharma', 'Patel', 'Reddy'][Math.floor(Math.random() * 3)]
            });
        }
    });

    // Calculate KPIs
    const kpis: ClinicalKPIs = {
        occupancyRate: Math.round((occupiedCount / totalBeds) * 100),
        availableBeds: totalBeds - occupiedCount,
        occupiedBeds: occupiedCount,
        incomingAdmissions: Math.floor(Math.random() * 5) + 2,
        anticipatedDischarges: Math.floor(Math.random() * 4) + 1,
        averageLoS: 4.2,
        avgWaitTime: 45 // minutes
    };

    return { beds, prescriptions, kpis };
};
