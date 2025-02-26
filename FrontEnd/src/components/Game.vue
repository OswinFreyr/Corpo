<script setup lang="ts">
import { defineProps, defineEmits, computed, onMounted, watch } from "vue";
import Answer from "./Answer.vue";
import { ref } from 'vue';

const props = defineProps<{
  questions: { question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[];
  tuto: boolean;
  compteurQuestions: number;
}>();

const emit = defineEmits(["selectedAnswer"]);

const questionsTuto = ref<{ question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[]>([]);

const localQuestions = computed(() => {
  return props.tuto ? questionsTuto.value : props.questions;
});

onMounted(async () => {
  const response = await fetch("../../public/questionsTuto.json");
  questionsTuto.value = await response.json();
});

let joystickInput = ref(0);

const switchAnswer = () => {
  joystickInput.value = joystickInput.value === 1 ? 2 : 1;
};

const handleSelectedAnswer = (answer: any) => {
  emit("selectedAnswer", answer);
};
</script>

<template>
  <div class="card-question">
    <div class="question">
      <div class="header-question">
        <p>Doléance</p>
        <span @click="switchAnswer"><></span>
        <p>x</p>
      </div>
      <p v-if="localQuestions.length > 0">{{ localQuestions[props.compteurQuestions].question }}</p>
      <p v-else>Chargement...</p>
    </div>
    <div class="card">
      <img src="https://picsum.photos/id/237/200/300" v-if="props.tuto" />
      <img :src="localQuestions[props.compteurQuestions].role.link" v-else />
    </div>
  </div>

  <div class="cards-answer">
    <div v-if="joystickInput !== 0"  class="answers-wrapper" :style="{ transform: `translateX(${joystickInput === 1 ? '0%' : '-100%'})` }">
      <div class="card-answer">
        <Answer
          v-if="tuto && questionsTuto.length > compteurQuestions && questionsTuto[compteurQuestions]?.answers?.length > 0"
          :answer="questionsTuto[compteurQuestions].answers[0]"
          @selectedAnswer="handleSelectedAnswer"
        />
        <Answer
          v-else-if="props.questions.length > compteurQuestions && props.questions[compteurQuestions]?.answers?.length > 0"
          :answer="props.questions[compteurQuestions].answers[0]"
          @selectedAnswer="handleSelectedAnswer"
        />
      </div>

      <div class="card-answer">
        <Answer
          v-if="tuto && questionsTuto.length > compteurQuestions && questionsTuto[compteurQuestions]?.answers?.length > 1"
          :answer="questionsTuto[compteurQuestions].answers[1]"
          @selectedAnswer="handleSelectedAnswer"
        />
        <Answer
          v-else-if="props.questions.length > compteurQuestions && props.questions[compteurQuestions]?.answers?.length > 1"
          :answer="props.questions[compteurQuestions].answers[1]"
          @selectedAnswer="handleSelectedAnswer"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  gap: 20px;
}

@keyframes floatAnimation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

.question {
  background-color: #fffee0;
  border: solid 1px #000;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);

  animation: floatAnimation 4s ease-in-out infinite;
}

.question::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #000000;
}

.question::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 22px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fffbe3;
}

.header-question {
  display: flex;
  justify-content: space-between;
}

.question > p {
  font-weight: 700;
  font-size: medium;
}

img {
  width: 300px;
  height: auto;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  gap: 20px;
}

.question {
  background-color: #fffee0;
  border: solid 1px #000;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  animation: floatAnimation 4s ease-in-out infinite;
}

.header-question {
  display: flex;
  justify-content: space-between;
}

.question > p {
  font-weight: 700;
  font-size: medium;
}

img {
  width: 300px;
  height: auto;
}

.cards-answer {
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  position: relative;
}

.answers-wrapper {
  display: flex;
  width: 200%;
  transition: transform 0.5s ease-in-out;
}

.card-answer {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}

.cards-answer {
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  position: relative;
  top: -50px;
}

.answers-wrapper {
  display: flex;
  width: 200%;
  transition: transform 0.5s ease-in-out;
}

.card-answer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}

.answer-selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  background: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.empty-answer-box {
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #555;
  padding: 10px;
}
</style>
