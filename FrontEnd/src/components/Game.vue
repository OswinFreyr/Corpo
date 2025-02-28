<script setup lang="ts">
import { defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from "vue";
import Answer from "./Answer.vue";
import { ref } from 'vue';
import { bus } from "../scripts/eventBus.js"
import type { List } from "postcss/lib/list";

const answerRef1 = ref(null);
const answerRef2 = ref(null);
const answerRef3 = ref(null);
const answerRef4 = ref(null);

const props = defineProps<{
  questions: { question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[];
  tuto: boolean;
  compteurQuestions: number;
}>();

const emit = defineEmits(["selectedAnswer"]);

const questionsTuto = ref<{ question: string; answers: any[]; productivity: number; wellbeing: number; treasury: number; environment: number; role: { link: string } }[]>([]);

const localQuestions: any = computed(() => {
  return props.tuto ? questionsTuto.value : props.questions;
});

const triggerAction = (input: number, buttonOrAxis: string, stringAction?: string) => {
    if (buttonOrAxis == "button"){
      if (input == 1){
        handleSelectedAnswer(localQuestions.value[props.compteurQuestions].answers[joystickInput.value -1])
      }
    } else if (buttonOrAxis == "axis" && stringAction !== undefined){
      let action: number = parseFloat(stringAction);
      if (input == 0){
        if (action == 1.00){
          switchAnswer(2)
        } else if (action == -1.00){
          switchAnswer(1)
        }
      } 
    }
};


const handleGamepadInput = (event: { button: number; axis: number; action: string }) => {
    if (event.button !== null && event.action == "pressed") {
        triggerAction(event.button, "button");
    } else if (event.axis !== null){
      triggerAction(event.axis, "axis", event.action)
    }
};


onMounted(async () => {
  const response = await fetch("../../public/questionsTuto.json");
  questionsTuto.value = await response.json();
  bus.on('gamepadInput', handleGamepadInput);
});

onUnmounted(() => {
  bus.off('gamepadInput', handleGamepadInput);
});

let joystickInput = ref(0);

const switchAnswer = (value: number) => {
  joystickInput.value = value;
  let cardsLeft: HTMLCollectionOf<Element> = document.getElementsByClassName('card-answer-left');
  let cardsRight: HTMLCollectionOf<Element> = document.getElementsByClassName('card-answer-right');
  if (value == 1){
    if (props.tuto){
      answerRef1.value?.$refs.buttonRef.focus();
    } else {
      answerRef3.value?.$refs.buttonRef.focus();
    }
    for (let card of Array.from(cardsLeft)){
      (card as HTMLElement).classList= 'card-answer card-answer-left selected-card';
    }
    for (let card of Array.from(cardsRight)){
      (card as HTMLElement).classList = 'card-answer card-answer-right not-selected-card';
    }
  } else if (value == 2) {
    if (props.tuto){
      answerRef2.value?.$refs.buttonRef.focus();
    } else {
      answerRef4.value?.$refs.buttonRef.focus();
    }
    for (let card of Array.from(cardsLeft)){
      (card as HTMLElement).classList = 'card-answer card-answer-left not-selected-card';
    }
    for (let card of Array.from(cardsRight)){
      (card as HTMLElement).classList = 'card-answer card-answer-right selected-card';
    }
  }
};

const handleSelectedAnswer = (answer: any) => {
  emit("selectedAnswer", answer);
  joystickInput.value = 0;
  let cardsLeft: HTMLCollectionOf<Element> = document.getElementsByClassName('card-answer-left');
  let cardsRight: HTMLCollectionOf<Element> = document.getElementsByClassName('card-answer-right');
  for (let card of Array.from(cardsRight)){
    (card as HTMLElement).classList = 'card-answer card-answer-right not-selected-card';
  }
  for (let card of Array.from(cardsLeft)){
    (card as HTMLElement).classList = 'card-answer card-answer-left not-selected-card';
  }
};


const displayedText = ref('');
const currentQuestion = computed(() =>
  localQuestions.value.length > 0 ? localQuestions.value[props.compteurQuestions].question : ''
);
const typeText = (text: string) => {
  displayedText.value = '';
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      displayedText.value += text[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 10); 
};

watch(currentQuestion, (newQuestion) => {
  if (newQuestion) {
    typeText(newQuestion);
  }
});

</script>

<template>
  <div class="card-question">
    <div class="question">
      <div class="header-question">
        <img src="/src/assets/mail.png" alt="">
        <p>Doléance</p>
        <p>x</p>
      </div>
      <p v-if="localQuestions.length > 0">{{ displayedText }}</p>
      <p v-else>Chargement...</p>
    </div>
    <div class="card">
      <img class="people-image" src="/src/assets/rmbg/laetitia.png" v-if="props.tuto" />
      <img class="people-image" :src="localQuestions[props.compteurQuestions].role.link" v-else />
    </div>
  </div>

  <div class="rowing">
    <div class="cards-answer">


      <div class="card-answer card-answer-left not-selected-card">
          <Answer
            v-if="tuto && questionsTuto.length > compteurQuestions && questionsTuto[compteurQuestions]?.answers?.length > 0"
            :answer="questionsTuto[compteurQuestions].answers[0]"
            @selectedAnswer="handleSelectedAnswer"
            ref="answerRef1"
            questionNumber="1"
          />
          <Answer
            v-else-if="props.questions.length > compteurQuestions && props.questions[compteurQuestions]?.answers?.length > 0"
            :answer="props.questions[compteurQuestions].answers[0]"
            @selectedAnswer="handleSelectedAnswer"
            ref="answerRef3"
            questionNumber="1"
          />
        </div>

      <div class="choose-answer">
        <img src="../assets/clippy.gif" alt="Clippy" class="clippy">
        <img src="/src/assets/left.png" class="arrow left-arrow" @click="switchAnswer(1)"></img>
        <span>Choisissez une réponse</span>
        <img src="/src/assets/right.png" class="arrow right-arrow" @click="switchAnswer(2)"></img>
      </div>

      <div class="card-answer card-answer-right not-selected-card">
          <Answer
            v-if="tuto && questionsTuto.length > compteurQuestions && questionsTuto[compteurQuestions]?.answers?.length > 1"
            :answer="questionsTuto[compteurQuestions].answers[1]"
            @selectedAnswer="handleSelectedAnswer"
            ref="answerRef2"
            questionNumber="2"
          />
          <Answer
            v-else-if="props.questions.length > compteurQuestions && props.questions[compteurQuestions]?.answers?.length > 1"
            :answer="props.questions[compteurQuestions].answers[1]"
            @selectedAnswer="handleSelectedAnswer"
            ref="answerRef4"
            questionNumber="2"
          />
        </div>
  
      <!-- <div v-show="joystickInput !== 0"  class="answers-wrapper " :style="{ transform: `translateX(${joystickInput === 1 ? '0%' : '-100%'})` }">
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
      </div> -->
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
  /* gap: 10px; */
}

@keyframes floatAnimation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

.question {
  background-color: #fffee0;
  border: solid 1px #000;
  /* padding: 10px; */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);

  animation: floatAnimation 4s ease-in-out infinite;

  min-height: 150px; 
  max-width: 100%;
  /* overflow: hidden; */
  /* padding-bottom: 15px; */
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
  /* gap: 10px; */
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
  max-width: 500px;
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

.card-answer:hover{
  filter: grayscale(0%);
  transition: 0.3s;

}

.cards-answer {
  position:sticky;
  bottom: 20px;
  overflow: visible;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.answers-wrapper {
  display: flex;
  width: 200%;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.card-answer {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  height: 100%; 
}

.not-selected-card {
  filter: grayscale(100%);
}

.selected-card {
  animation: floatAnimation 4s ease-in-out infinite;
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

.people-image{
  width: 500px;
  height: auto;
}

.rowing {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-60px);
  /* width: 100%; */
}
.arrow {
  /* font-size: 24px; */
  cursor: pointer;
  width: 32px;
  /* padding: 10px; */
}

/* @keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideInFromBottom 0.5s ease-out forwards;
} */

.header-question>img{
  width: 32px;
}

.choose-answer{
  display: flex;
  align-items: center;
  min-width: 50%;
  text-align: center;
}

.choose-answer {
  min-width: 50%;
  background-color: #f9f2b8;
  box-shadow: 1px 2.5px 1px #c7c292;
  position: relative;
  font-size: medium;
  font-family: 'Tahoma';
  background-image: repeating-linear-gradient(
    to bottom, 
    transparent 0px, 
    transparent 18px,  
    rgba(128, 128, 128, 0.345) 19px, 
    transparent 20px   
  );
  background-size: 100% 20px;
}

.left-arrow {
  padding-left: 1rem;
  min-width: 17%;
}

.right-arrow {
  padding-right: 1rem;
  min-width: 17%;
}

.choose-answer>span {
  margin-left: 1rem;
  margin-right: 1rem;
}

.clippy {
  position: absolute;
  top: -25px;
  left: -25px;
  width: 50px; 
  transform: rotate(-15deg);
  z-index: 100;
}
</style>
