<template>
  <div class="min-h-screen bg-background text-foreground">
    <Html lang="en">

    <Head>
      <Title>Lanre Segun - Design Engineer | Interactive Portfolio</Title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    </Head>

    </Html>

    <!-- Global Layout elements -->
    <!-- Global Layout elements -->
    <ClientOnly>
      <FloatingDock v-if="isDockVisible" />
    </ClientOnly>

    <!-- Page Content -->
    <NuxtPage v-slot="{ Component, route }">
      <Transition :css="false" mode="out-in" @enter="(el, done) => onEnter(el, done)"
        @leave="(el, done) => onLeave(el, done)">
        <component :is="Component" :key="route.path" />
      </Transition>
    </NuxtPage>

    <div id="theme-toggle-script" />
    <LazyLoginModal ref="loginModal" />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { isDockVisible } = useLayout()

// GSAP Page Transitions
const onEnter = (el: Element, done: () => void) => {
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

const onLeave = (el: Element, done: () => void) => {
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

  const isK = e.key.toLowerCase() === 'k'
  const isL = e.key.toLowerCase() === 'l'
  const modifier = e.ctrlKey || e.metaKey

  // Check for Ctrl/Cmd + K
  if (modifier && isK) {
    e.preventDefault()
    loginModal.value?.open()
  }

  // Check for Ctrl/Cmd + Shift + L
  if (modifier && e.shiftKey && isL) {
    e.preventDefault()
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
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : 'light')
  },
  bodyAttrs: {
    class: 'bg-background'
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Lanre Segun` : 'Lanre Segun - Design Engineer';
  },
  meta: [
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#000000' : '#ffffff')
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: computed(() => isDark.value ? 'black-translucent' : 'default')
    }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: computed(() => isDark.value ? 'https://pqmcl2p95v0ptrae.public.blob.vercel-storage.com/public/black.png' : 'https://pqmcl2p95v0ptrae.public.blob.vercel-storage.com/public/white.png') }
  ],
  script: [
    // Google Tag (gtag.js)
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-HS3KT78WJT',
      async: true
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HS3KT78WJT');
      `,
      type: 'text/javascript'
    },
    // FOUC preventer: apply theme class as early as possible
    {
      innerHTML: `!function(){try{var d=document.documentElement,c=d.classList;var e=localStorage.getItem('theme');if(!e){var cookie=document.cookie.match(/theme=([^;]+)/);if(cookie)e=cookie[1]}if(!e||e==='system'){var m=window.matchMedia('(prefers-color-scheme: dark)');e=m.matches?'dark':'light'}c.remove('light','dark');c.add(e);d.style.colorScheme=e}catch(e){}}()`
    }
  ]
})
</script>

<style>
/* Global styles can go here */
</style>
