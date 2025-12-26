<template>
  <div>
    <Html lang="en">

    <Head>
      <Title>Olanrewaju Segun - Design Engineer | Interactive Portfolio</Title>
    </Head>

    </Html>

    <NuxtLayout>
      <ClientOnly>
        <!-- Custom Cursor -->
        <!-- Cursor removed as per request -->

        <!-- Floating Dock -->
        <FloatingDock />

        <DraggableCanvas>
          <!-- Orchestration Grid - 8x7 layout with 360px cells -->
          <div
            class="absolute orchestration grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <!-- Background fill -->
            <div class="z-[-1] w-[2992px] h-[2240px] pointer-events-none"></div>

            <!-- Profile Card - col 4, row 4, spans 2 columns and 2 rows -->
            <div
              class="select-none flex flex-col gap-2 relative rounded-lg w-[90vw] max-w-[100vw] col-start-4 row-start-4 col-span-2 row-span-2 left-1/2 -translate-x-1/2 bottom-[170px] sm:w-[568px] sm:left-[80px] sm:translate-x-0 sm:bottom-[220px] shadow-lg h-fit"
              style="--stagger: 1">
              <ProfileCard />
            </div>

            <!-- Education Card - col 4, row 7 -->
            <div
              class="select-none flex flex-col gap-2 relative rounded-lg w-[90vw] max-w-[100vw] col-start-4 row-start-7 col-span-2 row-span-2 left-1/2 -translate-x-1/2 sm:w-[568px] sm:left-[80px] sm:translate-x-0 bottom-[480px] shadow-lg h-fit"
              style="--stagger: 39">
              <EducationCard />
            </div>

            <!-- Drawing Canvas - col 3, row 2 -->
            <div
              class="select-none relative col-start-3 row-start-2 w-[360px] h-[360px] right-[320px] top-[200px] rotate-[-2deg]"
              style="--stagger: 9" data-no-drag="true">
              <DrawingCanvas />
            </div>

            <!-- Flip Clock - col 7, row 5 -->
            <FlipClock classes="col-start-7 col-span-2 h-fit row-start-5 w-[360px] flex rotate-[4deg]" :stagger="12" />

            <!-- 3D Books -->
            <!-- Book 1 (Red) -->
            <Book3D cover="/images/image_13.png" color="#EB1C24" :width="165" :height="201"
              classes="col-start-3 row-start-1 rotate-[14deg] top-[180px] left-[240px]" :stagger="17" />

            <!-- Book 2 (Red 2) -->
            <Book3D cover="/images/image_3.png" color="#E32A24" :width="133" :height="201"
              classes="col-start-5 row-start-2 top-[200px] left-[130px] rotate-[75deg]" :stagger="20" />

            <!-- Book 3 (Orange) -->
            <Book3D cover="/images/image_3.jpg" color="#F1855A" :width="135" :height="198"
              classes="col-start-2 row-start-4 rotate-[6deg]" :stagger="21" />

            <!-- Book 4 (Blue) -->
            <Book3D cover="/images/image_7.jpg" color="#2D469B" :width="135" :height="200"
              classes="col-start-4 row-start-2 rotate-[-16deg] top-[10px] left-[320px]" :stagger="22" />

            <!-- Book 5 (Red 3) -->
            <Book3D cover="/images/image_1.jpg" color="#CA2528" :width="130" :height="198"
              classes="col-start-1 row-start-5 rotate-[12deg] left-[140px] top-[200px]" :stagger="23" />

            <!-- Book 6 (Orange 2) -->
            <Book3D cover="/images/image_6.jpg" color="#F03800" :width="145" :height="198"
              classes="col-start-6 row-start-6 rotate-[-14deg] left-[140px] bottom-[80px]" :stagger="24" />

            <!-- Book 7 (Orange 3) -->
            <Book3D cover="/images/image.jpg" color="#ED6626" :width="136" :height="199"
              classes="col-start-7 row-start-4 rotate-[18deg] left-[120px]" :stagger="9" />

            <!-- Book 8 (Yellow) -->
            <Book3D cover="/images/image_4.jpg" color="#FFF20C" :width="128" :height="197"
              classes="col-start-4 row-start-6 rotate-[-12deg] top-[280px]" :stagger="25" />

            <!-- Book 9 (Black) -->
            <Book3D cover="/images/image_8.png" color="#0A0A0A" :width="137" :height="194"
              classes="col-start-6 row-start-7 rotate-[8deg]" :stagger="26" />

            <!-- Book 10 (Gray) -->
            <Book3D cover="/images/image_10.jpg" color="#485556" :width="143" :height="198"
              classes="col-start-3 row-start-6 rotate-[-18deg]" :stagger="27" />

            <!-- Book 11 (Blue 2) -->
            <Book3D cover="/images/image_9.jpg" color="#1983FC" :width="143" :height="201"
              classes="col-start-1 row-start-3 rotate-[10deg] left-[140px]" :stagger="28" />

            <!-- Book 12 (Beige) -->
            <Book3D cover="/images/image_5.png" color="#E1D2BC" :width="143" :height="202"
              classes="col-start-3 row-start-7 rotate-[-6deg]" :stagger="29" />

            <!-- Book 13 (White) -->
            <Book3D cover="/images/image_13.jpg" color="#F2F2F2" :width="160" :height="208"
              classes="col-start-7 row-start-2 rotate-[14deg] left-[380px]" :stagger="30" />

            <!-- Vinyl Records -->
            <VinylRecord cover="/images/image_12.jpg" album="Clube da Esquina" artist="Milton Nascimento"
              musicFile="/audio/clube-da-esquina.mp3" classes="col-start-5 row-start-1 rotate-[8deg] top-[80px]"
              :stagger="31" />

            <VinylRecord cover="/images/image_16.jpg" album="Super Eurobeat Collection" artist="Initial D"
              musicFile="/audio/initial-d.mp3" classes="col-start-2 row-start-1 rotate-[-8deg] top-[200px]"
              :stagger="32" />

            <VinylRecord cover="/images/image_15.jpg" album="Scenery" artist="Ryo Fukui" musicFile="/audio/scenery.mp3"
              classes="col-start-8 row-start-4 rotate-[8deg] left-[100px] bottom-[120px]" :stagger="33" />


            <!-- Loose Stickers (SVGs and Images) -->
            <!-- TypeScript Logo -->
            <svg style="--stagger:40"
              class="select-none border-white border-4 rounded-lg relative row-start-5 col-start-8 top-[140px] left-[140px]"
              xmlns="http://www.w3.org/2000/svg" fill="none" width="100" height="100" viewBox="0 0 512 512">
              <rect class="rounded-lg" fill="#3178c6" height="512" width="512"></rect>
              <path clip-rule="evenodd"
                d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
                fill="#fff" fill-rule="evenodd"></path>
            </svg>

            <img draggable="false" alt="Profile example" width="92" height="80"
              class="pointer-events-none select-none relative col-start-4 row-start-5 right-[200px] top-[200px]"
              style="--stagger:8" src="/images/image_4.png">

            <img draggable="false" alt="Profile example" width="321" height="86"
              class="rotate-[10deg] pointer-events-none select-none relative col-start-8 row-start-6 right-[240px]"
              style="--stagger:14" src="/images/image_2.png">

            <img draggable="false" alt="Profile example" width="160" height="142"
              class="select-none pointer-events-none relative col-start-7 row-start-6 top-[200px] right-[160px]"
              style="--stagger:16" src="/images/image_6.png">

            <img draggable="false" alt="Profile example" width="98" height="160"
              class="select-none pointer-events-none relative col-start-3 row-start-6 bottom-[140px] right-[240px] rotate-[36deg]"
              style="--stagger:11" src="/images/image_1.png">

            <svg style="--stagger:15"
              class="select-none relative left-[140px] col-start-7 row-start-7 top-[200px] border-4 border-white rounded-lg"
              width="127" height="57" viewBox="0 0 138 57" aria-label="MDX" role="img">
              <rect height="55.5" rx="4.5" width="136.5" x=".75" y=".75"></rect>
              <g fill="none" stroke="#fff" stroke-width="6">
                <path d="M16.5 44V19L30.25 32.75l14-14v25"></path>
                <path d="M70.5 40V10.75"></path>
                <path d="M57 27.25L70.5 40.75l13.5-13.5"></path>
                <path d="M122.5 41.24L93.25 12M93.5 41.25L122.75 12"></path>
              </g>
            </svg>

            <!-- Next.js Logo Box -->
            <div style="--stagger:13"
              class="select-none relative col-start-4 row-start-3 w-[300px] h-[300px] shadow-2xl rounded-2xl overflow-hidden right-[120px] bottom-[260px] rotate-[4deg] ">
              <div class="relative group">
                <div
                  class="relative w-full h-full overflow-hidden rounded-2xl shadow-lg select-none cursor-none bg-black">
                  <img alt="Logo variation 1" draggable="false" width="1024" height="1024"
                    class="w-full h-full object-contain transition-all select-none duration-150 ease-out"
                    src="/images/image_12.png">
                </div>
              </div>
            </div>

            <!-- Polaroid Photos (Draggable Cards) -->
            <DraggableWidget
              class="relative max-w-[100vw] col-start-3 row-start-4 w-fit h-fit col-span-1 bottom-[160px] left-[100px]"
              style="--stagger: 3">
              <div class="rotate-[14deg] transition-transform hover:scale-105 duration-300">
                <PolaroidPhoto src="/images/image_21.jpg" alt="Profile example" />
              </div>
            </DraggableWidget>

            <DraggableWidget
              class="relative max-w-[100vw] col-start-3 row-start-5 w-fit h-fit col-span-1 bottom-[160px] left-[240px]"
              style="--stagger: 4">
              <div class="rotate-[-12deg] transition-transform hover:scale-105 duration-300">
                <PolaroidPhoto src="/images/image_2.jpg" alt="Profile example" />
              </div>
            </DraggableWidget>

            <DraggableWidget
              class="relative max-w-[100vw] col-start-6 row-start-4 w-fit h-fit col-span-1 bottom-[180px] left-[80px]"
              style="--stagger: 5">
              <div class="rotate-[2deg] transition-transform hover:scale-105 duration-300">
                <PolaroidPhoto src="/images/image_14.png" alt="Profile example" />
              </div>
            </DraggableWidget>

            <DraggableWidget
              class="relative max-w-[100vw] col-start-6 row-start-5 w-fit h-fit col-span-1 bottom-[200px] right-[70px]"
              style="--stagger: 6">
              <div class="rotate-[8deg] transition-transform hover:scale-105 duration-300">
                <PolaroidPhoto src="/images/image_11.jpg" alt="Profile example" />
              </div>
            </DraggableWidget>

          </div>
        </DraggableCanvas>
      </ClientOnly>
    </NuxtLayout>
    <div id="theme-toggle-script"></div>
    <!-- Add script to body via pure JS if needed, but useHead is better -->
  </div>
</template>

<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: 'overflow-hidden bg-background'
  },
  script: [
    {
      innerHTML: `!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()`
    }
  ]
})

// Widget Imports
import Book3D from '~/components/widgets/Book3D.vue'
import VinylRecord from '~/components/widgets/VinylRecord.vue'
import FlipClock from '~/components/widgets/FlipClock.vue'
import DraggableCanvas from '~/components/widgets/DraggableCanvas.vue'
import DraggableWidget from '~/components/widgets/DraggableWidget.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import EducationCard from '~/components/EducationCard.vue'
import PolaroidPhoto from '~/components/PolaroidPhoto.vue'
import DrawingCanvas from '~/components/widgets/DrawingCanvas.vue'
import FloatingDock from '~/components/FloatingDock.vue'





</script>

<style>
/* Animation for staggered elements */
[style*="--stagger"] {
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--stagger) * 0.05s);
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
