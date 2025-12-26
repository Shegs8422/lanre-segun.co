<template>
  <header class="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center text-white">
    <div class="logo font-sans font-bold text-2xl tracking-tighter">
      <a href="#" class="magnetic-link">ls.</a>
    </div>
    
    <nav class="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest">
      <a href="#projects" class="magnetic-link hover:text-gray-400 transition-colors">Work</a>
      <a href="#about" class="magnetic-link hover:text-gray-400 transition-colors">About</a>
      <a href="#contact" class="magnetic-link hover:text-gray-400 transition-colors">Contact</a>
    </nav>

    <div class="md:hidden">
      <button class="uppercase font-mono text-sm magnetic-link">Menu</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

onMounted(() => {
  // Magnetic effect for nav links
  const links = document.querySelectorAll('.magnetic-link')
  
  links.forEach(link => {
    const element = link as HTMLElement
    
    let xTo = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' })
    let yTo = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' })

    element.addEventListener('mouseenter', (e) => {
      gsap.to(element, { scale: 1.1, duration: 0.3 })
    })

    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      
      xTo(relX * 0.3)
      yTo(relY * 0.3)
    })

    element.addEventListener('mouseleave', () => {
      xTo(0)
      yTo(0)
      gsap.to(element, { scale: 1, duration: 0.3 })
    })
  })
})
</script>

<style scoped>
.magnetic-link {
  display: inline-block;
  will-change: transform;
}
</style>
