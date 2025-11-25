# OpenMRS Enterprise Frontend

A modern, high-performance frontend for OpenMRS, built with React, TypeScript, and Vite. This application provides a premium user interface for hospital management, including Patient Registration, Clinical Dashboards, Appointment Scheduling, and Advanced Features.

## 🚀 Features

### Core Modules
-   **Modern UI/UX**: Glassmorphism design, smooth animations, and a clean "Hospital" aesthetic.
-   **Theme Support**: Built-in Light (default) and Dark modes with high-contrast visibility.
-   **Modular Architecture**: Monorepo structure separating Core logic, UI Components, and the App Shell.
-   **Real-time Data**: Integrated with the OpenMRS REST API.

### 1. Patient Management (`/patients`)
-   **List View**: View all patients with search and filter capabilities.
-   **Registration**: Register new patients with a comprehensive form (Demographics, Contact Info).
-   **Details**: View detailed patient profiles including demographics and medical history.
-   **Offline Support**: Patient data cached locally for offline access.

### 2. Clinical Dashboard (`/clinical`)
-   **Vitals**: View and record patient vitals (Blood Pressure, Heart Rate, etc.).
-   **Medications**: Track active medications and prescriptions.
-   **Lab Results**: View recent laboratory test results.
-   **Patient Context**: Select patients to view their specific clinical data.

### 3. Appointments (`/appointments`)
-   **Calendar View**: Interactive calendar with Month/Week/Day views using react-big-calendar.
-   **Conflict Detection**: Automatic detection of overlapping appointments.
-   **List View**: Traditional list view with appointment details.
-   **Scheduling**: Book new appointments with date/time selection.

### 4. Reports & Analytics (`/reports`)
-   **Visual Analytics**: Interactive charts for hospital metrics.
-   **Patient Demographics**: Age and gender distribution charts.
-   **Clinical Metrics**: Top diagnoses and registration trends.
-   **Geographic Data**: Patient distribution by state.
-   **Synthetic Data**: Scaled to **1,248 realistic Indian patient records** for performance testing and demonstration.
-   **RBAC Protected**: Restricted to Doctor/Admin roles.

### 5. Schedule & Team Notes (`/schedule`)
-   **Unified Calendar**: View shifts, appointments, and team notes in one place.
-   **Team Notes**: Add daily notes for staff communication with "Urgent" priority flagging.
-   **Appointment Creation**: Directly schedule appointments from the calendar view.

### 6. Enhanced Appointments (`/appointments`)
-   **Daily Patient Logs**: New "Daily Log" feature allowing nurses to quickly add multiple patient entries for a specific date.
-   **Visual Summaries**: Calendar displays summary counts of logs per day.

### 7. Security & Authentication
-   **Cookie-Based Auth**: Secure `JSESSIONID` cookie management via Vite Proxy.
-   **Session Timeout**: Auto-logout after 15 minutes of inactivity.
-   **Enhanced RBAC**: Granular permissions for Receptionist, Nurse, and Doctor roles.
-   **Protected Routes**: Route-level security with role validation.

### 8. Internationalization (i18n)
-   **Multi-Language**: Full support for English (🇺🇸) and Hindi (🇮🇳).
-   **Language Switcher**: Easy toggling between languages.
-   **Persistence**: Language preference saved to local storage.

### 9. Offline & Optimization
-   **PWA**: Installable Progressive Web App with asset caching.
-   **Offline Sync**: `TanStack Query` with `localStorage` persistence for offline patient data access.
-   **Service Worker**: Automatic caching of static assets for faster load times.
-   **Optimized**: Efficient asset loading and caching strategies.

### 10. Advanced Features
-   **Dynamic Form Builder**: Schema-driven form engine for customizable patient registration.
-   **Form Engine**: Supports text, number, date, select fields with validation.
-   **Reusable Components**: Modular form components using react-hook-form.

## 📦 Tech Stack

-   **Framework**: React 18
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: CSS Variables (Theming), CSS Modules
-   **State Management**: React Context (Auth, Theme), TanStack Query (Data)
-   **Calendar**: react-big-calendar with moment.js
-   **Forms**: react-hook-form
-   **Charts**: recharts
-   **Package Manager**: NPM (Workspaces)

## 🏁 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   NPM (v7 or higher)
-   OpenMRS Backend (dev3.openmrs.org or local instance)

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
    Navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

### Default Credentials
Use OpenMRS demo credentials:
-   **Username**: `admin`
-   **Password**: `Admin123`

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

### Proxy Configuration
The Vite proxy handles CORS and cookie management:
```typescript
proxy: {
  '/openmrs': {
    target: 'https://dev3.openmrs.org',
    changeOrigin: true,
    secure: false
  }
}
```

## 🔒 Security Features

### Authentication
-   **Cookie-Based**: Secure session management using `JSESSIONID` cookies.
-   **Session Timeout**: Automatic logout after 15 minutes of inactivity.
-   **Protected Routes**: Route-level access control based on user roles.

### Role-Based Access Control (RBAC)
-   **System Developer**: Full access to all features including Reports.
-   **Provider**: Access to clinical features and patient management.
-   **Custom Roles**: Easily configurable via `ProtectedRoute` component.

### Data Security
-   **No Token Storage**: Credentials not stored in localStorage.
-   **Secure Cookies**: HttpOnly cookies for session management.
-   **CORS Handling**: Proxy configuration for secure API communication.

## 📱 Offline Support

### Progressive Web App (PWA)
-   **Installable**: Add to home screen on mobile/desktop.
-   **Service Worker**: Automatic caching of static assets.
-   **Manifest**: Configured with app icons and theme colors.

### Data Persistence
-   **TanStack Query**: Intelligent caching and background sync.
-   **localStorage**: Persistent cache for offline access.
-   **Automatic Sync**: Data syncs when connection is restored.

## 🧪 Testing

### Run Tests
```bash
npm run test -w @openmrs-enterprise/app-shell
```

### Build for Production
```bash
npm run build -w @openmrs-enterprise/app-shell
```

## 📁 Project Structure

```
openmrs-enterprise/
├── packages/
│   ├── core/                 # Core utilities and API clients
│   │   ├── src/
│   │   │   ├── api/         # API services (auth, patients, clinical)
│   │   │   └── types/       # TypeScript type definitions
│   │   └── package.json
│   ├── ui-components/        # Shared UI component library
│   │   ├── src/
│   │   │   ├── components/  # Reusable components
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Calendar/
│   │   │   │   ├── form-builder/
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   └── package.json
│   └── app-shell/            # Main application
│       ├── src/
│       │   ├── components/  # App-specific components
│       │   ├── contexts/    # React contexts (Auth, Theme)
│       │   ├── hooks/       # Custom hooks
│       │   ├── pages/       # Page components
│       │   └── App.tsx
│       └── package.json
├── ROADMAP.md               # Future development roadmap
└── README.md                # This file
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MPL-2.0 License.

## 🙏 Acknowledgments

-   Built on top of OpenMRS 3.x architecture
-   Inspired by modern healthcare management systems
-   Uses the OpenMRS REST API for backend integration

## 📞 Support

For issues and questions:
-   GitHub Issues: [rishabhSony/OpenMRS](https://github.com/rishabhSony/OpenMRS/issues)
-   OpenMRS Community: [talk.openmrs.org](https://talk.openmrs.org)
