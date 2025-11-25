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
                    name: 'Hospital Management System',
                    short_name: 'HMS',
                    description: 'OpenMRS Enterprise Hospital Management System for Healthcare',
                    theme_color: '#667eea',
                    background_color: '#ffffff',
                    display: 'standalone',
                    scope: '/',
                    start_url: '/',
                    icons: [
                        {
                            src: 'hms-logo.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'hms-logo.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable'
                        }
                    ]
                },
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
                    runtimeCaching: [
                        {
                            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'google-fonts-cache',
                                expiration: {
                                    maxEntries: 10,
                                    maxAgeSeconds: 60 * 60 * 24 * 365
                                }
                            }
                        },
                        {
                            urlPattern: /\/openmrs\/ws\/rest\/.*/i,
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'api-cache',
                                expiration: {
                                    maxEntries: 50,
                                    maxAgeSeconds: 60 * 5
                                },
                                networkTimeoutSeconds: 10
                            }
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
