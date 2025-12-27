<template>
  <div class="min-h-screen bg-background text-foreground">
    <Html lang="en">

    <Head>
      <Title>Olanrewaju Segun - Design Engineer | Interactive Portfolio</Title>
    </Head>

    </Html>

    <!-- Global Layout elements -->
    <ClientOnly>
      <FloatingDock />
    </ClientOnly>

    <!-- Page Content -->
    <NuxtPage v-slot="{ Component, route }">
      <Transition :css="false" mode="out-in" @enter="(el, done) => onEnter(el, done, route.path)"
        @leave="(el, done) => onLeave(el, done, route.path)">
        <component :is="Component" :key="route.path" />
      </Transition>
    </NuxtPage>

    <div id="theme-toggle-script"></div>
  </div>
</template>

<script setup lang="ts">
import FloatingDock from '~/components/FloatingDock.vue'
import gsap from 'gsap'

// GSAP Page Transitions
const onEnter = (el: Element, done: () => void, path: string) => {
  const isHome = path === '/'

  gsap.fromTo(el,
    {
      x: isHome ? '-100%' : '100%',
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: done
    }
  )
}

const onLeave = (el: Element, done: () => void, path: string) => {
  const isHome = path === '/'

  gsap.to(el, {
    x: isHome ? '100%' : '-100%', // Exit in opposite direction of entry for flow
    opacity: 0,
    duration: 0.3,
    ease: 'power3.in',
    onComplete: done
  })
}

// Global Head / Theme Setup
useHead({
  bodyAttrs: {
    class: 'bg-background'
  },
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
