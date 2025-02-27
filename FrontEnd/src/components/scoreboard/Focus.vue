<script setup lang="ts">
import "xp.css/dist/XP.css";
import { defineEmits } from 'vue';

const props = defineProps<{
    player: { username: string; score: number; reason: { reason: string } };
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div class="window" style="width: 300px">
    <div class="title-bar">
      <div class="title-bar-text">{{ player.username }}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close" @click="emit('close')"></button>
      </div>
    </div>

    <div class="window-body">
      <p>A tenu {{ player.score }} jours</p>
      <p>{{ player.reason.reason }}</p>
      <button @click="emit('close')">OK</button>
    </div>
  </div>
</template>

<style scoped>
  .window {
    max-width: fit-content;
  }
</style>