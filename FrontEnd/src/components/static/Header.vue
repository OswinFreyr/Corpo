<script setup lang="ts">
import "xp.css/dist/XP.css";

</script>

<template>
    <header class="title-bar">
    <div class="title-bar-text">Corpo.exe</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Restore"></button>
      <button aria-label="Close"></button>
    </div>
  </header>
</template>

<style scoped>
    header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    }
</style>