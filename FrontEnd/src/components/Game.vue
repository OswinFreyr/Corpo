<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Answer from "./Answer.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  questions: { question: string; answers: any[];role: {link: string} }[];
  tuto: boolean;
  compteurQuestions:number;
}>();

const emit = defineEmits(["selectedAnswer"]);

const questionsTuto = ref<{ question: string; answers: any[]; role: { link: string } }[]>([]);


onMounted(async () => {
    const response = await fetch("../../public/questionsTuto.json");
    questionsTuto.value = await response.json();
    console.log("questionsTuto chargées :", questionsTuto.value);
});



console.log("questions dans game : ", props.questions);

const handleSelectedAnswer = (answer: any) => {
  emit("selectedAnswer", answer);
};
</script>

<template>
  <div class="card-question">
    <div>
      <p v-if="props.questions.length > 0">{{ props.questions[props.compteurQuestions].question }}</p>
      <p v-else>Chargement...</p>
    </div>
    <div class="card">
      <img src="https://picsum.photos/id/237/200/300" v-if="tuto" />
      <img :src="props.questions[props.compteurQuestions].role.link" v-else />

    </div>
  </div>

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

</template>

<style scoped>
.card-question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  width: 300px;
  height: auto;
}
</style>
