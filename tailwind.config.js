/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#175680',
                    amber: '#E07B39', /* */
                    sage: '#619d2d',
                    deepblue: '#0a2e67',
                    white: '#F8F6F2',
                    surface: '#FFFFFF',
                    dark: '#1C1C1E',
                    muted: '#6B7280',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Cormorant Garamond"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
        },
    },
    safelist: [
        'bg-brand-sage', 'text-brand-sage',
        'bg-brand-navy', 'text-brand-navy',
        'bg-brand-amber', 'text-brand-amber',
        'bg-brand-deepblue', 'text-brand-deepblue',
    ],
    plugins: [],
}
