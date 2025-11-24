import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Patients } from './pages/Patients';
import { Clinical } from './pages/Clinical';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

function AppContent() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="app">
            {/* Header */}
            <header className="header glass">
                <div className="header-content">
                    <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="logo-icon">
                            <img src="/hms-logo.png" alt="HMS Logo" width="48" height="48" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 102, 204, 0.4)' }} />
                        </div>
                        <div className="logo-text">
                            <h1 className="gradient-text">HMS</h1>
                            <p className="logo-subtitle">Hospital Management System</p>
                        </div>
                    </Link>

                    <nav className="nav">
                        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                            Dashboard
                        </Link>
                        <Link to="/patients" className={`nav-item ${isActive('/patients') ? 'active' : ''}`}>
                            Patients
                        </Link>
                        <Link to="/clinical" className={`nav-item ${isActive('/clinical') ? 'active' : ''}`}>
                            Clinical
                        </Link>
                        <Link to="/reports" className={`nav-item ${isActive('/reports') ? 'active' : ''}`}>
                            Reports
                        </Link>
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
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/clinical" element={<Clinical />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>Built with ❤️ for better healthcare technology • HMS - Hospital Management System</p>
                </div>
            </footer>
        </div>
    );
}

function Dashboard() {
    return (
        <div className="container">
            {/* Hero Section */}
            <section className="hero slide-up">
                <div className="hero-content">
                    <h2 className="hero-title">
                        Welcome to <span className="gradient-text">HMS</span>
                    </h2>
                    <p className="hero-description">
                        Modern, scalable Hospital Management System built with cutting-edge technology.
                        Manage patients, clinical workflows, and healthcare data seamlessly.
                    </p>
                    <div className="hero-actions">
                        <Link to="/patients" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                                <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            New Patient
                        </Link>
                        <Link to="/patients" className="btn btn-secondary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                            </svg>
                            Search Patients
                        </Link>
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
                    <Link to="/patients" className="feature-card card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="feature-icon">📋</div>
                        <h4>Patient Management</h4>
                        <p>Register, search, and manage patient records with ease</p>
                        <button className="btn-link">Access Module →</button>
                    </Link>

                    <Link to="/clinical" className="feature-card card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="feature-icon">🏥</div>
                        <h4>Clinical Dashboard</h4>
                        <p>Track vitals, medications, and lab results in real-time</p>
                        <button className="btn-link">Open Dashboard →</button>
                    </Link>

                    <Link to="/reports" className="feature-card card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="feature-icon">📊</div>
                        <h4>Analytics & Reports</h4>
                        <p>Generate insights and reports from healthcare data</p>
                        <button className="btn-link">View Reports →</button>
                    </Link>

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
    );
}

function Reports() {
    return (
        <div className="container" style={{ padding: '3rem' }}>
            <h1>Reports & Analytics</h1>
            <p className="subtitle">Generate insights and reports from healthcare data</p>
            <div className="card" style={{ marginTop: '2rem', padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
                    Reports module coming soon...
                </p>
            </div>
        </div>
    );
}

export default App;
