<!-- EducationCard.vue - Education history card -->
<template>
  <div
    class="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-span-2 row-span-2 sm:w-[568px] shadow-lg p-6 h-fit"
    :style="{ '--stagger': stagger }">
    <p class="font-medium">Education</p>

    <ul class="flex flex-col gap-4">
      <li v-for="(item, index) in education" :key="index"
        class="flex flex-row gap-4 inline-flex items-center justify-center">
        <!-- Color Block -->
        <div class="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm flex-none"
          :style="{ backgroundColor: item.color }"></div>

        <div class="w-full flex flex-col gap-4">
          <div class="flex flex-row w-full justify-between gap-8 items-center justify-center">
            <div class="flex flex-col">
              <span class="font-medium">{{ item.institution }}</span>
              <span class="text-sm text-muted-foreground">{{ item.program }}</span>
            </div>

            <div
              class="inline-flex items-center rounded-lg border px-2.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-fit border-secondary bg-secondary/40 hover:bg-secondary/80 shrink-0 tabular text-xs font-normal text-muted-foreground">
              {{ item.period }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface EducationItem {
  institution: string
  program: string
  period: string
  color: string
}

interface Props {
  stagger?: number
}

withDefaults(defineProps<Props>(), {
  stagger: 39
})

const education: EducationItem[] = [
  {
    institution: 'Fed. Univ. of Agriculture',
    program: 'B.Sc. Computer Science',
    period: '2026',
    color: '#00A868'
  },
  {
    institution: 'Google',
    program: 'UX Design Professional',
    period: 'Cert',
    color: '#4285F4'
  },
  {
    institution: 'NVIDIA',
    program: 'AI in Design Specialist',
    period: 'Cert',
    color: '#76B900'
  },
  {
    institution: 'McKinsey & ALX',
    program: 'Forward Leadership',
    period: 'Cert',
    color: '#051C2C'
  }
]
</script>
