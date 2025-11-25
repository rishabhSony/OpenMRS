import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        open: true,
        proxy: {
            '/openmrs': {
                target: 'https://dev3.openmrs.org',
                changeOrigin: true,
                secure: false,
            }
        }
    },
})
