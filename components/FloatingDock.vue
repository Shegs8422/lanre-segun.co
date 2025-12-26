<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div 
      class="floating-dock glass-heavy flex items-center gap-1 px-4 py-2.5 rounded-full border border-border-subtle shadow-floating transition-theme hover:scale-[1.02] transition-transform duration-300"
    >
      <!-- Home button with label -->
      <button 
        class="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-surface-hover transition-colors"
        :class="{ 'bg-surface text-text-primary': true }" 
      >
        <Home class="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
        <span class="text-sm font-medium text-text-secondary group-hover:text-text-primary">Home</span>
      </button>

      <!-- Divider -->
      <div class="w-px h-5 bg-border-strong mx-1" />

      <!-- Icon buttons -->
      <button 
        v-for="(item, index) in dockItems" 
        :key="index"
        class="relative group w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-hover transition-all"
        :title="item.label"
        @click="item.action"
      >
        <component 
          :is="item.icon" 
          class="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors scale-100 group-hover:scale-110 duration-200" 
        />
        
        <!-- Tooltip -->
        <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text-primary text-bg-canvas text-[10px] uppercase tracking-wider font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Home, 
  Link2, 
  FileText, 
  Figma, 
  Camera,
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const isMuted = ref(false)

const toggleSound = () => {
  isMuted.value = !isMuted.value
}

const dockItems = computed(() => [
  { icon: Link2, label: 'Links', action: () => {} },
  { icon: FileText, label: 'Resume', action: () => {} },
  { icon: Figma, label: 'Figma', action: () => {} },
  { icon: Camera, label: 'Photos', action: () => {} },
  { icon: isDark.value ? Moon : Sun, label: 'Theme', action: toggleTheme },
  { icon: isMuted.value ? VolumeX : Volume2, label: 'Sound', action: toggleSound },
])
</script>
