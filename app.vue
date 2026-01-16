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
    { rel: 'icon', type: 'image/png', href: computed(() => isDark.value ? '/black.png' : '/white.png') }
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
    {
      innerHTML: `!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()`
    }
  ]
})
</script>

<style>
/* Global styles can go here */
</style>
