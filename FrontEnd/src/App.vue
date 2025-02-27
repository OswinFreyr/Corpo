<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Header from "../src/components/static/Header.vue"
  import Footer from "../src/components/static/Footer.vue"
</script>

<template>
  <div class="app-container">
    
    <Header/>
    <audio autoplay loop>
      <source src="/public/euromir.mp3" type="audio/mpeg">
      Votre navigateur ne supporte pas l'élément audio.
    </audio>

    <RouterView />

    <Footer/>

  </div>
</template>

<style>

  html, body {
  margin: 0;
  padding: 0;
  background-color: rgb(242, 249, 221); 
}

#app {
  all: unset; 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}


</style>
