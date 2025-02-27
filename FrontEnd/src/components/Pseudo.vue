<script setup lang="ts">
import "xp.css/dist/XP.css";
import { defineProps, ref } from "vue";
import verifPseudo from "../functions/utils/verifPseudo";
import createUser from "../api/createUser";
import notifyPseudo from "../functions/utils/notifyPseudo";

const props = defineProps<{
  playing: number;
  currentUser: {id:number; username:string; score:number; reason: {reason:string}},
}>();

const emit = defineEmits(['updatePlaying', 'updateCurrentUser']);

const inputText = ref("");
const keys = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const addCharacter = (char: string) => {
  inputText.value += char;
};

const deleteCharacter = () => {
  inputText.value = inputText.value.slice(0, -1);
};

let propsUser = props.currentUser;

let notification = ref("");
let isNotifVisible = ref(false);

const enterPressed = async () => {
  if (!verifPseudo(inputText.value)) {
    notification.value = notifyPseudo(inputText.value);
    isNotifVisible.value = true;
  } else {
    const propsUserData = await createUser({username: inputText.value, score: 1, reason:{reason: "Fin"}})
    propsUser = await propsUserData.json()
    emit('updatePlaying', 1);
    emit('updateCurrentUser', propsUser);
  }
};
</script>

<template class="template">

  <div class="template">

    <div v-if="isNotifVisible" class="notification">
      <img src="../assets/security.png"/>
      <span>{{ notification }}</span>
    </div>
  
    <div class="window" style="width: 500px">
  
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
            <button v-for="key in keys" :key="key" @click="addCharacter(key)">
              {{ key }}
            </button>
            <button @click="deleteCharacter">Supprimer</button>
            <button @click="enterPressed">Entrer</button>
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

.field-row{
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
  font-weight: 700;
}

.notification>img{
  width: 32px;
}
</style>
