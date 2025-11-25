export interface VitalSign {
    type: VitalType;
    value: number;
    unit: string;
    timestamp: Date;
    isAbnormal?: boolean;
}

export type VitalType =
    | 'bloodPressureSystolic'
    | 'bloodPressureDiastolic'
    | 'heartRate'
    | 'temperature'
    | 'respiratoryRate'
    | 'oxygenSaturation'
    | 'weight'
    | 'height'
    | 'bmi';

export interface VitalsData {
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    heartRate?: number;
    temperature?: number;
    temperatureUnit?: 'C' | 'F';
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weight?: number;
    weightUnit?: 'kg' | 'lbs';
    height?: number;
    heightUnit?: 'cm' | 'in';
    bmi?: number;
    notes?: string;
}

export interface VitalRange {
    min: number;
    max: number;
    unit: string;
    normalMin?: number;
    normalMax?: number;
}

export const VITAL_RANGES: Record<VitalType, VitalRange> = {
    bloodPressureSystolic: { min: 70, max: 200, normalMin: 90, normalMax: 120, unit: 'mmHg' },
    bloodPressureDiastolic: { min: 40, max: 130, normalMin: 60, normalMax: 80, unit: 'mmHg' },
    heartRate: { min: 40, max: 200, normalMin: 60, normalMax: 100, unit: 'BPM' },
    temperature: { min: 35, max: 42, normalMin: 36.5, normalMax: 37.5, unit: '°C' },
    respiratoryRate: { min: 8, max: 40, normalMin: 12, normalMax: 20, unit: '/min' },
    oxygenSaturation: { min: 70, max: 100, normalMin: 95, normalMax: 100, unit: '%' },
    weight: { min: 1, max: 300, unit: 'kg' },
    height: { min: 30, max: 250, unit: 'cm' },
    bmi: { min: 10, max: 50, normalMin: 18.5, normalMax: 24.9, unit: 'kg/m²' }
};

export const isVitalAbnormal = (type: VitalType, value: number): boolean => {
    const range = VITAL_RANGES[type];
    if (!range.normalMin || !range.normalMax) return false;
    return value < range.normalMin || value > range.normalMax;
};

export const calculateBMI = (weight: number, height: number, weightUnit: 'kg' | 'lbs' = 'kg', heightUnit: 'cm' | 'in' = 'cm'): number => {
    // Convert to metric
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    const heightM = heightUnit === 'in' ? (height * 2.54) / 100 : height / 100;

    if (heightM === 0) return 0;
    return Number((weightKg / (heightM * heightM)).toFixed(1));
};
