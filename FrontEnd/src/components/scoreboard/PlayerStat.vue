<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Focus from "./Focus.vue";

const props = defineProps<{
  players: { username: string; score: number; reason: {reason: string} }[];
}>();

const selectedPlayer = ref();

const handleClick = (player: { username: string; score: number; reason: {reason: string} }) => {
  selectedPlayer.value = player;
};
console.log("coucou")
console.log("stat", props.players)
</script>

<template>
  <ul>
    <li 
      v-for="(player, index) in props.players" 
      :key="index" 
      @click="handleClick(player)"
    >
      {{ player.username }} - {{ player.score }} jours
    </li>
  </ul>

  <Focus v-if="selectedPlayer" :player="selectedPlayer" />
  
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  text-align: left;
}

li {
  list-style: none;
  cursor: pointer;
  padding: 5px;
  text-align: left;
}

</style>
