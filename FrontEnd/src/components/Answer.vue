<script setup lang="ts">
import "xp.css/dist/XP.css";

const props = defineProps<{
  answer: { answer: string; productivity: number; wellbeing: number; treasury: number; environment: number };
}>();

const emit = defineEmits(['selectedAnswer']);
</script>

<template>
  <div class="window" style="width: 300px">
    <div class="title-bar">
      <div class="title-bar-text">Réponse choisie</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body">
      <p>{{ props.answer.answer }}</p>
      <button @click="emit('selectedAnswer', props.answer)">Répondre</button>
    </div>
  </div>
</template>

<style scoped></style>
