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
</script>

<template>
  <ul>
    <li 
      v-for="(player, index) in props.players" 
      :key="index" 
      @click="handleClick(player)"
      class="position"
      :class="[{ 'first' : index === 0}, { 'second' : index === 1}, { 'third' : index === 2}]"
    >
      {{ player.username }} - {{ player.score }} jours
    </li>
  </ul>

  <Focus v-if="selectedPlayer" :player="selectedPlayer" @close="selectedPlayer = false" />
  
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


.position.first {
  font-size: medium;
  font-weight: bold;
  text-decoration: underline;
}
.position.second {
  font-size: medium;
  font-weight: bold;
}
.position.third {
  font-size: medium;
  font-weight: bold;
}

</style>
