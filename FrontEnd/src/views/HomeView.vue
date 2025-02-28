<script setup lang="ts">

  import "xp.css/dist/XP.css";
  import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
  import { bus } from "../scripts/eventBus.js"

  import getDescription from "../functions/utils/getDescription.js";
  import getUniqueRandom from "../functions/utils/getUniqueRandom.js";
  import askQuestions from "../api/askQuestions.js";
  import askUsers from "../api/askUsers.js"
  import askOneUser from "../api/askOneUser.js"
  import askOneQuestion from "../api/askOneQuestion.js"
  import updateUser from "../api/updateUser.js";
  import getReason from "../functions/utils/getReason.js";
  import getEvent from "../functions/utils/getEvent.js";
  import ScoreBoard from "../components/scoreboard/ScoreBoard.vue";
  import PostIt from "../components/PostIt.vue";
  import Game from "../components/Game.vue";
  import Pseudo from "../components/Pseudo.vue"
  import ScoreScreen from "../components/ScoreScreen.vue"

  import bonusSound from "../../public/9762.mp3"
  // import startSessionSound from "../../public/start-session.mp3"
  import endSessionSound from "../../public/end-session.mp3"

  const audioBonus = new Audio(bonusSound); 
  const audioEndSession = new Audio(endSessionSound);


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
  let players = ref<{username:string, score: number, reason: {reason:string}}[]>([]);
  let historyQuestions = <{ question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[]>[];
  let historyAnswers = <{ answer:string,productivity: number; wellbeing: number; treasury: number; environment: number ;reason:string}[]>[];


  const previousButtonStates = ref(new Array(17).fill(false));
const previousAxesStates = ref(new Float32Array(4).fill(0.0));

let rafId: number | null = null;

const processGamepadInput = (gamepad: Gamepad) => {
  for (let i = 0; i < gamepad.buttons.length; i++) {
    const isPressed = gamepad.buttons[i].pressed;
    if (isPressed !== previousButtonStates.value[i]) {
      if (isPressed) {
        bus.emit('gamepadInput', { button: i, action: "pressed"})
      } else {
        //bus.emit('gamepadInput', { button: i, action: "unpressed"})
      }
      previousButtonStates.value[i] = isPressed;
    }
  }

  for (let i = 0; i < gamepad.axes.length; i++) {
    const axisValue = gamepad.axes[i];
    if (Math.abs(axisValue - previousAxesStates.value[i]) > 0.1) {
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
  players.value = await askUsers();
    if(players.value.length === 0){
        players.value.push({username: "Pas de joueur enregistré", score: 0, reason: {reason: "Pas de data"}})
    }
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

let lastBonusDay = 0;
let randomBonus = ref();
let bonusTriggered = ref(false);

const handleBonusEvent = () => {
  if (currentScore.value >= 5 && currentScore.value - lastBonusDay >= 7) {
    if (Math.random() < 0.5) { 
      randomBonus.value = getEvent();
      bonusTriggered.value = true;
      audioBonus.play();

      setTimeout(() => {
        productivity.value += randomBonus.value.productivity;
        wellbeing.value += randomBonus.value.wellbeing;
        treasury.value += randomBonus.value.treasury;
        environment.value += randomBonus.value.environment;
      }, 5000); 
      
      
      lastBonusDay = currentScore.value;

      setTimeout(() => {
        bonusTriggered.value = false;
      }, 20000); 
    }
  }
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

    handleBonusEvent();
    
    let questionTemp = await askOneQuestion(compteurQuestions.value)
    historyQuestions.push(questionTemp);
    productivity.value += answer.productivity;
    wellbeing.value += answer.wellbeing;
    treasury.value += answer.treasury;
    environment.value += answer.environment;
    historyAnswers.push(answer);
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

    let tempUser = await askOneUser(currentUser.value.id);
    if (tempUser.score > currentScore.value) {
      currentUser.value.score = tempUser.score;
      currentUser.value.reason.reason = tempUser.reason.reason
    }

    await updateUser(currentUser.value.id, {
      score: currentUser.value.score,
      reason: { reason: currentUser.value.reason.reason }
    });
    players.value = await askUsers();
    compteurQuestions.value = 0;
    playing.value = 2;
    audioEndSession.play();
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
  <div class="infos" v-if="playing===1 || playing===2">

    <img class="corpo-logo" src="../assets/corpo-logo-fit.png" alt="">
    <div></div>
  </div>


  <div v-if="playing==0" class="pseudo">
    <Pseudo :playing="playing" @updatePlaying="handleUpdatePlaying" :currentUser="currentUser" @updateCurrentUser="handleUpdateCurrentUser"/>
    <ScoreBoard :players="players"/>
  </div>

  <!-- page de jeu-->
  <div class="page" v-if="playing==1 || playing==2" >


    <!-- jauges-->
    <div class="post-its" >

      <div class="post-it-container">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <PostIt title="Trésorerie" :description="getDescription(treasury, 'treasury')" :value="treasury" image="src/assets/treasury.png" />
      </div>

      <PostIt title="Bien-être" :description="getDescription(wellbeing, 'wellbeing')" :value="wellbeing" image="src/assets/wellbeing.png" />
      <PostIt title="Productivité" :description="getDescription(productivity, 'productivity')" :value="productivity" image="src/assets/productivity.png" />
      <PostIt title="Environnement" :description="getDescription(environment, 'environment')" :value="environment" image="src/assets/environment.png" />
    </div>

    <!-- questions reponses -->
    <div>
      <Game :questions="questions" v-if="playing==1" :tuto="tuto" @selectedAnswer="handleSelectedAnswer" :compteurQuestions="compteurQuestions" />
      <ScoreScreen v-if="playing==2" :playing="playing" @updateScorePlaying="handleScorePlaying" :player="currentUser" @updateScoreCurrentUser="handleScorePlayer" :historyAnswers="historyAnswers" :historyQuestions="historyQuestions" />
    </div>
    
    <!-- scoreboard -->
    <div >
        <div v-if="playing == 1" class="score-container">
          <div class="window" style="width: 400px;">
            <div class="title-bar">
              <div class="title-bar-text">Score</div>
              <div class="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close"></button>
              </div>
            </div>

            <div class="window-body" style="padding-left: 25px;">
              <div class="score-value-container">
                <h2 class="score">{{ currentScore }}</h2>
              </div>
              <h2 class="days-label">jours</h2>
            </div>
            <div class="window-body" style="padding-left: 25px;">
              <div class="score-value-container">
                <p class="highscore"> <span class="highlight">{{ players[0].username }}</span> est meilleur que vous avec <span class="highlight">{{ players[0].score }}</span> jours tenus !</p>
              </div>
            </div>
          </div>

          <!-- notification bonus-->
          <div v-if="bonusTriggered" class="bonus bonus-appear" :class="{ show: bonusTriggered }">
            <div style="display: flex; flex-direction: column; gap: 15px;">
              <div style="display: flex; gap: 10px; align-items: center;">
                <img style="width: 32px;" src="../assets/warn.png" alt="">
                <p style="font-weight: bold; font-size: medium;">Alerte</p>
              </div>
              <span style="font-size: medium;">
                  {{ randomBonus.description }}
              </span>
            </div>
            <div class="bonus-jauges">
              <ul>
                <li>Trésorerie : {{ randomBonus.treasury }}</li>
                <li>Bien-être : {{ randomBonus.wellbeing }}</li>
              </ul>
              <ul>
                <li>Productivité : {{ randomBonus.productivity }}</li>
                <li>Environnement : {{ randomBonus.environment }}</li>
              </ul>
            </div>
          </div>
      </div>
      <ScoreBoard v-if="playing == 2" :players="players"/>
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
  justify-content: center;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  /* justify-self: center; */
  justify-content: space-evenly;
  padding-left: 23%
}

.corpo-logo{
  width: 20%;
}

.window-body {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.highscore{
  font-size: 15px;
}

.highlight{
  font-weight: 700;
}

.bonus>p{
  font-weight: bold;
  font-size: medium;
}

.bonus>span{
  font-size: medium;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.bonus {
  background-color: #fffee0;
  border: solid 1px #000;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* position: absolute; */
  right: 10px;
  top: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  opacity: 0; 
}

.bonus-appear {
  animation: slideInFromRight 0.5s ease-in-out forwards;
}


.bonus.show {
  transform: translateX(0);
  opacity: 1;
}

.bonus-jauges {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.bonus-jauges>ul{
  list-style: none;
}

.bonus-jauges>ul>li{
  font-weight: bold;

}

</style>
