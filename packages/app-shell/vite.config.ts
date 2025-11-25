import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['hms-logo.png'],
                manifest: {
                    name: 'OpenMRS Enterprise HMS',
                    short_name: 'HMS',
                    description: 'Hospital Management System for Low-Resource Settings',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'hms-logo.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'hms-logo.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            })
        ],
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
