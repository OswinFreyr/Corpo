<script setup lang="ts">

    const props = defineProps<{
        player: { pseudo: string; days: number ; reason:string};
    }>();
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
            <li>{{ player.pseudo }}</li>
            <li>Vous avez maintenu l'entreprise à flots durant {{ player.days }} jours</li>
            <li>Raison de votre flagrant échec : {{ player.reason }}</li>
        </ul>
    </div>
    <div class="buttons">
        <button>
            Rejouer
        </button>
        <button>
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