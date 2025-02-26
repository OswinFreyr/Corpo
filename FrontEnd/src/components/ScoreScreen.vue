<script setup lang="ts">

    const props = defineProps<{
        playing: number;
        player: { id:number; username: string; score: number ; reason:{reason:string}};
    }>();

    const emit = defineEmits(['updateScorePlaying', 'updateScoreCurrentUser']);

    function rejouer() {
        let propsUser = { id:props.player.id, username: props.player.username, score: 1, reason:{reason:"Fin"}};
        emit('updateScorePlaying', 1);
        emit('updateScoreCurrentUser', propsUser);
    }
    function newPlayer() {
        let propsUser = { id:0, username: " ", score: 1, reason:{reason:"Fin"}};
        emit('updateScorePlaying', 0);
        emit('updateScoreCurrentUser', propsUser);
    }

</script>

<template>

<div class="window" style="width: 500px">

  <div class="title-bar">
    <div class="title-bar-text">Fin du jeu</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>

  <div class="window-body">
    <div>
        <ul class="infos">
            <li>Bravo {{ player.username }} !</li>
            <li>Vous avez maintenu l'entreprise à flots durant {{ player.score }} jours</li>
            <li>Raison de votre flagrant échec : {{ player.reason.reason }}</li>
            <li>(Rejouez à vos risques et périls !)</li>
        </ul>
    </div>
    <div class="buttons">
        <button @click="rejouer()">
            Rejouer
        </button>
        <button @click="newPlayer()">
            Nouveau joueur
        </button>
    </div>
  </div>
</div>

</template>

<style scoped>
    .infos{
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }

    .buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
    }
</style>