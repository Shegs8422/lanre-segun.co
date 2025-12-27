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
    <NuxtPage />

    <div id="theme-toggle-script"></div>
  </div>
</template>

<script setup lang="ts">
import FloatingDock from '~/components/FloatingDock.vue'

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
/* Global transitions / animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
