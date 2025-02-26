<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import { ref, onMounted, computed,watch } from 'vue';

  import getDescription from "../functions/utils/getDescription.js";
  import askQuestions from "../api/askQuestions.js";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"
  import Answer from "../components/Answer.vue";

  let playing = true;
  let tuto = true;
  let currentPlayer = {
    pseudo: "poupouDestructor",
    days: 12,
    reason:"N'était pas à la hauteur"
  };
  let noCount = 1;
  let questions = ref<{ question: string; answer: string; productivity: number; wellbeing: number; treasury: number; environment: number; reason: string }[]>([]);
  let productivity=ref(50);
  let wellbeing = ref(50);
  let environment = ref(50);
  let treasury = ref(50);
  let compteurQuestions = ref(0);
  let currentScore = ref(0);

  onMounted(async () => {
    if(tuto) {
      const questionsData = await fetch("../../questionsTuto.json");
      questions.value = await questionsData.json();
    } else {
      questions.value = await askQuestions();
    }
});

watch(currentScore, (newScore, oldScore) => {
  if (newScore > oldScore) {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
      scoreElement.classList.add('increase');
      setTimeout(() => {
        scoreElement.classList.remove('increase');
      }, 500);
    }
  }
});


const handleSelectedAnswer = (answer: { answer:string,productivity: number; wellbeing: number; treasury: number; environment: number ;reason:string}) => {
  console.log("Réponse sélectionnée :", answer);

  if (tuto){
    if (compteurQuestions.value === 0){
      if (answer.answer === "Non") {
        tuto = false
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
          }, 3000)
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
      compteurQuestions.value = 0;
      tuto = false;
    }
  } else  {
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
      currentScore.value++;
      compteurQuestions.value++;
    }
  }

};

</script>

<template class="container">

  <!-- Header de la page de jeu-->
  <div class="infos">
    <div class="score-container">
      <div class="score-value-container">
        <h2 class="score">{{ currentScore }}</h2>
      </div>
      <h2 class="days-label">jours</h2>
    </div>

  <h2>LOGO CORPO.</h2>
  <div></div>
</div>


  <!-- page de jeu-->
  <div class="page">

    <!-- jauges-->
    <div class="post-its">

      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Économie" :description="getDescription(treasury, 'treasury')" :value="treasury" image="../assets/chat.png" />
      </div>

      <PostIt title="Bien-être" :description="getDescription(wellbeing, 'wellbeing')" :value="wellbeing" image="../assets/chat.png" />
      <PostIt title="Productivité" :description="getDescription(productivity, 'productivity')" :value="productivity" image="../assets/chat.png" />
      <PostIt title="Environnement" :description="getDescription(environment, 'environment')" :value="environment" image="../assets/chat.png" />
    </div>

    <!-- questions reponses -->
    <div>
      <Game :questions="questions" v-if="playing" :tuto="tuto" @selectedAnswer="handleSelectedAnswer" :compteurQuestions="compteurQuestions" />
      <ScoreScreen v-else :player="currentPlayer"></ScoreScreen>
    </div>
    
    <!-- scoreboard -->
    <div>
      <ScoreBoard/>
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

.score-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

@keyframes scoreIncrease {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.score.increase {
  animation: scoreIncrease 0.5s ease-out;
}

</style>
