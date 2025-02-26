<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import { ref, onMounted, computed, watch } from 'vue';

  import getDescription from "../functions/utils/getDescription.js";
  import getUniqueRandom from "../functions/utils/getUniqueRandom.js";
  import askQuestions from "../api/askQuestions.js";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"
  import Answer from "../components/Answer.vue";

  let playing = ref(0);
  let tuto = true;
  let currentPlayer = {
    pseudo: "poupouDestructor",
    days: 12,
    reason:"N'était pas à la hauteur"
  };
  let noCount = 1;
  let currentScore = ref(1);
  let questions = ref<{ question: string; answer: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[]>([]);
  let productivity=ref(50);
  let wellbeing = ref(50);
  let environment = ref(50);
  let treasury = ref(50);
  let compteurQuestions = ref(0);

  onMounted(async () => {
      questions.value = await askQuestions();
});

const handleSelectedAnswer = (answer: { answer:string,productivity: number; wellbeing: number; treasury: number; environment: number ;reason:string}) => {
  console.log("Réponse sélectionnée :", answer);

  if (tuto){
    if (compteurQuestions.value === 0){
      if (answer.answer === "Non") {
        currentScore.value++;
        compteurQuestions.value = getUniqueRandom();
        tuto = false;
      }
      else if (answer.answer === "Oui") {
        compteurQuestions.value ++;
      }
    }
    else if (compteurQuestions.value === 1){
      if (answer.answer === "Non") {
        wellbeing.value += answer.wellbeing * noCount
        noCount++;
        if(wellbeing.value <= 0) {
          questions.value[1].question = "J'espère que vous avez compris au bout de la 8ème fois, passons à la suite.";
          setTimeout(() => {
            compteurQuestions.value ++;
          }, 2000)
        }
      }
      else if (answer.answer === "Oui") {
        compteurQuestions.value ++;
      }
    }
    else if (compteurQuestions.value === 2){
      productivity.value += answer.productivity
      compteurQuestions.value ++;
    }
    else if (compteurQuestions.value === 3){
      productivity.value = 50;
      wellbeing.value = 50;
      compteurQuestions.value = getUniqueRandom();
      currentScore.value++;
      tuto = false;
    }
  } else  {
    productivity.value += answer.productivity;
    wellbeing.value += answer.wellbeing;
    treasury.value += answer.treasury;
    environment.value += answer.environment;
    
    if (productivity.value <= 0 || wellbeing.value <= 0 || treasury.value <= 0 || environment.value <= 0 || productivity.value >= 100 || wellbeing.value >= 100 || treasury.value >= 100 || environment.value >= 100) {
      playing.value = 2;
      currentPlayer.reason = answer.reason;
      tuto = true;
    }
    else{
      currentScore.value++;
      compteurQuestions.value = getUniqueRandom();
    }
  }

};

</script>

<template class="container">

  <!-- Header de la page de jeu-->
  <div class="infos">
    <h2>{{ currentScore }} jours</h2>
    <h2>LOGO CORPO.</h2>
    <div></div>
  </div>

  <div v-if="playing==0">
    <Pseudo />
  </div>

  <!-- page de jeu-->
  <div class="page" v-if="playing==1 || playing==2" >


    <!-- jauges-->
    <div class="post-its" >

      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Économie" :description="getDescription(treasury, 'treasury')" :value="treasury" image="../assets/chat.png" />
      </div>

      <PostIt title="Bien-être" :description="getDescription(wellbeing, 'wellbeing')" :value="wellbeing" image="../assets/chat.png" />
      <PostIt title="Productivité" :description="getDescription(productivity, 'productivity')" :value="productivity" image="../assets/chat.png" />
      <PostIt title="RSE" :description="getDescription(environment, 'environment')" :value="environment" image="../assets/chat.png" />
    </div>

    <!-- questions reponses -->
    <div>
      <Game :questions="questions" v-if="playing==1" :tuto="tuto" @selectedAnswer="handleSelectedAnswer" :compteurQuestions="compteurQuestions" />
      <ScoreScreen v-if="playing==2" :player="currentPlayer" />
    </div>
    
    <!-- scoreboard -->
    <div>
      <ScoreBoard />
    </div>
  </div>


</template>

<style scoped>

.page {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr; 
  gap: 50px;
  padding: 20px;
  align-items: start; 
}


.post-its {
  display: flex;
  flex-direction: column; 
  gap: 10px;
  /* background-color: #6578d6; */
  padding: 15px;
}

.infos{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
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
