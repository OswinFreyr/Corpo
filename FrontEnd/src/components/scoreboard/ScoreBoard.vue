<script setup lang="ts">
    import "xp.css/dist/XP.css";    
    import PlayerStat from "./PlayerStat.vue"
    import { onMounted, ref } from "vue";

    const props = defineProps<{
        players: {username:string, score: number, reason: {reason:string}}[]
    }>();


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
            <PlayerStat :players="props.players"/>
        </div>
    
    </div>
</template>

<style>

</style>