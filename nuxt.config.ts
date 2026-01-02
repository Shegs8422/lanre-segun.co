import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-12-26',
    devtools: { enabled: true },
    components: true,
    modules: [
        '@tresjs/nuxt',
        '@nuxtjs/supabase'
    ],
    supabase: {
        redirect: false
    },
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'author', content: 'Lanre Segun' },
                { name: 'description', content: 'C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.' },
                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Lanre Segun - Senior Product Designer Portfolio' },
                { property: 'og:description', content: 'Interactive portfolio of Lanre Segun, exploring the intersection of design and engineering.' },
                { property: 'og:image', content: '/og-image.png' },
                { property: 'og:url', content: 'https://lanre-segun.vercel.app' },
                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Lanre Segun - Senior Product Designer' },
                { name: 'twitter:description', content: 'Strategic Product Designer bridging complex engineering and premium UI.' },
                { name: 'twitter:image', content: '/og-image.png' },
                { name: 'twitter:creator', content: '@Olusegun51' },
            ],
            link: [
                { rel: 'canonical', href: 'https://lanre-segun.vercel.app' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Kalam:wght@400;700&display=swap'
                }
            ]
        }
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
        css: {
            devSourcemap: true,
        },
    },
    build: {
        transpile: ['gsap', 'three', '@vueuse/sound']
    },
    runtimeConfig: {
        geminiApiKey: ''
    },
    routeRules: {
        '/**': {
            headers: {
                'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; connect-src 'self' https:;",
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
            }
        }
    }
})
