# OpenMRS Enterprise Frontend

A modern, high-performance frontend for OpenMRS, built with React, TypeScript, and Vite.

## Features

- **Modern UI/UX**: Built with a custom design system using glassmorphism and modern aesthetics.
- **Modular Architecture**: Monorepo structure with separate packages for core logic, UI components, and the app shell.
- **Role-Based Access**: Secure authentication and role-based route protection.
- **Patient Management**: Comprehensive patient search, registration, and dashboard.
- **Clinical Dashboard**: Vitals, medications, and lab results visualization.
- **Appointment Scheduling**: Calendar and list views for managing appointments.

## Project Structure

- `packages/core`: Core business logic, API clients, and types.
- `packages/ui-components`: Reusable UI components (Button, Card, Table, etc.).
- `packages/app-shell`: Main application shell and pages.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

This will start the application at `http://localhost:5173`.

### Building

Build all packages:

```bash
npm run build
```

## Backend Integration

This frontend is designed to work with the OpenMRS REST API. Configure the API base URL in `packages/core/src/api/client.ts` or via environment variables.

## License

MIT
