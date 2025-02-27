<script setup lang="ts">
import "xp.css/dist/XP.css";

const props = defineProps<{
  answer: { answer: string; productivity: number; wellbeing: number; treasury: number; environment: number };
}>();

const emit = defineEmits(['selectedAnswer']);
</script>

<template>
  <div class="window" style="width: 400px">
    <div class="title-bar">
      <div class="title-bar-text">Réponse choisie</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body">
      <p class="answer-text">{{ props.answer.answer }}</p>
      <button @click="emit('selectedAnswer', props.answer)">Répondre</button>
    </div>
  </div>
</template>

<style scoped>
  .window-body{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .answer-text{
    font-size: small;
  }
</style>
