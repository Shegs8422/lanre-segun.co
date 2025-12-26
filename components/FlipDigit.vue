<!-- FlipDigit.vue - Single flip digit for clock -->
<template>
  <div class="relative w-[96px] h-[96px] rounded-lg">
    <!-- Top half (current) -->
    <div class="clip-path-top-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center">
      {{ value }}
    </div>
    <!-- Bottom half (current) -->
    <div class="clip-path-bottom-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center">
      {{ value }}
    </div>
    
    <!-- Flip animation layers -->
    <div class="absolute top-0 flip-container w-full h-1/2 items-start z-10 rounded-lg">
      <div 
        v-if="isFlipping"
        class="clip-path-top-digit absolute z-10 bg-component w-full rounded-lg font-mono text-6xl text-center animate-flip-top"
      >
        {{ previousValue }}
      </div>
      <div 
        v-if="isFlipping" 
        class="clip-path-bottom-digit absolute z-20 bg-component w-full rounded-lg font-mono text-6xl text-center animate-flip-bottom"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string
}

const props = defineProps<Props>()

const previousValue = ref(props.value)
const isFlipping = ref(false)

watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    previousValue.value = oldVal
    isFlipping.value = true
    setTimeout(() => {
      isFlipping.value = false
    }, 600)
  }
})
</script>

<style scoped>
.clip-path-top-digit {
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  display: flex;
  align-items: flex-start;
  padding-top: 0.5rem;
}

.clip-path-bottom-digit {
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.5rem;
}

@keyframes flip-top {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(-90deg);
  }
}

@keyframes flip-bottom {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}

.animate-flip-top {
  animation: flip-top 0.3s ease-in forwards;
}

.animate-flip-bottom {
  animation: flip-bottom 0.3s 0.3s ease-out forwards;
}
</style>
