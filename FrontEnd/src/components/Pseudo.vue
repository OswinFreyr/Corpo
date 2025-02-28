<script setup lang="ts">
import "xp.css/dist/XP.css";
import { defineProps, nextTick, onMounted, onUnmounted, ref } from "vue";
import { bus } from "../scripts/eventBus.js"
import verifPseudo from "../functions/utils/verifPseudo";
import createUser from "../api/createUser";
import notifyPseudo from "../functions/utils/notifyPseudo";
import startSessionSound from "../../public/start-session.mp3"
import errorSound from "../../public/erreur.mp3"

const props = defineProps<{
  playing: number;
  currentUser: {
    id: number;
    username: string;
    score: number;
    reason: { reason: string };
  };
}>();

const emit = defineEmits(["updatePlaying", "updateCurrentUser"]);

const inputText = ref("");

let currentLetter: string = "A"
let currentXCoordinate: number = 1
let currentYCoordinate: number = 1

const keys = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)),
  "Suppr.", 
  "Entrer"
];
function calculateCoordinates(index: number): string {
    const x = Math.ceil((index + 1) / 7);  // Change from 6 to 7 keys per row
    const y = ((index % 7) + 1);          // Adjust modulo from 6 to 7
    return `${x}-${y}`;
}

interface KeyboardLayout {
  [coordinate: string]: string;
}

const keyboardLayout: KeyboardLayout = keys.reduce((acc: KeyboardLayout, key: string, i: number) => {
  const coordinates: string = calculateCoordinates(i);
  acc[coordinates] = key; 
  return acc;
}, {});


const buttonRefs: any = {};
keys.forEach(key => {
  buttonRefs[key] = ref<HTMLElement | null>(null);
});

const setButtonRef = (key: any) => (el: any) => {
  buttonRefs[key].value = el;
};

const inputKeyboard = (input: string) => {
  if (input === "Suppr."){
    deleteCharacter();
  } else if (input === "Entrer"){
    enterPressed();
  } else {
    addCharacter(input);
  }
}

const addCharacter = (char: string) => {
  inputText.value += char;
};

const deleteCharacter = () => {
  inputText.value = inputText.value.slice(0, -1);
};

let propsUser = props.currentUser;

let notification = ref("");
let isNotifVisible = ref(false);
const audioStartSession = new Audio(startSessionSound);
const audioError = new Audio(errorSound);

const enterPressed = async () => {
  if (!verifPseudo(inputText.value)) {
    notification.value = notifyPseudo(inputText.value);
    isNotifVisible.value = true;
    audioError.play();
  } else {
    const propsUserData = await createUser({
      username: inputText.value,
      score: 1,
      reason: { reason: "Fin" },
    });
    propsUser = await propsUserData.json();
    emit("updatePlaying", 1);
    emit("updateCurrentUser", propsUser);
    audioStartSession.play();

  }
};

const handleGamepadInput = (event: { button: number; axis: number; action: string }) => {
    if (event.button !== null && event.action == "pressed") {
        triggerAction(event.button, "button");
    } else if (event.axis !== null){
      triggerAction(event.axis, "axis", event.action)
    }
};

onMounted(() => {
  nextTick(() => {
    if (buttonRefs['A'] && buttonRefs['A'].value) {
      buttonRefs['A'].value.focus(); // Focus the 'A' button if it exists
    } else {
      console.error("Button 'A' ref not available");
    }
  });
  bus.on('gamepadInput', handleGamepadInput);
});

onUnmounted(() => {
  bus.off('gamepadInput', handleGamepadInput);
});

const changeFocusAndLetter = (x: number, y: number) => {
  const letter: string = keyboardLayout[`${y}-${x}`]
  buttonRefs[letter].value.focus()
  currentLetter = letter
  

}

const triggerAction = (input: number, buttonOrAxis: string, stringAction?: string) => {
    if (buttonOrAxis == "button"){
      if (input == 1){
        inputKeyboard(currentLetter)
      }
    } else if (buttonOrAxis == "axis" && stringAction !== undefined){
      let action: number = parseFloat(stringAction);
      console.log(input)
      console.log(action);
      if (input == 0){
        if (action == 1.00){
          if (currentXCoordinate == 7){
            currentXCoordinate = 1
          } else {
            currentXCoordinate += 1
          }
        } else if (action == -1.00){
          if (currentXCoordinate == 1){
            currentXCoordinate = 7
          } else {
            currentXCoordinate -= 1
          }
        }
      } else if (input == 1){
        if (action == 1.00){
          if (currentYCoordinate == 4){
            currentYCoordinate = 1
          } else {
            currentYCoordinate += 1
          }
        } else if (action == -1.00){
          if (currentYCoordinate == 1){
            currentYCoordinate = 4
          } else {
            currentYCoordinate -= 1
          }
        }
      }
      console.log(`${currentXCoordinate}-${currentYCoordinate}`)
      changeFocusAndLetter(currentXCoordinate, currentYCoordinate)
    }
};
</script>

<template>

  <div class="template">

      <div v-if="isNotifVisible" class="notification">
        <img src="../assets/security.png"/>
        <span>{{ notification }}</span>
      </div>
    
    
    <div class="window" style="width: 600px">
      <div class="title-bar">
        <div class="title-bar-text">Nouveau joueur</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
    
      <div class="window-body">
        <ul class="liste">
          <li>Fichier</li>
          <li>Contact</li>
          <li>Actions</li>
          <li>Outils</li>
          <li>Aide</li>
        </ul>
    
        <div class="form">
          <img class="corpo-logo" src="../assets/corpo-logo-fit.png" alt="logo corpo" />
    
          <div class="field-row">
            <label for="text21">Pseudo</label>
            <input id="text21" type="text" v-model="inputText" />
          </div>
    
          <div class="keyboard">
          
    
            <button
              v-for="key in keys"
              :key="key"
              @click="inputKeyboard(key)"
              :ref="setButtonRef(key)"
            >
              {{ key }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

.keyboard {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.keyboard button {
  padding: 5px 10px;
  font-size: 14px;
}

.window-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-row {
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

ul {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
}

.liste {
  padding-left: 0;
}

.corpo-logo{
  width: 40%;
}
.template{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.notification{
  background-color: #fffee0;
  border: solid 1px #000;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  font-size: small;
  font-weight: bold;
}
.notification>img{
  width: 32px;
}
</style>
