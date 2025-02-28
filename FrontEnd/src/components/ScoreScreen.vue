<script setup lang="ts">

import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { bus } from "../scripts/eventBus.js"

const buttonRefReplay = ref<HTMLElement | null>(null)
const buttonRefNewPlayer = ref<HTMLElement | null>(null)
const buttonRefSuivant = ref<HTMLElement | null>(null)
const buttonRefPrecedent = ref<HTMLElement | null>(null)
let currentButton: string = "replay"

const setButtonRef = (button: any) => (el: any) => {
  if (button == "replay"){
    buttonRefReplay.value = el;
  } else if (button == "newPlayer") {
    buttonRefNewPlayer.value = el
  } else if (button == "suivant") {
    buttonRefSuivant.value = el
  } else if (button == "precedent") {
    buttonRefPrecedent.value = el
  }
};

const props = defineProps<{
    playing: number;
    player: { id:number; username: string; score: number ; reason:{reason:string}};
    historyQuestions: { question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[];
    historyAnswers: { answer: string; productivity: number; wellbeing: number; treasury: number; environment: number; reason: string }[];
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

const triggerAction = (input: number, buttonOrAxis: string, stringAction?: string) => {
    if (buttonOrAxis == "button"){
      if (input == 1){
        if (currentButton == "replay"){
            rejouer();
        } else if (currentButton == "newPlayer"){
            newPlayer();
        } else if (currentButton == "suivant"){
            next()
        } else if (currentButton == "precedent"){
            previous()
        }
      }
    } else if (buttonOrAxis == "axis" && stringAction !== undefined){
      let action: number = parseFloat(stringAction);
      if (input == 0){
        if (action == 1.00 && currentButton == "replay"){
            currentButton = "newPlayer"
            buttonRefNewPlayer.value ? buttonRefNewPlayer.value.focus() : console.error("Button Replay ref not available")
        } else if (action == -1.00 && currentButton == "newPlayer"){
            currentButton = "replay"
            buttonRefNewPlayer.value ? buttonRefReplay.value?.focus() : console.error("Button New Player ref not available")
        } else if (action == 1.00 && currentButton == "precedent"){
            currentButton = "suivant"
            buttonRefPrecedent.value ? buttonRefSuivant.value?.focus() : console.error("Button Suivant ref not available")
        } else if (action == -1.00 && currentButton == "suivant"){
            currentButton = "precedent"
            buttonRefSuivant.value ? buttonRefPrecedent.value?.focus() : console.error("Button Suivant ref not available")
        }
      } else if (input == 1) {
        if (action == -1.00 && currentButton == "precedent"){
            currentButton = "replay"
            buttonRefPrecedent.value ? buttonRefReplay.value?.focus() : console.error("Button New Player ref not available")
        } else if (action == -1.00 && currentButton == "suivant"){
            currentButton = "newPlayer"
            buttonRefSuivant.value ? buttonRefNewPlayer.value?.focus() : console.error("Button Replay ref not available")
        } else if (action == 1.00 && currentButton == "replay"){
            currentButton = "precedent"
            buttonRefReplay.value ? buttonRefPrecedent.value?.focus() : console.error("Button Precedent ref not available")
        } else if (action == 1.00 && currentButton == "newPlayer"){
            currentButton = "suivant"
            buttonRefNewPlayer.value ? buttonRefSuivant.value?.focus() : console.error("Button Suivant ref not available")
        }
      }
    }
};


const handleGamepadInput = (event: { button: number; axis: number; action: string }) => {
    if (event.button !== null && event.action == "pressed") {
        triggerAction(event.button, "button");
    } else if (event.axis !== null){
      triggerAction(event.axis, "axis", event.action)
    }
};


onMounted(async () => {
    nextTick(() => {
        if ( buttonRefReplay.value ) {
            buttonRefReplay.value.focus();
        } else {
            console.error("Button Replay ref not available");
    }
    })
    bus.on('gamepadInput', handleGamepadInput);
});

onUnmounted(() => {
  bus.off('gamepadInput', handleGamepadInput);
});

const currentIndex = ref(props.historyQuestions.length - 1);

const currentQuestion = computed(() =>
    props.historyQuestions[currentIndex.value] ?? { question: "Aucune question disponible" }
);
const currentAnswer = computed(() =>
    props.historyAnswers[currentIndex.value] ?? { answer: "Aucune réponse", treasury: 0, wellbeing: 0, productivity: 0, environment: 0 }
);


const previous = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const next = () => {
    if (currentIndex.value < props.historyQuestions.length - 1) {
        currentIndex.value++;
    }
};


</script>

<template>
<div class="score">
  <div class="window" style="width: 500px">
    <div class="title-bar">
      <div class="title-bar-text">Fin du jeu -- {{ player.username }}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body">
      <div>
          <ul class="infos">
              <li class="info-title">Défaite !</li>
              <li class="info-subtitle">Vous avez maintenu l'entreprise à flots durant  <span style="font-size: larger;"> <strong> {{ player.score }} </strong> </span> jours</li>
              <li class="info-reason">Raison de votre flagrant échec : {{ player.reason.reason }}</li>
              <li >Rejouez à vos risques et périls !</li>
          </ul>
      </div>
      <div class="buttons">
          <button @click="rejouer()" :ref="setButtonRef('replay')">
              Rejouer
          </button>
          <button @click="newPlayer()" :ref="setButtonRef('newPlayer')">
              Nouveau joueur
          </button>
      </div>
    </div>
  </div>

  <div class="window" style="width: 500px">
      <div class="title-bar">
          <div class="title-bar-text">Historique -- {{ player.username }}</div>
          <div class="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
          </div>
      </div>

      <div class="window-body">
          <div>
              <ul class="infos">
                  <li class="info-question">Question {{ currentIndex }} : {{ currentQuestion.question }}</li>
                  <li class="info-answer">Réponse : {{ currentAnswer.answer }}</li>
                  <li class="info-data">
                          <ul class="infos">
                              <li>Trésorerie : {{ currentAnswer.treasury }}</li>
                              <li>Bien-être : {{ currentAnswer.wellbeing }}</li>
                          </ul>
                          <ul class="infos">
                              <li>Productivité : {{ currentAnswer.productivity }}</li>
                              <li>Environnement : {{ currentAnswer.environment }}</li>
                          </ul>
                  </li>
              </ul>
          </div>
          <div class="buttons">
              <button @click="previous"  :ref="setButtonRef('precedent')">
                  Précédent
              </button>
              <button @click="next" :ref="setButtonRef('suivant')">
                  Suivant
              </button>
          </div>
      </div>
  </div>
</div>

</template>

<style scoped>
    .score{
      display: flex;
      flex-direction: column;
      gap: 20px
    }
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

    .info-title{
        font-size: large;
    }

    .info-subtitle{
        font-size: medium;
    }

    .info-reason{
        font-size: small;
    }

    strong {
        font-weight: bold;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .info-question {
      font-size: large;
      min-height: 80px;
      max-width: 100%;
    }

    .info-answer {
      font-size: medium;
      min-height: 80px;
      max-width: 100%;
    }

    .info-data {
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: small;
      gap:10px;
    }
</style>