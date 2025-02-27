<script setup lang="ts">

import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { bus } from "../scripts/eventBus.js"

const buttonRefReplay = ref<HTMLElement | null>(null)
const buttonRefNewPlayer = ref<HTMLElement | null>(null)
let currentButton: string = "replay"

const setButtonRef = (button: any) => (el: any) => {
  if (button == "replay"){
    buttonRefReplay.value = el;
  } else if (button == "newPlayer") {
    buttonRefNewPlayer.value = el
  }
};

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

const triggerAction = (input: number, buttonOrAxis: string, stringAction?: string) => {
    if (buttonOrAxis == "button"){
      if (input == 1){
        if (currentButton == "replay"){
            rejouer();
        } else if (currentButton == "newPlayer"){
            newPlayer();
        }
      }
    } else if (buttonOrAxis == "axis" && stringAction !== undefined){
      console.log("Axis Pressed!")
      let action: number = parseFloat(stringAction);
      if (input == 0){
        if (action == 1.00 && currentButton == "replay"){
            currentButton = "newPlayer"
            buttonRefNewPlayer.value ? buttonRefNewPlayer.value.focus() : console.error("Button Replay ref not available")
        } else if (action == -1.00){
            currentButton = "replay"
            buttonRefNewPlayer.value ? buttonRefReplay.value.focus() : console.error("Button New Player ref not available")
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

</script>

<template>

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
            <li class="info-subtitle">Vous avez maintenu l'entreprise à flots durant <strong> {{ player.score }}</strong> jours</li>
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
</style>