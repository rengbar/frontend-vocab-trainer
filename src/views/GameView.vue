<template>
  <div v-if="!gameEnded" class="game-view">
    <h1 class="text-center">{{ title }}</h1>
    <div class="question">
      {{ question }}
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-primary" v-for="(answer, index) in answers" :key="index" :class="{ 'btn-success': answer.correct && answer.clicked, 'btn-danger': !answer.correct && answer.clicked }" @click="checkAnswer(index)">{{ answer.name }}</button>
    </div>
    <div class="feedback" v-if="feedback">{{ feedback }}</div>
  </div>
  <div v-else>
    <h1>Test</h1>
    <p>Player 1 - Correct answers: {{ player_1_correct }}, Incorrect answers: {{ player_1_incorrect }}</p>
    <p>Player 2 - Correct answers: {{ player_2_correct }}, Incorrect answers: {{ player_2_incorrect }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from '../store.js';

const store = useStore();
const gameData = ref(null);
const title = ref("Game View");
const question = ref("");
const answers = ref([]);
const feedback = ref("");
const currentRound = ref(0);
const gameEnded = ref(false);
const player_1_correct = ref(0);
const player_1_incorrect = ref(0);
const player_2_correct = ref(0);
const player_2_incorrect = ref(0);
const answerSelected = ref(false);


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const checkAnswer = async (index) => {
  // If an answer has already been selected, return early
  if (answerSelected.value) {
    return;
  }

  // Set answerSelected to true
  answerSelected.value = true;

  answers.value[index].clicked = true;
  if (answers.value[index].correct) {
    feedback.value = "The answer was correct!";
  } else {
    feedback.value = "The answer was incorrect!";
    const correctAnswerIndex = answers.value.findIndex(answer => answer.correct);
    if (correctAnswerIndex !== -1) {
      answers.value[correctAnswerIndex].clicked = true;
    }
  }

  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  await fetch(`http://localhost:8080/rest/game/setAnswer/${gameData.value[currentRound.value].gameRoundId}?translation_id=${answers.value[index].translationId}&user_id=${store.userId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  setTimeout(() => {
    feedback.value = "";
    answers.value.forEach(answer => answer.clicked = false);
    currentRound.value++;
    if (currentRound.value === gameData.value.length) {
      gameEnded.value = true;
      endGame();
    } else {
      loadRound();
    }
    // Reset answerSelected to false for the next round
    answerSelected.value = false;
  }, 1500);
};

const endGame = async () => {
  const requestOptions = {
    method: 'PATCH',
    redirect: 'follow'
  };

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await fetch(`http://localhost:8080/rest/game/end/${store.gameId}?user_id=${store.userId}`, requestOptions);
    if (response.ok) {
      const result = await response.json();
      console.log(result);

      // Reset the counters
      player_1_correct.value = 0;
      player_1_incorrect.value = 0;
      player_2_correct.value = 0;
      player_2_incorrect.value = 0;

      // Iterate through each gameRound
      for (let gameRound of result.gameRounds) {
        // Check the correct answer for each player and increment the counters
        if (gameRound.player_1_correct) {
          player_1_correct.value++;
        } else {
          player_1_incorrect.value++;
        }

        if (gameRound.player_2_correct) {
          player_2_correct.value++;
        } else {
          player_2_incorrect.value++;
        }
      }

      break;
    } else {
      console.log('An error occurred, retrying...');
    }
  }
};

const loadRound = () => {
  if (currentRound.value >= gameData.value.length) {
    return;
  }

  const roundData = gameData.value[currentRound.value];
  title.value = "Choose the correct answer by clicking the button!";
  const name = roundData.question.vocabulary.name;
  question.value = `Which one is the right translation for "${name}"?`;
  answers.value = [];

  roundData.question.answers.forEach(answer => {
    answers.value.push({ name: answer.name, correct: false, clicked: false, translationId: answer.translationId });
  });

  const correctAnswer = roundData.question.vocabulary.translations[0].synonyms[0];
  answers.value.push({ name: correctAnswer.name, correct: true, clicked: false, translationId: correctAnswer.translationId });

  shuffleArray(answers.value);
};

const fetchGameData = async () => {
  const gameId = store.gameId;

  const response = await fetch(`http://localhost:8080/rest/game/start/${gameId}`);
  if (response.ok) {
    gameData.value = await response.json();
    console.log('Game data loaded successfully', gameData.value.length);
    loadRound();
  } else {
    console.log('An error occurred');
    if (window.confirm(`Der 2. Spieler soll das Spiel beitreten. Die gameId ist ${gameId}. Klicken Sie OK, um fortzufahren.`)) {
      fetchGameData();
    }
  }
};

onMounted(fetchGameData);
</script>

<style scoped>
.text-center {
  margin-top: 20px;
}

.question {
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 20px;
}

.feedback {
  text-align: center;
  margin-top: 20px;
}
</style>
