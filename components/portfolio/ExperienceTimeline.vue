<template>
    <div class="relative pl-4 space-y-8 my-4">
        <!-- Vertical Line -->
        <div class="absolute left-0 top-2 bottom-2 w-0.5 bg-border/50 rounded-full" />

        <div v-for="(item, index) in experiences" :key="index" class="relative group">
            <!-- Dot -->
            <div class="absolute -left-[1.3rem] top-1.5 h-3 w-3 rounded-full border-2 border-background transition-all duration-300 group-hover:scale-125 group-hover:bg-foreground"
                :class="item.color || 'bg-muted-foreground'" />

            <!-- Content -->
            <div class="flex flex-col gap-1">
                <div class="flex justify-between items-baseline">
                    <h3 class="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                        {{ item.role }}
                    </h3>
                    <span class="text-xs text-muted-foreground tabular-nums">{{ item.period }}</span>
                </div>

                <div class="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{{ item.company }}</span>
                    <span v-if="item.type"
                        class="px-1.5 py-0.5 rounded bg-muted/50 text-[10px] uppercase tracking-wider">{{ item.type
                        }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const experiences = [
    {
        role: 'Web3 Product Designer',
        company: 'Keta Exchange',
        period: 'Nov 2025',
        type: 'Contract',
        color: 'bg-[#1798D5]'
    },
    {
        role: 'Product Design Intern',
        company: 'Grazac',
        period: 'Apr 2025 - Sep 2025',
        color: 'bg-[#00A868]'
    },
    {
        role: 'Lead Freelance Product Designer',
        company: 'Independent',
        period: '2020 – 2024',
        color: 'bg-[#FF530A]'
    }
]
</script>
