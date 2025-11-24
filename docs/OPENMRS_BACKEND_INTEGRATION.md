# OpenMRS Backend Integration Plan

## Overview

This document outlines the plan to integrate OpenMRS backend features and architecture into the HMS (Hospital Management System) frontend. While HMS has its own custom branding and UI, it will leverage OpenMRS's proven backend architecture and features for medical record management.

## OpenMRS Backend Architecture

### Core Components

OpenMRS provides a robust backend platform with the following key components:

#### 1. **REST API**
- **Base URL**: `https://your-openmrs-server.org/openmrs/ws/rest/v1/`
- **Authentication**: Basic Auth or OAuth2
- **Resources**: Patient, Encounter, Observation, Concept, Order, Visit, etc.

#### 2. **FHIR API** (Recommended for Modern Integration)
- **Base URL**: `https://your-openmrs-server.org/openmrs/ws/fhir2/R4/`
- **Standard**: FHIR R4
- **Resources**: Patient, Observation, Encounter, Medication, etc.
- **Benefits**: Industry-standard, better interoperability

#### 3. **Data Model**
OpenMRS uses a flexible, concept-based data model:
- **Concepts**: Medical terminology (diagnoses, medications, lab tests)
- **Observations**: Clinical data points (vitals, lab results)
- **Encounters**: Patient visits and interactions
- **Orders**: Prescriptions, lab orders, procedures

## Integration Strategy

### Phase 1: Backend Setup (Weeks 1-2)

#### Option A: Use Existing OpenMRS Server
```bash
# Connect to existing OpenMRS instance
API_BASE_URL=https://demo.openmrs.org/openmrs/ws/rest/v1/
```

#### Option B: Deploy Your Own OpenMRS Server
```bash
# Using Docker
docker run -d \
  --name openmrs \
  -p 8080:8080 \
  -e DB_DATABASE=openmrs \
  -e DB_HOST=mysql \
  -e DB_USERNAME=openmrs \
  -e DB_PASSWORD=Admin123 \
  openmrs/openmrs-platform:latest
```

#### Option C: OpenMRS SDK (Development)
```bash
# Install OpenMRS SDK
mvn org.openmrs.maven.plugins:openmrs-sdk-maven-plugin:setup-sdk

# Create a server
mvn openmrs-sdk:setup

# Run the server
mvn openmrs-sdk:run
```

### Phase 2: API Integration (Weeks 3-4)

#### Update Core Package API Client

**File**: `packages/core/src/api/openmrs-client.ts`

```typescript
import { ApiClient } from './client';
import type { Patient, Encounter, Observation } from '../types';

export class OpenMRSClient extends ApiClient {
  constructor(baseUrl: string, username: string, password: string) {
    const authHeader = btoa(`${username}:${password}`);
    super({
      baseUrl,
      headers: {
        'Authorization': `Basic ${authHeader}`,
      },
    });
  }

  // Patient APIs
  async getPatients(query?: string) {
    return this.get<{ results: Patient[] }>('/patient', {
      q: query,
      v: 'full',
    });
  }

  async getPatient(uuid: string) {
    return this.get<Patient>(`/patient/${uuid}`, { v: 'full' });
  }

  async createPatient(patient: Partial<Patient>) {
    return this.post<Patient>('/patient', patient);
  }

  // Encounter APIs
  async getEncounters(patientUuid: string) {
    return this.get<{ results: Encounter[] }>('/encounter', {
      patient: patientUuid,
      v: 'full',
    });
  }

  async createEncounter(encounter: Partial<Encounter>) {
    return this.post<Encounter>('/encounter', encounter);
  }

  // Observation APIs
  async getObservations(patientUuid: string) {
    return this.get<{ results: Observation[] }>('/obs', {
      patient: patientUuid,
      v: 'full',
    });
  }

  async createObservation(obs: Partial<Observation>) {
    return this.post<Observation>('/obs', obs);
  }
}
```

#### Environment Configuration

**File**: `packages/app-shell/.env.local`

```env
VITE_OPENMRS_BASE_URL=https://demo.openmrs.org/openmrs/ws/rest/v1
VITE_OPENMRS_USERNAME=admin
VITE_OPENMRS_PASSWORD=Admin123
```

### Phase 3: State Management (Week 5)

#### React Query Integration

```bash
npm install @tanstack/react-query --workspace=packages/app-shell
```

**File**: `packages/app-shell/src/hooks/usePatients.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { openMRSClient } from '../services/openmrs';

export function usePatients(searchQuery?: string) {
  return useQuery({
    queryKey: ['patients', searchQuery],
    queryFn: () => openMRSClient.getPatients(searchQuery),
  });
}

export function usePatient(uuid: string) {
  return useQuery({
    queryKey: ['patient', uuid],
    queryFn: () => openMRSClient.getPatient(uuid),
    enabled: !!uuid,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (patient: Partial<Patient>) => 
      openMRSClient.createPatient(patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}
```

### Phase 4: Feature Implementation (Weeks 6-10)

#### 4.1 Patient Management Module

**Features to Implement:**
- ✅ Patient search with autocomplete
- ✅ Patient registration form
- ✅ Patient demographics display
- ✅ Patient identifier management
- ✅ Patient photo upload
- ✅ Medical history timeline

**OpenMRS APIs Used:**
- `GET /patient?q={query}` - Search patients
- `POST /patient` - Register new patient
- `GET /patient/{uuid}` - Get patient details
- `PUT /patient/{uuid}` - Update patient
- `GET /encounter?patient={uuid}` - Get patient encounters

#### 4.2 Clinical Dashboard Module

**Features to Implement:**
- ✅ Vitals recording (BP, temperature, pulse, weight)
- ✅ Medication orders
- ✅ Lab test orders
- ✅ Clinical notes
- ✅ Diagnosis entry
- ✅ Visit management

**OpenMRS APIs Used:**
- `POST /encounter` - Create encounter
- `POST /obs` - Record observations (vitals)
- `POST /order` - Create medication/lab orders
- `GET /concept` - Get medical concepts
- `GET /visit` - Get patient visits

#### 4.3 Reports & Analytics

**Features to Implement:**
- ✅ Patient statistics
- ✅ Appointment reports
- ✅ Diagnosis trends
- ✅ Medication usage
- ✅ Custom report builder

**OpenMRS APIs Used:**
- `GET /reportingrest/reportdata/{uuid}` - Get report data
- Custom aggregation queries

## OpenMRS Features to Leverage

### 1. **Concept Dictionary**
OpenMRS has a comprehensive medical concept dictionary:
- Diagnoses (ICD-10, SNOMED CT)
- Medications (RxNorm)
- Lab tests (LOINC)
- Procedures (CPT)

**Integration:**
```typescript
async function searchConcepts(query: string, conceptClass?: string) {
  return openMRSClient.get('/concept', {
    q: query,
    class: conceptClass, // 'Diagnosis', 'Drug', 'Test', etc.
  });
}
```

### 2. **Form Engine**
OpenMRS has a powerful form builder for clinical data entry:
- HTML Form Entry
- XForms
- JSON-based forms

**Integration:**
```typescript
async function getForm(formUuid: string) {
  return openMRSClient.get(`/form/${formUuid}`, { v: 'full' });
}
```

### 3. **Visit Management**
Track patient visits with check-in/check-out:
- Active visits
- Visit types
- Visit attributes

### 4. **Provider Management**
Manage healthcare providers:
- Provider roles
- Provider attributes
- Encounter providers

### 5. **Location Hierarchy**
Organize facilities and departments:
- Hospitals
- Clinics
- Wards
- Rooms

## Security Considerations

### Authentication
```typescript
// JWT-based authentication (recommended)
async function login(username: string, password: string) {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  
  const data = await response.json();
  localStorage.setItem('sessionId', data.sessionId);
  return data;
}
```

### Authorization
- Role-based access control (RBAC)
- Privilege checking
- Data access restrictions

## Performance Optimization

### 1. **Caching Strategy**
```typescript
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

### 2. **Pagination**
```typescript
async function getPatients(page: number, limit: number) {
  return openMRSClient.get('/patient', {
    startIndex: page * limit,
    limit,
  });
}
```

### 3. **Lazy Loading**
- Load patient data on demand
- Infinite scroll for lists
- Code splitting for modules

## Testing Strategy

### 1. **Mock OpenMRS Server**
```typescript
// Use MSW (Mock Service Worker) for testing
import { rest } from 'msw';

export const handlers = [
  rest.get('*/patient', (req, res, ctx) => {
    return res(ctx.json({ results: mockPatients }));
  }),
];
```

### 2. **Integration Tests**
- Test API client methods
- Test React Query hooks
- Test form submissions

## Deployment Considerations

### Development
```bash
# Local OpenMRS server
VITE_OPENMRS_BASE_URL=http://localhost:8080/openmrs/ws/rest/v1
```

### Staging
```bash
# Staging OpenMRS server
VITE_OPENMRS_BASE_URL=https://staging.yourhospital.com/openmrs/ws/rest/v1
```

### Production
```bash
# Production OpenMRS server
VITE_OPENMRS_BASE_URL=https://api.yourhospital.com/openmrs/ws/rest/v1
```

## Migration Path

### Step 1: Parallel Development
- Keep HMS frontend separate
- Connect to OpenMRS backend
- Test with demo server

### Step 2: Data Migration
- Export existing data (if any)
- Import into OpenMRS
- Validate data integrity

### Step 3: Go Live
- Deploy HMS frontend
- Connect to production OpenMRS
- Monitor and optimize

## Resources

### Official Documentation
- [OpenMRS REST API Docs](https://rest.openmrs.org/)
- [OpenMRS FHIR Module](https://wiki.openmrs.org/display/projects/OpenMRS+FHIR+Module)
- [OpenMRS Developer Guide](https://guide.openmrs.org/)

### Demo Servers
- **REST API**: https://demo.openmrs.org/openmrs/
  - Username: `admin`
  - Password: `Admin123`

### Community
- [OpenMRS Talk](https://talk.openmrs.org/)
- [OpenMRS Wiki](https://wiki.openmrs.org/)
- [GitHub](https://github.com/openmrs)

## Next Steps

1. **Choose Backend Option**: Decide between using demo server, deploying your own, or using SDK
2. **Set Up Authentication**: Implement login flow with OpenMRS credentials
3. **Implement Patient Search**: Start with basic patient search functionality
4. **Build Patient Registration**: Create form for new patient registration
5. **Add Vitals Recording**: Implement clinical data entry
6. **Expand Features**: Add more modules based on priority

## Timeline Estimate

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| Backend Setup | 1-2 weeks | OpenMRS server running, API accessible |
| API Integration | 2 weeks | Core API client, authentication working |
| State Management | 1 week | React Query setup, hooks created |
| Patient Module | 2-3 weeks | Search, registration, demographics |
| Clinical Module | 3-4 weeks | Vitals, orders, encounters |
| Reports | 2 weeks | Basic analytics and reports |
| Testing & Polish | 2 weeks | Bug fixes, optimization |
| **Total** | **13-16 weeks** | **Full HMS with OpenMRS backend** |

---

**Note**: This is a living document. Update as implementation progresses and requirements evolve.
