# OpenMRS Enterprise Medical Record System

> **Enterprise-grade medical record system inspired by OpenMRS 3.x architecture**

A modern, scalable medical record system built with React, TypeScript, and microfrontend architecture. This project is inspired by the [OpenMRS](https://openmrs.org/) platform and follows the Mozilla Public License 2.0.

![License](https://img.shields.io/badge/license-MPL--2.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)
![Node](https://img.shields.io/badge/Node-18+-339933.svg)

## 🌟 Features

- **Microfrontend Architecture**: Modular, independently deployable frontend modules
- **Modern Tech Stack**: React 18, TypeScript, Vite
- **Premium UI/UX**: Custom design system with dark mode, glassmorphism, and smooth animations
- **Patient Management**: Comprehensive patient registration, search, and demographics
- **Clinical Dashboard**: Vitals tracking, medication management, lab results
- **Monorepo Structure**: Organized workspace with shared packages
- **Enterprise Ready**: Scalable architecture for healthcare institutions

## 🏗️ Architecture

This project follows OpenMRS 3.x architectural principles:

```
openmrs-enterprise/
├── packages/
│   ├── core/                    # Shared utilities, types, API clients
│   ├── ui-components/           # Reusable UI component library
│   ├── app-shell/              # Main application shell
│   ├── patient-management/      # Patient module (microfrontend)
│   └── clinical-dashboard/      # Clinical dashboard (microfrontend)
├── docs/                        # Documentation
└── package.json                # Monorepo configuration
```

### Key Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, CSS Variables
- **State Management**: React Context, React Query
- **Microfrontends**: Module Federation (Webpack 5)
- **Monorepo**: npm workspaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:rishabhSony/OpenMRS.git
   cd OpenMRS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 📦 Packages

### Core (`packages/core`)
Shared utilities, TypeScript types, and API client functions used across all modules.

### UI Components (`packages/ui-components`)
Reusable component library with medical-specific components:
- Patient cards
- Vitals charts
- Medication lists
- Forms and inputs
- Premium design system

### App Shell (`packages/app-shell`)
Main application that coordinates all microfrontends:
- Navigation and routing
- Authentication shell
- Module loader
- Global layout

### Patient Management (`packages/patient-management`)
Patient-focused microfrontend:
- Patient registration
- Patient search and listing
- Demographics management
- Medical history

### Clinical Dashboard (`packages/clinical-dashboard`)
Clinical workflow microfrontend:
- Vitals tracking with visualizations
- Medication management
- Lab results
- Clinical notes

## 🎨 Design System

Our custom design system features:
- **Modern aesthetics**: Vibrant colors, gradients, and glassmorphism
- **Dark mode**: Full dark theme support
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG 2.1 AA compliant
- **Animations**: Smooth micro-interactions

## 🧪 Development

### Running Individual Packages

```bash
# Run app shell only
npm run dev --workspace=packages/app-shell

# Build specific package
npm run build --workspace=packages/core
```

### Code Quality

```bash
# Lint all packages
npm run lint

# Run tests
npm run test
```

## 📚 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) - Detailed architecture documentation
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute
- [API Documentation](docs/API.md) - API reference

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

### OpenMRS Attribution

This project is inspired by and follows architectural patterns from [OpenMRS](https://openmrs.org/), an open-source medical record system platform. OpenMRS is licensed under the Mozilla Public License 2.0.

**Key attributions:**
- Architecture patterns from OpenMRS 3.x
- Microfrontend approach inspired by OpenMRS frontend framework
- Medical domain modeling concepts

We are grateful to the OpenMRS community for their pioneering work in open-source healthcare technology.

## 🔗 Links

- [OpenMRS Official Website](https://openmrs.org/)
- [OpenMRS 3.x Documentation](https://openmrs.atlassian.net/wiki/spaces/projects/pages/74645504/OpenMRS+3.0+A+Frontend+Framework+that+enables+collaboration+and+better+User+Experience)
- [Project Repository](https://github.com/rishabhSony/OpenMRS)

## 💡 Roadmap

- [ ] FHIR API integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile application
- [ ] Offline mode support
- [ ] Integration with HL7 standards
- [ ] Advanced reporting tools

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for better healthcare technology**
