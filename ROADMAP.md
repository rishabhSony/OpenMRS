# OpenMRS Enterprise - Future Roadmap

This document outlines the strategic plan for future enhancements to the OpenMRS Enterprise HMS application. While the core functionality (Patient Management, Clinical Dashboard, Reports) is complete, the following improvements will elevate the system's reliability, security, and usability, especially for low-resource settings.

## 1. Security & Authentication
- [x] **Token-Based Authentication**: Migrated from Basic Auth (stored in localStorage) to secure, cookie-based session management integrated with OpenMRS.
- [x] **Role-Based Access Control (RBAC)**: Implemented UI logic to hide/disable features based on the logged-in user's privileges (e.g., Reports restricted to System Developers).
- [x] **Session Timeout**: Auto-logout users after 15 minutes of inactivity to protect patient data.

## 2. Offline & Low-Resource Optimization
- [ ] **Progressive Web App (PWA)**: Configure Vite PWA plugin to allow the app to be installed on devices and load offline.
- [ ] **Offline Data Sync**: Implement a local database (e.g., RxDB or PouchDB) to cache patient data and sync changes when the connection is restored.
- [ ] **Image Optimization**: Compress and lazy-load images to reduce bandwidth usage.

## 3. Advanced Features Implementation Plan
### 3.1 Dynamic Form Builder
**Goal**: Replace hardcoded forms with a flexible, schema-driven engine.
- [x] **Step 1: Schema Design**: Define a JSON schema for form definitions (fields, types, validation rules).
- [x] **Step 2: Form Engine**: Build a React component that takes the schema and renders the corresponding UI inputs.
- [ ] **Step 3: Integration**: Connect the engine to the OpenMRS Form module API to fetch form definitions dynamically.

### 3.2 Appointment Scheduling UI
**Goal**: Visual calendar interface with conflict management.
- [x] **Step 1: Calendar Integration**: Integrate `react-big-calendar` or `FullCalendar` for day/week/month views.
- [x] **Step 2: Conflict Detection**: Implement logic to check for overlapping appointments before submission.
- [ ] **Step 3: Error Handling**: Display clear, user-friendly error messages when the API rejects a booking due to conflicts.
- [ ] **Step 4: Styling & UX**: Improve calendar visibility and styling for better user experience.

### 3.3 Vitals & Biometrics Module
**Goal**: Capture and visualize patient health trends.
- [ ] **Step 1: Data Model**: Define the Observation (Obs) structure for common vitals (BP, Heart Rate, Temp).
- [ ] **Step 2: Entry Form**: Create a specialized form for quick vitals entry during a visit.
- [ ] **Step 3: Visualization**: Use `recharts` to plot vitals over time, allowing clinicians to spot trends at a glance.

## 4. Technical Excellence & Quality Assurance
- [ ] **End-to-End (E2E) Testing**: Implement Playwright or Cypress tests to automate critical user flows (Login -> Register Patient -> Start Visit).
- [ ] **Global Error Boundary**: Add a React Error Boundary to catch unhandled UI errors and display a friendly fallback UI instead of crashing the white screen.
- [ ] **Internationalization (i18n)**: Set up `react-i18next` to support multiple languages, essential for global clinic deployments.
- [ ] **CI/CD Pipeline**: Set up GitHub Actions to automatically run tests and linting on every push.

## 5. UI/UX Refinements
- [ ] **Dark/Light Mode Toggle**: Fully support system-preference based theming.
- [ ] **Accessibility (a11y)**: Audit and fix contrast ratios, aria-labels, and keyboard navigation to ensure WCAG compliance.
- [ ] **Mobile Responsiveness**: Further optimize complex tables and charts for small mobile screens.
