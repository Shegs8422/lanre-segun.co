<template>
  <div 
    ref="shapeRef"
    class="figma-shape absolute cursor-grab active:cursor-grabbing will-change-transform z-20 group"
    :style="{ 
      left: `${x}px`, 
      top: `${y}px`,
      transform: `rotate(${rotation}deg) scale(${scale})`
    }"
  >
    <!-- SVG Renderer: High Fidelity Figma UI Elements -->
    <svg 
      :width="width" 
      :height="height" 
      viewBox="0 0 200 200" 
      preserveAspectRatio="xMidYMid meet"
      class="transition-transform duration-300 group-hover:scale-105 pointer-events-none"
      style="overflow: visible;"
    >
      <defs>
        <!-- Figma Brand Gradients -->
        <linearGradient id="grad-magic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff00cc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3333ff;stop-opacity:1" />
        </linearGradient>
        <filter id="dropshadow-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
        </filter>
      </defs>

      <!-- 
        TYPE: FRAME (Selection State) 
        A "selected" layer look with blue border and corner handles
      -->
      <g v-if="type === 'frame'">
        <!-- The Content Background -->
        <rect x="20" y="20" width="160" height="160" rx="4" fill="white" stroke="#E5E7EB" stroke-width="1" filter="url(#dropshadow-lg)" />
        <!-- Mock Content -->
        <rect x="40" y="50" width="80" height="12" rx="2" fill="#E5E7EB" />
        <rect x="40" y="70" width="120" height="8" rx="2" fill="#F3F4F6" />
        <rect x="40" y="85" width="100" height="8" rx="2" fill="#F3F4F6" />
        <circle cx="150" cy="150" r="20" fill="#FFEBF7" />
        
        <!-- Selection Border (The "Figma" part) -->
        <rect x="20" y="20" width="160" height="160" rx="4" fill="none" stroke="#1ABCFE" stroke-width="2" />
        <!-- Corner Handles -->
        <rect x="16" y="16" width="8" height="8" fill="white" stroke="#1ABCFE" stroke-width="2" />
        <rect x="176" y="16" width="8" height="8" fill="white" stroke="#1ABCFE" stroke-width="2" />
        <rect x="16" y="176" width="8" height="8" fill="white" stroke="#1ABCFE" stroke-width="2" />
        <rect x="176" y="176" width="8" height="8" fill="white" stroke="#1ABCFE" stroke-width="2" />
        <!-- Label Tag -->
        <g transform="translate(20, 10)">
          <text x="0" y="0" font-family="Inter, sans-serif" font-size="10" fill="#1ABCFE" font-weight="600">Frame 1</text>
        </g>
      </g>

      <!-- 
        TYPE: VECTOR-PATH (Pen Tool) 
        A bezier curve with nodes and handles
      -->
      <g v-else-if="type === 'vector-path'">
        <!-- The Path -->
        <path d="M20,180 C80,20 120,20 180,180" fill="none" stroke="#0ACF83" stroke-width="3" stroke-linecap="round" />
        <!-- Nodes -->
        <rect x="17" y="177" width="6" height="6" fill="white" stroke="#0ACF83" stroke-width="2" />
        <rect x="177" y="177" width="6" height="6" fill="white" stroke="#0ACF83" stroke-width="2" />
        <!-- Bezier Handles (Lines + Circles) -->
        <line x1="20" y1="180" x2="80" y2="20" stroke="#0ACF83" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="80" cy="20" r="3" fill="white" stroke="#0ACF83" stroke-width="2" />
        
        <line x1="180" y1="180" x2="120" y2="20" stroke="#0ACF83" stroke-width="1" stroke-dasharray="2,2" />
        <circle cx="120" cy="20" r="3" fill="white" stroke="#0ACF83" stroke-width="2" />
      </g>

      <!-- 
        TYPE: COMPONENT (Master)
        The 4-diamond symbol
      -->
      <g v-else-if="type === 'component'">
        <!-- Main Diamond Container (rotated square) -->
        <g transform="translate(100, 100)">
           <!-- Top -->
           <path d="M0,-30 L20,-10 L0,10 L-20,-10 Z" fill="none" stroke="#A259FF" stroke-width="2" />
           <path d="M0,30 L20,10 L0,-10 L-20,10 Z" fill="none" stroke="#A259FF" stroke-width="2" /> <!-- Bottom -->
           <path d="M-30,0 L-10,-20 L10,0 L-10,20 Z" fill="none" stroke="#A259FF" stroke-width="2" /> <!-- Left -->
           <path d="M30,0 L10,-20 L-10,0 L10,20 Z" fill="none" stroke="#A259FF" stroke-width="2" /> <!-- Right -->
           <!-- Actual Filled Diamonds for High Fidelity -->
           <path d="M0,-45 L15,-30 L0,-15 L-15,-30 Z" fill="#A259FF" />
           <path d="M0,15 L15,30 L0,45 L-15,30 Z" fill="#A259FF" />
           <path d="M-30,-15 L-15,0 L-30,15 L-45,0 Z" fill="#A259FF" />
           <path d="M30,-15 L45,0 L30,15 L15,0 Z" fill="#A259FF" />
        </g>
        <!-- Selection Dash -->
        <rect x="40" y="40" width="120" height="120" fill="none" stroke="#A259FF" stroke-width="1" stroke-dasharray="4,4" />
      </g>

      <!-- 
        TYPE: CURSOR (Presence)
      -->
      <g v-else-if="type === 'cursor'">
        <!-- Cursor Arrow -->
        <path d="M20,20 L80,45 L50,55 L40,85 Z" fill="#FF7262" stroke="white" stroke-width="2" filter="url(#dropshadow-lg)" />
        <!-- Name Tag -->
        <rect x="45" y="60" width="80" height="24" rx="4" fill="#FF7262" />
        <text x="55" y="76" font-family="Inter, sans-serif" font-size="12" fill="white" font-weight="600">{{ label || 'Guest' }}</text>
      </g>
      
      <!-- 
        TYPE: COMMENT
      -->
      <g v-else-if="type === 'comment'">
         <path d="M100,165 C55.817,165 20,135.899 20,100 C20,64.101 55.817,35 100,35 C144.183,35 180,64.101 180,100 C180,135.899 144.183,165 100,165 Z" fill="white" filter="url(#dropshadow-lg)" />
         <path d="M100,165 L100,195 L130,160" fill="white" filter="url(#dropshadow-lg)" />
         <!-- Clean patch for arrow join so shadow doesn't overlap ugly -->
         <path d="M100,160 L100,195 L130,160 Z" fill="white" />
         <!-- Avatar inside -->
         <circle cx="100" cy="100" r="25" fill="#1ABCFE" />
         <text x="100" y="105" text-anchor="middle" fill="white" font-family="Inter" font-weight="bold" font-size="20">L</text>
         <!-- Notification Dot -->
         <circle cx="170" cy="40" r="12" fill="#F24E1E" stroke="white" stroke-width="2" />
      </g>

    </svg>
  </div>
</template>

<script setup lang="ts">
import { set } from '@vueuse/core'

const props = defineProps<{
  type?: 'frame' | 'vector-path' | 'component' | 'cursor' | 'comment'
  x: number
  y: number
  rotation?: number
  scale?: number
  width?: number
  height?: number
  label?: string
}>()

const shapeRef = ref<HTMLElement | null>(null)

// Initialize Draggable
onMounted(async () => {
  if (!process.client || !shapeRef.value) return
  const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp()

  Draggable.create(shapeRef.value, {
    type: 'x,y',
    inertia: true,
    edgeResistance: 0.65,
    onPress: function() {
      // Bring to front
      gsap.set(this.target, { zIndex: 100 })
      gsap.to(this.target, { scale: (props.scale || 1) * 1.05, duration: 0.2 })
    },
    onRelease: function() {
      // Stay put, just subtle bounce on grab release
      gsap.to(this.target, { scale: props.scale || 1, duration: 0.3, ease: "back.out(1.5)" })
    }
  })
})
</script>
