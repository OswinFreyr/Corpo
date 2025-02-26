<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
let intervalId: number | null = null;

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit'});
}

onMounted(() => {
  updateTime(); 
  intervalId = setInterval(updateTime, 1000); 
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<template>

  <footer class="windows-xp-taskbar" style="padding: 0; margin: 0;">

    <div class="start-button">
      <div class="start-icon" style="padding: 0; margin: 0;"> 
        <img style="width: 16px; height: 16px; padding: 0; margin: 0; border-radius: 20px;" src="../../assets/logo-win-xp.png" alt="">
      </div>
      <span>Démarrer</span>
    </div>
    
    <div class="taskbar-separator"></div>
    
    <div class="quick-launch">
      <div class="quick-icon">
        <img style="width: 16px; height: 16px; margin-right: 5px;" src="../../assets/chat.png" alt="Corpo.exe">
      </div>
      <div class="quick-icon">
        <img style="width: 16px; height: 16px; margin-right: 5px;" src="../../assets/chat.png" alt="Corpo.exe">
      </div>
    </div>
    
    <div class="taskbar-separator"></div>
    
    <div class="taskbar-apps">
      <img style="width: 16px; height: 16px; margin-right: 5px;" src="../../assets/chat.png" alt="Corpo.exe">
      Corpo.exe
    </div>
    
    <div class="taskbar-clock">{{ currentTime }}</div>
  </footer>

</template>

<style>
.windows-xp-taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 30px;
  background: linear-gradient(to bottom, #2584DE, #1666CC);
  border-top: 1px solid #3A95FF;
  display: flex;
  align-items: center;
  font-family: 'Tahoma', sans-serif;
  font-size: 12px;
  color: white;
  z-index: 1000;
  padding: 0 4px;
  box-sizing: border-box;
  margin: 0;
}

.start-button {
  display: flex;
  align-items: center;
  padding: 15px 8px;
  height: 22px;
  margin-right: 5px;
  background: linear-gradient(to right, #43c356, #448549);
  border-radius: 0px 10px 10px 0px;
  border: 1px solid #225828;
  box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3) inset;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.start-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 4px;
  position: relative;
}

.taskbar-separator {
  width: 1px;
  height: 20px;
  margin: 0 5px;
  background: #0D4693;
  border-right: 1px solid #5BAAF7;
}

.quick-launch {
  display: flex;
  align-items: center;
}

.quick-icon {
  width: 16px;
  height: 16px;
  /* background-color: #FFFFFF; */
  border-radius: 2px;
  margin-right: 4px;
}

.taskbar-apps {
  height: 22px;
  padding: 0 8px;
  margin: 0 5px;
  background: linear-gradient(to bottom, #4E8AD4, #3478D7);
  border-radius: 2px;
  border: 1px solid #1F57AE;
  box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3) inset;
  display: flex;
  align-items: center;
}

.taskbar-clock {
  min-width: 70px;
  height: 22px;
  background-color: #1F61BE;
  border-left: 1px solid #0D4693;
  border-right: 1px solid #0D4693;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  margin-left: auto;
}



</style>