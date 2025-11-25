/**
 * Core package entry point
 * Exports all types, utilities, and API clients
 */

// Types
export * from './types';

// API Client
export * from './api/client';
export * from './api/auth';
export * from './api/clinical';
export * from './api/appointments';
export * from './types';
export * from './types/vitals';

// RBAC
export * from './rbac/permissions';

// Utilities
export * from './utils';
