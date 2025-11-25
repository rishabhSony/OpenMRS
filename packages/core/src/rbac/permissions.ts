// Role definitions and permissions
export const ROLES = {
    RECEPTIONIST: 'Receptionist',
    NURSE: 'Nurse',
    DOCTOR: 'System Developer', // OpenMRS admin role
    PROVIDER: 'Provider' // Also considered as Doctor
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Permission definitions
export const PERMISSIONS = {
    // Patient permissions
    VIEW_PATIENTS: 'view_patients',
    REGISTER_PATIENTS: 'register_patients',
    EDIT_PATIENT_DEMOGRAPHICS: 'edit_patient_demographics',

    // Clinical permissions
    VIEW_CLINICAL_DATA: 'view_clinical_data',
    RECORD_VITALS: 'record_vitals',
    VIEW_VITALS: 'view_vitals',
    PRESCRIBE_MEDICATIONS: 'prescribe_medications',
    VIEW_MEDICATIONS: 'view_medications',
    ORDER_LABS: 'order_labs',
    VIEW_LAB_RESULTS: 'view_lab_results',

    // Appointment permissions
    VIEW_APPOINTMENTS: 'view_appointments',
    SCHEDULE_APPOINTMENTS: 'schedule_appointments',
    CANCEL_APPOINTMENTS: 'cancel_appointments',

    // Reports permissions
    VIEW_REPORTS: 'view_reports',
    GENERATE_REPORTS: 'generate_reports',

    // System permissions
    MANAGE_USERS: 'manage_users',
    ACCESS_FORM_BUILDER: 'access_form_builder',
    SYSTEM_ADMIN: 'system_admin'
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
    [ROLES.RECEPTIONIST]: [
        PERMISSIONS.VIEW_PATIENTS,
        PERMISSIONS.REGISTER_PATIENTS,
        PERMISSIONS.EDIT_PATIENT_DEMOGRAPHICS,
        PERMISSIONS.VIEW_APPOINTMENTS,
        PERMISSIONS.SCHEDULE_APPOINTMENTS,
        PERMISSIONS.CANCEL_APPOINTMENTS
    ],
    [ROLES.NURSE]: [
        PERMISSIONS.VIEW_PATIENTS,
        PERMISSIONS.VIEW_CLINICAL_DATA,
        PERMISSIONS.RECORD_VITALS,
        PERMISSIONS.VIEW_VITALS,
        PERMISSIONS.VIEW_MEDICATIONS,
        PERMISSIONS.VIEW_LAB_RESULTS,
        PERMISSIONS.VIEW_APPOINTMENTS
    ],
    [ROLES.DOCTOR]: [
        // Full access - all permissions
        ...Object.values(PERMISSIONS)
    ],
    [ROLES.PROVIDER]: [
        // Same as doctor
        ...Object.values(PERMISSIONS)
    ]
};

// Helper function to check if user has permission
export const hasPermission = (userRoles: string[], permission: Permission): boolean => {
    if (!userRoles || userRoles.length === 0) return false;

    return userRoles.some(role => {
        const rolePermissions = ROLE_PERMISSIONS[role] || [];
        return rolePermissions.includes(permission);
    });
};

// Helper function to check if user has any of the specified roles
export const hasRole = (userRoles: string[], allowedRoles: string[]): boolean => {
    if (!userRoles || userRoles.length === 0) return false;
    return userRoles.some(role => allowedRoles.includes(role));
};

// Helper function to get user's highest priority role
export const getPrimaryRole = (userRoles: string[]): string | null => {
    if (!userRoles || userRoles.length === 0) return null;

    // Priority order: Doctor > Nurse > Receptionist
    if (userRoles.includes(ROLES.DOCTOR) || userRoles.includes(ROLES.PROVIDER)) {
        return 'Doctor';
    }
    if (userRoles.includes(ROLES.NURSE)) {
        return 'Nurse';
    }
    if (userRoles.includes(ROLES.RECEPTIONIST)) {
        return 'Receptionist';
    }

    return userRoles[0];
};
