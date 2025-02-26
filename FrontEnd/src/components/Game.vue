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

const handleSelectedAnswer = (answer: any) => {
  emit("selectedAnswer", answer);
};
</script>

<template>
  <div class="card-question">
    <div class="question">
      <div class="header-question">
        <p>Doléance</p>
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
    <div class="card-answer-left" v-show="joystickInput === 1" :class="{'visible': joystickInput === 1}">
      <Answer
        v-if="props.tuto && questionsTuto.length > props.compteurQuestions && questionsTuto[props.compteurQuestions]?.answers?.length > 0"
        :answer="questionsTuto[props.compteurQuestions].answers[0]"
        @selectedAnswer="handleSelectedAnswer"
      />
      <Answer
        v-else-if="localQuestions.length > props.compteurQuestions && localQuestions[props.compteurQuestions]?.answers?.length > 0"
        :answer="localQuestions[props.compteurQuestions].answers[0]"
        @selectedAnswer="handleSelectedAnswer"
      />
    </div>

    <div class="card-answer-right" v-show="joystickInput === 2" :class="{'visible': joystickInput === 2}">
      <Answer
        v-if="props.tuto && questionsTuto.length > props.compteurQuestions && questionsTuto[props.compteurQuestions]?.answers?.length > 1"
        :answer="questionsTuto[props.compteurQuestions].answers[1]"
        @selectedAnswer="handleSelectedAnswer"
      />
      <Answer
        v-else-if="localQuestions.length > props.compteurQuestions && localQuestions[props.compteurQuestions]?.answers?.length > 1"
        :answer="localQuestions[props.compteurQuestions].answers[1]"
        @selectedAnswer="handleSelectedAnswer"
      />
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

.cards-answer {
  display: flex;
  flex-direction: row;
}

.card-answer-left {
  visibility: hidden;
  position: relative;
  top: 290px;
}

.card-answer-right {
  visibility: hidden;
  position: relative;
  top: 290px;
}

.card-answer-left.visible {
  visibility: visible;
}

.card-answer-right.visible {
  visibility: visible;
}
</style>
