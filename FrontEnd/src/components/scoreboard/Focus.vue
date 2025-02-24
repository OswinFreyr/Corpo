<script setup lang="ts">
import "xp.css/dist/XP.css";

     const props = defineProps<{
        player: { pseudo: string; days: number ; reason:string};
    }>();
</script>

<template>

  <div class="window" style="width: 300px">

    <div class="title-bar">
      <div class="title-bar-text">{{ player.pseudo }}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body">

      <p>A tenu {{ player.days }} jours</p>
      <p>{{ player.reason }}</p>
      <button>OK</button>

    </div>
  </div>

</template>

<style scoped>

</style>