<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Header from "../src/components/static/Header.vue"
  import Footer from "../src/components/static/Footer.vue"
</script>

<template>
  <div class="app-container">

    <Header/>

    <RouterView />

    <Footer/>

  </div>
</template>

<style>
  .app-container {
    background-color: rgb(242, 249, 221);
    padding: 50px;
  }
</style>
