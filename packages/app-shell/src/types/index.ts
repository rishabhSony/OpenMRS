export interface Patient {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    bloodType?: string;
    allergies?: string[];
    chronicConditions?: string[];
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    photo?: string;
    status: 'Active' | 'Inactive';
    registrationDate: string;
    lastVisit?: string;
}

export interface Vital {
    id: string;
    patientId: string;
    date: string;
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weight?: number;
    height?: number;
    bmi?: number;
    recordedBy: string;
}

export interface Medication {
    id: string;
    patientId: string;
    name: string;
    dosage: string;
    frequency: string;
    route: string;
    startDate: string;
    endDate?: string;
    prescribedBy: string;
    instructions?: string;
    status: 'Active' | 'Completed' | 'Discontinued';
}

export interface LabResult {
    id: string;
    patientId: string;
    testName: string;
    category: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
    date: string;
    orderedBy: string;
}

export interface Encounter {
    id: string;
    patientId: string;
    date: string;
    type: string;
    chiefComplaint: string;
    diagnosis?: string;
    treatment?: string;
    provider: string;
    notes?: string;
}
