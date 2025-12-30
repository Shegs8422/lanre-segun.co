<template>
  <div class="min-h-screen bg-background text-foreground overflow-y-auto">
    <Html lang="en">

    <Head>
      <Title>Lanre Segun - Design Engineer | Interactive Portfolio</Title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    </Head>

    </Html>

    <!-- Global Layout elements -->
    <LazyFloatingDock v-if="isDockVisible" />

    <!-- Page Content -->
    <NuxtPage v-slot="{ Component, route }">
      <Transition :css="false" mode="out-in" @enter="(el, done) => onEnter(el, done, route.path)"
        @leave="(el, done) => onLeave(el, done, route.path)">
        <component :is="Component" :key="route.path" />
      </Transition>
    </NuxtPage>

    <div id="theme-toggle-script"></div>
    <LazyLoginModal ref="loginModal" />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { isDockVisible } = useLayout()

// GSAP Page Transitions
const onEnter = (el: Element, done: () => void, path: string) => {
  gsap.fromTo(el,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: done
    }
  )
}

const onLeave = (el: Element, done: () => void, path: string) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power3.in',
    onComplete: done
  })
}

// Global Head / Theme Setup
// Global Head / Theme Setup
const { isDark } = useTheme()

// Login Modal Logic
const loginModal = ref<any>(null)

const handleKeydown = (e: KeyboardEvent) => {
  // Ignore if user is typing in an input/textarea
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

  // Check for Ctrl+Shift+L (Windows/Linux) or Cmd+Shift+L (Mac)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
    e.preventDefault() // Prevent any default browser behavior
    loginModal.value?.open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

useHead({
  bodyAttrs: {
    class: 'bg-background'
  },
  link: [
    { rel: 'icon', type: 'image/png', href: computed(() => isDark.value ? '/black.png' : '/white.png') }
  ],
  script: [
    {
      innerHTML: `!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()`
    }
  ]
})
</script>

<style>
/* Global styles can go here */
</style>
