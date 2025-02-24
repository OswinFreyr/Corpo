<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"
  import Answer from "../components/Answer.vue";

  let scoreDays = 0;
  let playing = true;
  let currentPlayer = {
    pseudo: "poupouDestructor",
    days: 12,
    reason:"N'était pas à la hauteur"
  }
  
</script>

<template>

  <div class="infos">
    <h2> {{ scoreDays }} jours</h2>
    <h2>LOGO CORPO.</h2>
  </div>

  <div class="page">
    
    <div class="post-its">
      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Économie" description="L'argent coule à flots" value="80" image="../assets/chat.png" />
      </div>
      <PostIt title="Bien-être" description="Bonnes conditions de travail" value="46" image="../assets/chat.png" />
      <PostIt title="Productivité" description="Au travail" value="5" image="../assets/chat.png" />
      <PostIt title="RSE" description="Le réchauffement c'est pour les faibles" value="10" image="../assets/chat.png" />
    </div>

    <div>
      <Game v-if="playing" />
      <ScoreScreen v-else :player="currentPlayer"></ScoreScreen>
    </div>

    <ScoreBoard/>
  </div>

  <Pseudo/>  
  <Answer answer="Un super texte de réponse"/> 

</template>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  flex-grow: 1; 
  padding: 20px; 
  gap: 20px; 
}

.post-its {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  gap: 10px;
}

.infos{
  display: flex;
  justify-content: space-evenly;
}

.clippy {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 50px; 
  transform: rotate(-15deg);
  z-index: 100;
}

.post-it-container {
  position: relative; 
}
</style>
