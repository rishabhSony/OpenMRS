# OpenMRS Enterprise Frontend

A modern, high-performance frontend for OpenMRS, built with React, TypeScript, and Vite. This application provides a premium user interface for hospital management, including Patient Registration, Clinical Dashboards, and Appointment Scheduling.

## 🚀 Features

-   **Modern UI/UX**: Glassmorphism design, smooth animations, and a clean "Hospital" aesthetic.
-   **Theme Support**: Built-in Light (default) and Dark modes with high-contrast visibility.
-   **Modular Architecture**: Monorepo structure separating Core logic, UI Components, and the App Shell.
-   **Real-time Data**: Integrated with the OpenMRS REST API.

## 📦 Modules

### 1. Patient Management (`/patients`)
-   **List View**: View all patients with search and filter capabilities.
-   **Registration**: Register new patients with a comprehensive form (Demographics, Contact Info).
-   **Details**: View detailed patient profiles including demographics and medical history.

### 2. Clinical Dashboard (`/clinical`)
-   **Vitals**: View and record patient vitals (Blood Pressure, Heart Rate, etc.).
-   **Medications**: Track active medications and prescriptions.
-   **Lab Results**: View recent laboratory test results.
-   **Patient Context**: Select patients to view their specific clinical data.

### 3. Appointments (`/appointments`)
-   **Scheduling**: Book new appointments for patients.
-   **Calendar**: View upcoming appointments (List view currently implemented).
-   **Status Tracking**: Track appointment status (Scheduled, Completed, Cancelled).

### 4. Security & Authentication
-   **Login**: Secure login using OpenMRS Basic Authentication (Initial) -> Cookie-based Session (Current).
-   **Session Management**: Persistent sessions with auto-logout after 15 minutes of inactivity.
-   **RBAC**: Role-Based Access Control restricting sensitive areas (e.g., Reports) to authorized roles.
-   **Cookie-Based Auth**: Secure `JSESSIONID` cookie management via Vite Proxy.

### 5. Offline & Optimization
-   **PWA**: Installable Progressive Web App with asset caching.
-   **Offline Sync**: `TanStack Query` with `localStorage` persistence allows viewing patient data without an internet connection.
-   **Optimized**: Efficient asset loading and caching strategies.

## 🛠️ Tech Stack

-   **Framework**: React 18
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: CSS Variables (Theming), CSS Modules
-   **State Management**: React Context (Auth, Theme)
-   **Package Manager**: NPM (Workspaces)

## 🏁 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   NPM (v7 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:rishabhSony/OpenMRS.git
    cd OpenMRS
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Build the shared packages first:**
    ```bash
    npm run build -w @openmrs-enterprise/core
    npm run build -w @openmrs-enterprise/ui-components
    ```

2.  **Start the development server:**
    ```bash
    npm run dev -w @openmrs-enterprise/app-shell
    ```

3.  **Open in Browser:**
    Navigate to [http://localhost:5173](http://localhost:5173).

## 🎨 Theme Customization

The application uses CSS variables for theming. You can find the theme definitions in `packages/app-shell/src/index.css`.

-   **Light Mode**: Default. Optimized for clinical environments (High brightness, clean look).
-   **Dark Mode**: Optimized for low-light environments (High contrast, dark backgrounds).

Toggle the theme using the ☀️/🌙 button in the Login page or the Main Header.

## 🔌 Backend Connection

The application connects to the OpenMRS REST API.

-   **Default URL**: `https://dev3.openmrs.org/openmrs/ws/rest/v1` (Proxied via `/openmrs` locally)
-   **Configuration**: The API URL is configured in `packages/app-shell/vite.config.ts` (Proxy) and `packages/core/src/api/auth.ts`.
-   **Environment Variables**: Set `VITE_OPENMRS_API_URL` to override the backend URL.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
