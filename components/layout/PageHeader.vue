<template>
    <header class="w-full flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div class="flex flex-col gap-1">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm md:text-base text-muted-foreground max-w-xl">{{ subtitle }}</p>
        </div>
        <NuxtLink to="/"
            class="group flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-border transition-all active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                class="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span class="text-xs font-bold uppercase tracking-widest hidden sm:inline">Home</span>
        </NuxtLink>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
}>()
</script>
