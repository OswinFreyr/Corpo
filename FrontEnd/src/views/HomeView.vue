<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
  import { bus } from "../scripts/eventBus.js"

  import getDescription from "../functions/utils/getDescription.js";
  import getUniqueRandom from "../functions/utils/getUniqueRandom.js";
  import askQuestions from "../api/askQuestions.js";
  import updateUser from "../api/updateUser.js";
  import getReason from "../functions/utils/getReason.js";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"

  let playing = ref(0);
  let tuto = true;
  let currentUser = ref<{id:number; username:string; score:number; reason: {reason:string}}>({id:0, username:"temp", score:1, reason: {reason: "Fin"}})
  let noCount = 1;
  let currentScore = ref(0);
  let questions = ref<{ question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[]>([]);
  let productivity=ref(50);
  let wellbeing = ref(50);
  let environment = ref(50);
  let treasury = ref(50);
  let compteurQuestions = ref(0);
  let history = [];

  const previousButtonStates = ref(new Array(17).fill(false));
const previousAxesStates = ref(new Float32Array(4).fill(0.0));

let rafId: number | null = null;

const processGamepadInput = (gamepad: Gamepad) => {
  for (let i = 0; i < gamepad.buttons.length; i++) {
    const isPressed = gamepad.buttons[i].pressed;
    if (isPressed !== previousButtonStates.value[i]) {
      if (isPressed) {
        console.log(`Button ${i} pressed!`);
        bus.emit('gamepadInput', { button: i, action: "pressed"})
      } else {
        console.log(`Button ${i} released!`);
        //bus.emit('gamepadInput', { button: i, action: "unpressed"})
      }
      previousButtonStates.value[i] = isPressed;
    }
  }

  for (let i = 0; i < gamepad.axes.length; i++) {
    const axisValue = gamepad.axes[i];
    if (Math.abs(axisValue - previousAxesStates.value[i]) > 0.1) {
      console.log(`Axis ${i} moved to ${axisValue.toFixed(2)}`);
      if (parseFloat(axisValue.toFixed(2)) !== 0.0){
        bus.emit('gamepadInput', { axis: i, action: axisValue.toFixed(2)})
      }
      
      previousAxesStates.value[i] = axisValue;
    }
  }
};

const startPollingGamepads = () => {
  const updateGamepad = () => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];
    if (gamepad) {
      processGamepadInput(gamepad);
    }
    rafId = requestAnimationFrame(updateGamepad);
  };
  rafId = requestAnimationFrame(updateGamepad);
};

  // onMounted(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("value:", playing.value);
  //   }, 1000);

  //   // Clean up the interval when the component is unmounted
  //   onUnmounted(() => {
  //     clearInterval(intervalId);
  //   });
  // });

onMounted(async () => {
  window.addEventListener('gamepadconnected', () => {
    console.log('Gamepad connected');
    startPollingGamepads();
  });

  window.addEventListener('gamepaddisconnected', () => {
    console.log('Gamepad disconnected');
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
  questions.value = await askQuestions();
});

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  window.removeEventListener('gamepadconnected');
  window.removeEventListener('gamepaddisconnected');
});

const handleUpdatePlaying = (newValue:number) => {
  playing.value = newValue;
};

const handleUpdateCurrentUser = (newValue:{id:number; username:string; score:number; reason:{reason:string}}) => {
  currentUser.value = newValue;
};

const handleScorePlaying = (newValue:number) => {
  productivity.value = 50;
  wellbeing.value = 50;
  treasury.value = 50;
  environment.value = 50;
  currentScore.value = 0;
  playing.value = newValue;
};

const handleScorePlayer = (newValue:{id:number; username:string; score:number; reason:{reason:string}}) => {
  currentUser.value = newValue;
};

const handleSelectedAnswer = async (answer: { answer:string,productivity: number; wellbeing: number; treasury: number; environment: number ;reason:string}) => {
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
    history.push(answer.answer);
    console.log("history: " + history[0]);
    if (
        productivity.value <= 0 || wellbeing.value <= 0 || treasury.value <= 0 || environment.value <= 0 ||
        productivity.value >= 100 || wellbeing.value >= 100 || treasury.value >= 100 || environment.value >= 100
  ) {
    let gaugesAtLimit = [];
    let randomGauge, gaugeValue;

    if (productivity.value <= 0) gaugesAtLimit.push({ name: "productivity", value: productivity.value });
    if (wellbeing.value <= 0) gaugesAtLimit.push({ name: "wellbeing", value: wellbeing.value });
    if (treasury.value <= 0) gaugesAtLimit.push({ name: "treasury", value: treasury.value });
    if (environment.value <= 0) gaugesAtLimit.push({ name: "environment", value: environment.value });

    if (productivity.value >= 100) gaugesAtLimit.push({ name: "productivity", value: productivity.value });
    if (wellbeing.value >= 100) gaugesAtLimit.push({ name: "wellbeing", value: wellbeing.value });
    if (treasury.value >= 100) gaugesAtLimit.push({ name: "treasury", value: treasury.value });
    if (environment.value >= 100) gaugesAtLimit.push({ name: "environment", value: environment.value });

    if (gaugesAtLimit.length > 0) {
      let selectedGauge = gaugesAtLimit[Math.floor(Math.random() * gaugesAtLimit.length)];
      randomGauge = selectedGauge.name;
      gaugeValue = selectedGauge.value;
    }

    currentUser.value.reason.reason = getReason(randomGauge, gaugeValue);
    currentUser.value.score = currentScore.value;
    

    await updateUser(currentUser.value.id, {
      score: currentScore.value,
      reason: { reason: currentUser.value.reason.reason }
    });
    compteurQuestions.value = 0;
    playing.value = 2;
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
  <div class="infos" v-if="playing===1">
    <div class="score-container">
      <div class="score-value-container">
        <h2 class="score">{{ currentScore }}</h2>
      </div>
      <h2 class="days-label">jours</h2>
    </div>

    <img class="corpo-logo" src="../assets/corpo-logo-fit.png" alt="">
    <div></div>
  </div>


  <div v-if="playing==0" class="pseudo">
    <Pseudo :playing="playing" @updatePlaying="handleUpdatePlaying" :currentUser="currentUser" @updateCurrentUser="handleUpdateCurrentUser"/>
  </div>

  <!-- page de jeu-->
  <div class="page" v-if="playing==1 || playing==2" >


    <!-- jauges-->
    <div class="post-its" >

      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Économie" :description="getDescription(treasury, 'treasury')" :value="treasury" image="src/assets/treasury.png" />
      </div>

      <PostIt title="Bien-être" :description="getDescription(wellbeing, 'wellbeing')" :value="wellbeing" image="src/assets/wellbeing.png" />
      <PostIt title="Productivité" :description="getDescription(productivity, 'productivity')" :value="productivity" image="src/assets/productivity.png" />
      <PostIt title="Environnement" :description="getDescription(environment, 'environment')" :value="environment" image="src/assets/environment.png" />
    </div>

    <!-- questions reponses -->
    <div>
      <Game :questions="questions" v-if="playing==1" :tuto="tuto" @selectedAnswer="handleSelectedAnswer" :compteurQuestions="compteurQuestions" />
      <ScoreScreen v-if="playing==2" :playing="playing" @updateScorePlaying="handleScorePlaying" :player="currentUser" @updateScoreCurrentUser="handleScorePlayer" />
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
  /* margin-bottom: 20px;  */
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

.pseudo{
  display: flex;
  justify-self: center;
}

.corpo-logo{
  width: 20%;
}

</style>
