# OpenMRS Enterprise - Future Roadmap

This document outlines the strategic plan for future enhancements to the OpenMRS Enterprise HMS application. While the core functionality (Patient Management, Clinical Dashboard, Reports) is complete, the following improvements will elevate the system's reliability, security, and usability, especially for low-resource settings.

## 1. Security & Authentication
- [ ] **Token-Based Authentication**: Migrate from Basic Auth (stored in localStorage) to a more secure, cookie-based session management or JWT flow integrated with OpenMRS.
- [ ] **Role-Based Access Control (RBAC)**: Implement UI logic to hide/disable features based on the logged-in user's privileges (e.g., only admins can delete patients).
- [ ] **Session Timeout**: Auto-logout users after a period of inactivity to protect patient data.

## 2. Offline & Low-Resource Optimization
- [ ] **Progressive Web App (PWA)**: Configure Vite PWA plugin to allow the app to be installed on devices and load offline.
- [ ] **Offline Data Sync**: Implement a local database (e.g., RxDB or PouchDB) to cache patient data and sync changes when the connection is restored.
- [ ] **Image Optimization**: Compress and lazy-load images to reduce bandwidth usage.

## 3. Advanced Features
- [ ] **Dynamic Form Builder**: Replace the hardcoded Patient Registration form with a schema-driven form builder that renders fields based on OpenMRS configuration (allowing custom attributes without code changes).
- [ ] **Appointment Scheduling UI**: Enhance the appointment creation flow with a calendar view and conflict detection (visualizing the API errors we saw).
- [ ] **Vitals & Biometrics**: Add a dedicated module for capturing and visualizing patient vitals over time.

## 4. Technical Excellence & Quality Assurance
- [ ] **End-to-End (E2E) Testing**: Implement Playwright or Cypress tests to automate critical user flows (Login -> Register Patient -> Start Visit).
- [ ] **Global Error Boundary**: Add a React Error Boundary to catch unhandled UI errors and display a friendly fallback UI instead of crashing the white screen.
- [ ] **Internationalization (i18n)**: Set up `react-i18next` to support multiple languages, essential for global clinic deployments.
- [ ] **CI/CD Pipeline**: Set up GitHub Actions to automatically run tests and linting on every push.

## 5. UI/UX Refinements
- [ ] **Dark/Light Mode Toggle**: Fully support system-preference based theming.
- [ ] **Accessibility (a11y)**: Audit and fix contrast ratios, aria-labels, and keyboard navigation to ensure WCAG compliance.
- [ ] **Mobile Responsiveness**: Further optimize complex tables and charts for small mobile screens.
