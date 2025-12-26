<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <div class="fixed inset-0 z-[-1] pointer-events-none">
    <TresCanvas clear-color="#050505" window-size>
      <TresPerspectiveCamera :position="[0, 0, 5]" />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="#333" wireframe />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>
