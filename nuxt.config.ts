import tailwindcss from "@tailwindcss/vite";

// Force restart

export default defineNuxtConfig({
    compatibilityDate: '2025-12-26',
    devtools: { enabled: true },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    modules: [
        '@tresjs/nuxt',
        '@nuxtjs/supabase',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        'nuxt-schema-org',
        '@nuxtjs/google-fonts'
    ],
    googleFonts: {
        families: {
            'Google+Sans': [400, 500, 700],
            'Google+Sans+Display': [400, 500, 700],
            Inter: [400, 500, 600, 700, 900],
            Outfit: [400, 500, 600, 700, 800, 900],
            'DM+Mono': [400, 500],
            Kalam: [400, 700]
        },
        display: 'swap',
        prefetch: true,
        preconnect: true,
        preload: true,
        download: false, // Set to true if you want to host fonts locally via the module
    },
    site: {
        url: 'https://lanre-segun-co.vercel.app',
        name: 'Lanre Segun - Design Engineer'
    },
    image: {
        provider: 'vercel',
        domains: ['res.cloudinary.com', 'images.unsplash.com', 'source.unsplash.com', 'loremflickr.com', 'lanre-segun.vercel.app', '*.public.blob.vercel-storage.com'],
        format: ['webp', 'avif'],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            '2xl': 1536
        }
    },
    supabase: {
        redirect: false,
        serviceKey: process.env.SUPABASE_SECRET_KEY,
        types: false
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
                { name: 'description', content: 'Design Engineer specializing in Web3, Fintech, and SaaS. Bridging design and engineering with HCD, accessibility, and premium UI.' },
                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Lanre Segun - Design Engineer Portfolio' },
                { property: 'og:description', content: 'Interactive portfolio of Lanre Segun, exploring the intersection of design and engineering.' },
                { property: 'og:image', content: '/og-image.png' },
                { property: 'og:url', content: 'https://lanre-segun.vercel.app' },
                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Lanre Segun - Design Engineer' },
                { name: 'twitter:description', content: 'Design Engineer bridging complex engineering and premium UI with full-stack development skills.' },
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
            tailwindcss() as any,
        ],
        css: {
            devSourcemap: true,
        },
        build: {
            modulePreload: {
                polyfill: false
            },
            rollupOptions: {
                external: ['shiki'], // Some libraries cause noise
                onwarn(warning, warn) {
                    // Suppress known noisy warnings
                    if (warning.plugin === '@tailwindcss/vite:generate:build') return;
                    if (warning.message?.includes('Sourcemap is likely to be incorrect')) return;
                    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
                    if (warning.message?.includes('never used in')) return;
                    warn(warning);
                }
            }
        },
        optimizeDeps: {
            exclude: ['@supabase/functions-js', '@supabase/postgrest-js']
        }
    },
    build: {
        transpile: ['gsap', 'three', '@vueuse/sound', 'lucide-vue-next']
    },
    runtimeConfig: {
        supabase: {
            serviceKey: process.env.SUPABASE_SECRET_KEY || ''
        },
        geminiApiKey: process.env.NUXT_GEMINI_API_KEY || '',
        supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || ''
    },
    nitro: {
        rollupConfig: {
            onwarn(warning, warn) {
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT' || warning.code === 'CIRCULAR_DEPENDENCY') return;
                if (warning.message?.includes('never used in')) return;
                warn(warning);
            }
        }
    },
    routeRules: {
        '/**': {
            headers: {
                'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com; worker-src 'self' blob:; child-src 'self' blob: https://*.figma.com https://www.youtube.com https://youtube.com; frame-src 'self' https://*.figma.com https://www.youtube.com https://youtube.com blob: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com;",
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
            }
        }
    }
})
