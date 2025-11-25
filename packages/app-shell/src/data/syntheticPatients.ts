// Synthetic Indian patient data for demo purposes
// This is NOT real patient data - generated for demonstration only

export interface SyntheticPatient {
    id: string;
    name: string;
    age: number;
    gender: 'M' | 'F';
    city: string;
    state: string;
    diagnosis?: string;
    registrationDate: string;
}

const indianNames = {
    male: [
        'Raj Kumar', 'Amit Sharma', 'Rahul Patel', 'Arjun Singh', 'Vikram Reddy',
        'Sanjay Gupta', 'Rohan Mehta', 'Anil Kumar', 'Suresh Rao', 'Manoj Verma',
        'Karan Joshi', 'Deepak Nair', 'Ravi Iyer', 'Ashok Desai', 'Prakash Pillai'
    ],
    female: [
        'Priya Sharma', 'Anjali Patel', 'Neha Singh', 'Kavita Reddy', 'Sunita Gupta',
        'Pooja Mehta', 'Ritu Kumar', 'Meera Rao', 'Lakshmi Verma', 'Divya Joshi',
        'Sneha Nair', 'Rekha Iyer', 'Geeta Desai', 'Anita Pillai', 'Shalini Kapoor'
    ]
};

const indianCities = [
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Delhi', state: 'Delhi' },
    { city: 'Bangalore', state: 'Karnataka' },
    { city: 'Hyderabad', state: 'Telangana' },
    { city: 'Chennai', state: 'Tamil Nadu' },
    { city: 'Kolkata', state: 'West Bengal' },
    { city: 'Pune', state: 'Maharashtra' },
    { city: 'Ahmedabad', state: 'Gujarat' },
    { city: 'Jaipur', state: 'Rajasthan' },
    { city: 'Lucknow', state: 'Uttar Pradesh' }
];

const commonDiagnoses = [
    'Diabetes Mellitus Type 2',
    'Hypertension',
    'Respiratory Infection',
    'Gastroenteritis',
    'Fever of Unknown Origin',
    'Arthritis',
    'Asthma',
    'Thyroid Disorder',
    'Anemia',
    'Skin Infection'
];

// Generate synthetic patient data
export const generateSyntheticPatients = (count: number = 100): SyntheticPatient[] => {
    const patients: SyntheticPatient[] = [];

    for (let i = 0; i < count; i++) {
        const gender = Math.random() > 0.5 ? 'M' : 'F';
        const nameList = gender === 'M' ? indianNames.male : indianNames.female;
        const name = nameList[Math.floor(Math.random() * nameList.length)];
        const location = indianCities[Math.floor(Math.random() * indianCities.length)];
        const age = Math.floor(Math.random() * 70) + 10; // 10-80 years
        const diagnosis = Math.random() > 0.3 ? commonDiagnoses[Math.floor(Math.random() * commonDiagnoses.length)] : undefined;

        // Generate registration date within last 2 years
        const daysAgo = Math.floor(Math.random() * 730);
        const registrationDate = new Date();
        registrationDate.setDate(registrationDate.getDate() - daysAgo);

        patients.push({
            id: `PAT-${String(i + 1).padStart(5, '0')}`,
            name,
            age,
            gender,
            city: location.city,
            state: location.state,
            diagnosis,
            registrationDate: registrationDate.toISOString().split('T')[0]
        });
    }

    return patients;
};

// Analytics helper functions
export const getAgeDistribution = (patients: SyntheticPatient[]) => {
    const ageGroups = {
        '0-18': 0,
        '19-30': 0,
        '31-45': 0,
        '46-60': 0,
        '60+': 0
    };

    patients.forEach(p => {
        if (p.age <= 18) ageGroups['0-18']++;
        else if (p.age <= 30) ageGroups['19-30']++;
        else if (p.age <= 45) ageGroups['31-45']++;
        else if (p.age <= 60) ageGroups['46-60']++;
        else ageGroups['60+']++;
    });

    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
};

export const getGenderDistribution = (patients: SyntheticPatient[]) => {
    const male = patients.filter(p => p.gender === 'M').length;
    const female = patients.filter(p => p.gender === 'F').length;

    return [
        { name: 'Male', value: male },
        { name: 'Female', value: female }
    ];
};

export const getTopDiagnoses = (patients: SyntheticPatient[], limit: number = 5) => {
    const diagnosisCount: Record<string, number> = {};

    patients.forEach(p => {
        if (p.diagnosis) {
            diagnosisCount[p.diagnosis] = (diagnosisCount[p.diagnosis] || 0) + 1;
        }
    });

    return Object.entries(diagnosisCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, value]) => ({ name, value }));
};

export const getRegistrationTrend = (patients: SyntheticPatient[]) => {
    const monthlyCount: Record<string, number> = {};

    patients.forEach(p => {
        const month = p.registrationDate.substring(0, 7); // YYYY-MM
        monthlyCount[month] = (monthlyCount[month] || 0) + 1;
    });

    return Object.entries(monthlyCount)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-12) // Last 12 months
        .map(([month, count]) => ({
            month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            count
        }));
};

export const getStateDistribution = (patients: SyntheticPatient[], limit: number = 10) => {
    const stateCount: Record<string, number> = {};

    patients.forEach(p => {
        stateCount[p.state] = (stateCount[p.state] || 0) + 1;
    });

    return Object.entries(stateCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, value]) => ({ name, value }));
};
