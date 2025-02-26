<script setup lang="ts">
    import "xp.css/dist/XP.css";    
    import PlayerStat from "./PlayerStat.vue"
    import askUsers from "../../api/askUsers.js"
    import { onMounted, ref } from "vue";

    let players = ref<{username:string, score: number, reason: {reason:string}}[]>([]);

    onMounted(async () => {
        players.value = await askUsers();
        if(players.value.length === 0){
            players.value.push({username: "Pas de joueur enregistré", score: 0, reason: {reason: "Pas de data"}})
        }
    });

</script>

<template>

    <div class="window" style="width: 300px">
        
        <div class="title-bar">
            <div class="title-bar-text">ScoreBoard</div>
            <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
            </div>
        </div>

        <div class="window-body">
            <PlayerStat :players="players"/>
        </div>
    
    </div>
</template>

<style>

</style>