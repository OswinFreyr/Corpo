<script setup lang="ts">
    import "xp.css/dist/XP.css";    
    import PlayerStat from "./PlayerStat.vue"


    //TODO utiliser fct api fetch players
    let players = [
        { pseudo: 'Player1', days: 3, reason:"N'a pas payé ses impots" },
        { pseudo: 'Player2', days: 2 ,reason:"N'a pas payé ses impots"},
        { pseudo: 'Player3', days: 1,reason:"N'a pas payé ses impots" },
        { pseudo: 'Player4', days: 4 ,reason:"N'a pas payé ses impots"},
        { pseudo: 'Player5', days: 5 ,reason:"N'a pas payé ses impots"}
    ]
    //TODO classer les players par score
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