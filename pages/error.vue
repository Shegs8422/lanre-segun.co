<template>
    <div class="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div class="max-w-2xl w-full text-center flex flex-col items-center gap-8">
            <!-- Animated 404 -->
            <div class="relative">
                <h1
                    class="text-[200px] font-display font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-blue-500 to-purple-600 leading-none">
                    404
                </h1>
                <div class="absolute inset-0 blur-3xl opacity-20 bg-linear-to-br from-blue-500 to-purple-600" />
            </div>

            <!-- Message -->
            <div class="flex flex-col gap-4">
                <h2 class="text-3xl md:text-4xl font-display font-bold tracking-tight">
                    Page Not Found
                </h2>
                <p class="text-lg text-muted-foreground max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved to a different location.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-4 justify-center">
                <NuxtLink to="/"
                    class="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
                    Go Home
                </NuxtLink>
                <NuxtLink to="/projects"
                    class="px-8 py-3 rounded-full border-2 border-border hover:bg-muted text-foreground font-bold transition-all hover:scale-105 active:scale-95">
                    View Projects
                </NuxtLink>
            </div>

            <!-- Decorative Element -->
            <div class="mt-12 opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                    class="animate-float">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: '404 - Page Not Found | Lanre Segun',
    description: 'The page you are looking for could not be found.',
    robots: 'noindex, nofollow'
})
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>
