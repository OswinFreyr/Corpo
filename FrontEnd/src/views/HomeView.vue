<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import { ref, onMounted, onUnmounted } from 'vue';

  import askQuestions from "../api/askQuestions.js";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"
  import Answer from "../components/Answer.vue";

  let playing = true;
  let tuto=true;
  let currentPlayer = {
    pseudo: "poupouDestructor",
    days: 12,
    reason:"N'était pas à la hauteur"
  }
  let currentScore = 0;
  let questions = ref([]);
  let productivity=ref(50);
  let wellbeing = ref(50);
  let environment = ref(50);
  let treasury = ref(50) ;
  let compteurQuestions = ref(0);

  onMounted(async () => {
    questions.value = await askQuestions();
    // console.log("Questions chargées :", questions.value);
});



const handleSelectedAnswer = (answer: { answer:string,productivity: number; wellbeing: number; treasury: number; environment: number ;reason:string}) => {
  console.log("Réponse sélectionnée :", answer);

  // if (tuto){
  //   if (compteurQuestions.value === 0 && answer.answer === "Non"){
  //     // sortir
  //   }
  // }
  
  productivity.value += answer.productivity;
  wellbeing.value += answer.wellbeing;
  treasury.value += answer.treasury;
  environment.value += answer.environment;

  if (productivity.value <= 0 || wellbeing.value <= 0 || treasury.value <= 0 || environment.value <= 0 || productivity.value >= 100 || wellbeing.value >= 100 || treasury.value >= 100 || environment.value >= 100) {
    playing = false;
    currentPlayer.reason = answer.reason;
    tuto=true;
  }
  else{
    currentScore++;
    compteurQuestions.value++;
  }
};

  
</script>

<template>

  <div class="infos">
    <h2> {{ currentScore }} jours</h2>
    <h2>LOGO CORPO.</h2>
  </div>

  <div class="page">
    
    <div class="post-its">
      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Économie" description="L'argent coule à flots" :value="treasury" image="../assets/chat.png" />
      </div>
      <PostIt title="Bien-être" description="Bonnes conditions de travail" :value="wellbeing" image="../assets/chat.png" />
      <PostIt title="Productivité" description="Au travail" :value="productivity" image="../assets/chat.png" />
      <PostIt title="RSE" description="Le réchauffement c'est pour les faibles" :value="environment" image="../assets/chat.png" />
    </div>

    <div>
      <Game :questions="questions" v-if="playing" :tuto="tuto" @selectedAnswer="handleSelectedAnswer" :compteurQuestions="compteurQuestions" />
      <ScoreScreen v-else :player="currentPlayer"></ScoreScreen>
    </div>

    <ScoreBoard/>
  </div>

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
