<script setup lang="ts">
import "xp.css/dist/XP.css";
import { ref } from "vue";
import verifPseudo from "../functions/utils/verifPseudo";

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

const enterPressed = () => {
  if (verifPseudo(inputText.value)) {
    alert("Ce pseudo est interdit. Veuillez en choisir un autre.");
  } else {
    alert(`Saisie validée : ${inputText.value}`);
  }
};
</script>

<template>
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
      <ul>
        <li>Fichier</li>
        <li>Contact</li>
        <li>Actions</li>
        <li>Outils</li>
        <li>Aide</li>
      </ul>

      <div class="form">
        <h4 style="text-align: center;">LOGO CORPO</h4>
        <!-- <img src="" alt="logo corpo" /> -->

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
}
</style>
