<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Focus from "./Focus.vue";

const props = defineProps<{
  players: { pseudo: string; days: number; reason: string }[];
}>();

const selectedPlayer = ref(null);

const handleClick = (player: { pseudo: string; days: number; reason: string }) => {
  selectedPlayer.value = player;
};
</script>

<template>
  <ul>
    <li 
      v-for="(player, index) in props.players" 
      :key="index" 
      @click="handleClick(player)"
    >
      {{ player.pseudo }} - {{ player.days }} jours
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
