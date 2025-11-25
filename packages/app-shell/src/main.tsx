import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { authService } from '@openmrs-enterprise/core';

// Configure API URL from environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://demo.openmrs.org/openmrs/ws/rest/v1';
authService.configure({ baseUrl: apiUrl });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
