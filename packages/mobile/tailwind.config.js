/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#0066cc',
                secondary: '#00a86b',
                background: '#f8f9fa',
                surface: '#ffffff',
                text: '#212529',
                muted: '#868e96',
                border: '#dee2e6',
            }
        },
    },
    plugins: [],
}
