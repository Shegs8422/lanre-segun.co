<template>
  <div class="profile-card w-[480px] bg-white dark:bg-[#18181b] rounded-3xl p-8 shadow-xl border border-black/5 dark:border-white/10 relative">
    
    <!-- Cursor Decoration (Absolute) -->
    <div class="absolute top-12 -right-4 z-50 pointer-events-none anim-float">
      <div class="relative">
        <svg class="w-6 h-6 text-[#0099FF] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" style="transform: rotate(-15deg);">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
        <div class="absolute left-4 top-4 bg-[#0099FF] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
          Lanre
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div class="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-gray-50 dark:ring-zinc-800">
           <img src="/images/profile-avatar.png" alt="Lanre" class="w-full h-full object-cover bg-gray-200" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{{ name }}</h1>
          <p class="text-sm text-gray-500 font-medium">{{ title }}</p>
        </div>
      </div>

      <!-- Brand/Theme Icon (Mimicking the logo in screenshot) -->
      <button 
        class="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform"
        @click="toggleTheme"
      >
        <component :is="isDark ? Sun : Moon" class="w-5 h-5" />
      </button>
    </div>

    <!-- Bio -->
    <div class="mb-8 space-y-4">
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
        Welcome to <em class="font-serif italic text-gray-800 dark:text-gray-100">my space on the internet</em>. I'm a {{ tagline }} who creates interactions that spark joy, delight, and a sense of magic in users.
      </p>
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
        {{ bio }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 text-[15px] mt-4 font-medium">
        Have fun exploring my portfolio, and feel free to connect below.
      </p>
    </div>

    <!-- Socials Buttons -->
    <div class="flex flex-wrap gap-3 mb-10">
      <a 
        v-for="(link, index) in socialLinks" 
        :key="index"
        :href="link.url"
        class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors"
      >
        <component :is="link.icon" class="w-4 h-4" />
        {{ link.label }}
      </a>
    </div>

    <!-- Divider -->
    <div class="h-px w-full bg-gray-100 dark:bg-zinc-800 mb-8 border-t border-dashed border-gray-200 dark:border-zinc-700"></div>

    <!-- Experience List -->
    <div class="space-y-6">
      <div 
        v-for="(job, index) in workExperience" 
        :key="index"
        class="flex items-center gap-4 group"
      >
        <!-- Square Logo Color Block -->
        <div 
          class="w-12 h-12 rounded-lg flex-shrink-0 shadow-sm"
          :style="{ backgroundColor: job.color }"
        ></div>
        
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-baseline mb-0.5">
            <h3 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ job.company }}</h3>
            <!-- Date Badge -->
            <span class="text-xs font-medium text-gray-500 bg-gray-50 dark:bg-zinc-800/50 px-2 py-1 rounded border border-gray-100 dark:border-zinc-700/50">{{ job.period }}</span>
          </div>
          <p class="text-sm text-gray-500">{{ job.role }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Twitter, Linkedin, Github, Mail, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const name = 'Olanrewaju Segun'
const title = 'Design Engineer'
const tagline = 'design engineer'
const bio = 'Growing up, I spent hours playing Street Fighter, Donkey Kong, and Super Mario in a Super Nintendo with my dad, and somewhere between levels, I developed high expectations for how interactions should feel.'

const socialLinks = [
  { label: 'Twitter', url: '#', icon: Twitter },
  { label: 'LinkedIn', url: '#', icon: Linkedin },
  { label: 'GitHub', url: '#', icon: Github },
  { label: 'Mail', url: '#', icon: Mail },
]

const workExperience = [
  { company: 'Praia Health', role: 'Staff Product Designer', period: '2024 – Present', color: '#1da1f2' }, // Blue
  { company: 'Stone', role: 'Specialist Product Designer', period: '2022 – 2024', color: '#00C853' }, // Green
  { company: 'Pagar.me', role: 'Senior Product Designer', period: '2019 – 2022', color: '#76B900' }, // Lime/Green
  { company: 'Try', role: 'UX Designer & Researcher', period: '2018 – 2019', color: '#FF4500' }, // Orange
  { company: 'National Council of Science', role: 'UX Designer', period: '2018', color: '#3b5998' }, // Indigo
]
</script>

<style scoped>
.anim-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>