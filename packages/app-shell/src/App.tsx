import { useState } from 'react';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="app">
            {/* Header */}
            <header className="header glass">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                                <path d="M16 8v16M8 16h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                                        <stop offset="0%" stopColor="#0066cc" />
                                        <stop offset="100%" stopColor="#00a86b" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="logo-text">
                            <h1 className="gradient-text">OpenMRS</h1>
                            <p className="logo-subtitle">Enterprise Medical Records</p>
                        </div>
                    </div>

                    <nav className="nav">
                        <button
                            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`}
                            onClick={() => setActiveTab('patients')}
                        >
                            Patients
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'clinical' ? 'active' : ''}`}
                            onClick={() => setActiveTab('clinical')}
                        >
                            Clinical
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reports')}
                        >
                            Reports
                        </button>
                    </nav>

                    <div className="header-actions">
                        <button className="icon-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                                <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                        <div className="user-avatar">
                            <span>DR</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="container">
                    {/* Hero Section */}
                    <section className="hero slide-up">
                        <div className="hero-content">
                            <h2 className="hero-title">
                                Welcome to <span className="gradient-text">OpenMRS Enterprise</span>
                            </h2>
                            <p className="hero-description">
                                Modern, scalable medical record system built with cutting-edge technology.
                                Manage patients, clinical workflows, and healthcare data seamlessly.
                            </p>
                            <div className="hero-actions">
                                <button className="btn btn-primary">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                                        <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                    New Patient
                                </button>
                                <button className="btn btn-secondary">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                    </svg>
                                    Search Patients
                                </button>
                            </div>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-card card-glass">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #0066cc, #3385d6)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <p className="stat-label">Total Patients</p>
                                    <h3 className="stat-value">2,847</h3>
                                    <p className="stat-change positive">+12% this month</p>
                                </div>
                            </div>

                            <div className="stat-card card-glass">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #00a86b, #00c853)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <p className="stat-label">Appointments Today</p>
                                    <h3 className="stat-value">34</h3>
                                    <p className="stat-change neutral">8 pending</p>
                                </div>
                            </div>

                            <div className="stat-card card-glass">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8787)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <p className="stat-label">Avg Wait Time</p>
                                    <h3 className="stat-value">18 min</h3>
                                    <p className="stat-change positive">-5 min from avg</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="features">
                        <h3 className="section-title">Quick Access</h3>
                        <div className="features-grid">
                            <div className="feature-card card">
                                <div className="feature-icon">📋</div>
                                <h4>Patient Management</h4>
                                <p>Register, search, and manage patient records with ease</p>
                                <button className="btn-link">Access Module →</button>
                            </div>

                            <div className="feature-card card">
                                <div className="feature-icon">🏥</div>
                                <h4>Clinical Dashboard</h4>
                                <p>Track vitals, medications, and lab results in real-time</p>
                                <button className="btn-link">Open Dashboard →</button>
                            </div>

                            <div className="feature-card card">
                                <div className="feature-icon">📊</div>
                                <h4>Analytics & Reports</h4>
                                <p>Generate insights and reports from healthcare data</p>
                                <button className="btn-link">View Reports →</button>
                            </div>

                            <div className="feature-card card">
                                <div className="feature-icon">⚙️</div>
                                <h4>System Settings</h4>
                                <p>Configure modules, users, and system preferences</p>
                                <button className="btn-link">Manage Settings →</button>
                            </div>
                        </div>
                    </section>

                    {/* Architecture Info */}
                    <section className="architecture">
                        <div className="architecture-card card-glass">
                            <h3>🏗️ Built with Modern Architecture</h3>
                            <p>
                                This enterprise medical record system is inspired by OpenMRS 3.x architecture,
                                featuring a microfrontend approach with React, TypeScript, and modular design.
                            </p>
                            <div className="tech-stack">
                                <span className="tech-badge">React 18</span>
                                <span className="tech-badge">TypeScript</span>
                                <span className="tech-badge">Vite</span>
                                <span className="tech-badge">Microfrontends</span>
                                <span className="tech-badge">Module Federation</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>Built with ❤️ for better healthcare technology • Inspired by OpenMRS</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
