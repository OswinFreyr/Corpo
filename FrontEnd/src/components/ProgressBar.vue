<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: number;
}>();

const progressWidth = computed(() => `${props.value}%`);

const progressGradient = computed(() => {
  if (props.value <= 10 || props.value >= 90) {
    return "linear-gradient(to bottom, #ff8080, #ff4d4d)"; // rouge
  }
  if ((props.value <= 30 && props.value > 10) || (props.value >= 70 && props.value < 90)) {
    return "linear-gradient(to bottom, #ffdd55, #ffcc00)"; // jaune
  }
  return "linear-gradient(to bottom, #76e275, #42d845)"; // vert
});
</script>

<template>
  <div class="all-bar">
    <div class="xp-progress-bar">
      <div
      class="xp-progress-fill"
      :style="{ width: progressWidth, '--progress-gradient': progressGradient }"
      ></div>
    </div>
    <p class="valeur">{{ value }}%</p>
  </div>
</template>

<style scoped>
.all-bar{
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}

.xp-progress-bar {
  width: 200px;
  height: 14px;
  padding: 1px;
  background: #fff;
  border: 1px solid #000000;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.xp-progress-fill {
  height: 100%;
  border-radius: 2px;
  background-image: 
    repeating-linear-gradient(
      to right,
      rgba(255, 255, 255, 0.6) 0px,
      #fff 2px, 
      transparent 5px,
      transparent 15px
    ), 
    var(--progress-gradient); 
}

.valeur {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Tahoma;
  font-weight: bold;
  /* height: 14px;
  width: 40px;
  background: #fff;
  border: 1px solid #000000;
  border-radius: 4px;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.2); */
}

</style>
