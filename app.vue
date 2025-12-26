<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <ClientOnly>
      <DraggableCanvas>
        <!-- 
          DESKTOP WIDGETS
          Decomposed profile chunks for a "desktop" feel.
        -->
        
        <!-- 
          DESKTOP WIDGETS
        -->
        
        <!-- Main Profile Card (Center) -->
        <DraggableWidget :x="1290" :y="1300">
          <ProfileCard />
        </DraggableWidget>

        <!-- 
          SCATTERED PHOTOS (Real Content)
        -->
        <!-- 1. The Subtle Art Book -->
        <PolaroidPhoto 
          :x="800" 
          :y="800" 
          :rotation="-8" 
          src="/images/book-cover.png"
          caption="Current Read 📖"
          class="z-10"
        />

        <!-- 2. Spider-Man Game Poster -->
        <PolaroidPhoto 
          :x="2100" 
          :y="900" 
          :rotation="6" 
          src="/images/poster-spiderman.png"
          caption="After Hours 🕷️"
          class="z-10"
        />

        <!-- 3. Travel Photo -->
        <PolaroidPhoto 
          :x="900" 
          :y="2100" 
          :rotation="4" 
          src="/images/photo-mountain.png"
          caption="Winter '24"
          class="z-20"
        />

        <!-- 4. Desk Setup -->
        <PolaroidPhoto 
          :x="2200" 
          :y="2400" 
          :rotation="-5" 
          src="/images/photo-desk.png"
          caption="Workspace"
          class="z-20"
        />

        <!-- 
          FIGMA SHAPES (Geometric Primitives)
        -->
        <!-- Top Left Group -->
        <FigmaShape type="triangle" :x="600" :y="500" :rotation="-15" :scale="1.5" :width="180" :height="180" />
        <FigmaShape type="star" :x="2300" :y="600" :rotation="10" :scale="1.2" :width="120" :height="120" />

        <!-- Top Right Group -->
        <FigmaShape type="circle" :x="1900" :y="700" :rotation="0" :scale="1.4" :width="140" :height="140" />
        
        <!-- Bottom Left Group -->
        <FigmaShape type="rectangle" :x="500" :y="2200" :rotation="0" :scale="1.1" :width="150" :height="150" />

        <!-- Bottom Right Group -->
        <FigmaShape type="polygon" :x="2400" :y="2200" :rotation="-10" :scale="1.3" :width="180" :height="180" />
        
        <!-- Center Decoration -->
        <FigmaShape type="rectangle" :x="1500" :y="500" :rotation="45" :scale="0.9" :width="100" :height="100" />
        
        <!-- 
          ORIGINAL STICKERS 
        -->
        <DraggableSticker icon="✨" :x="500" :y="1500" />
        <DraggableSticker icon="🚀" :x="2500" :y="1500" />
        <DraggableSticker icon="🎨" :x="1500" :y="2500" />
        <DraggableSticker icon="💻" :x="1500" :y="400" />

      </DraggableCanvas>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Olanrewaju Segun - UI/UX Designer',
  bodyAttrs: {
    class: 'overflow-hidden'
  },
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
