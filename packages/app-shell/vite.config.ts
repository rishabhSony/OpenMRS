import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],
        server: {
            port: 5173,
            open: true,
            proxy: {
                '/openmrs': {
                    target: env.VITE_OPENMRS_API_URL || 'https://dev3.openmrs.org',
                    changeOrigin: true,
                    secure: false,
                }
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/test/setup.ts',
        },
    }
})
