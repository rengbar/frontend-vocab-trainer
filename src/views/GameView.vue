<template>
  <div class="game-view">
    <h1 class="text-center">{{ title }}</h1>
    <div class="question">
      {{ question }}
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-primary" v-for="(answer, index) in answers" :key="index" :class="{ 'btn-success': answer.correct && answer.clicked, 'btn-danger': !answer.correct && answer.clicked }" @click="checkAnswer(index)">{{ answer.name }}</button>
    </div>
    <div class="feedback" v-if="feedback">{{ feedback }}</div>
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const checkAnswer = async (index) => {
  answers.value[index].clicked = true;
  if (answers.value[index].correct) {
    feedback.value = "The answer was correct!";
  } else {
    feedback.value = "The answer was incorrect!";
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
    currentRound.value++;
    loadRound();
  }, 5000);
};

const loadRound = () => {
  if (currentRound.value >= gameData.value.length) {
    // Alle Runden sind abgeschlossen, Sie können hier eine Meldung anzeigen oder etwas anderes tun
    return;
  }

  const roundData = gameData.value[currentRound.value];

  // Ändern Sie den Titel
  title.value = "Choose the correct answer by clicking the button!";

  // Setzen Sie die Frage
  const name = roundData.question.vocabulary.name;
  question.value = `Which one is the right translation for ${name}?`;

  // Leeren Sie die vorherigen Antworten
  answers.value = [];

  // Fügen Sie die Antwortmöglichkeiten hinzu
  roundData.question.answers.forEach(answer => {
    answers.value.push({ name: answer.name, correct: false, clicked: false, translationId: answer.translationId });
  });

  // Fügen Sie die korrekte Antwort hinzu
  const correctAnswer = roundData.question.vocabulary.translations[0].synonyms[0];
  answers.value.push({ name: correctAnswer.name, correct: true, clicked: false, translationId: correctAnswer.translationId });

  // Mischen Sie die Antworten
  shuffleArray(answers.value);
};

const fetchGameData = async () => {
  const gameId = store.gameId;

  const response = await fetch(`http://localhost:8080/rest/game/start/${gameId}`);
  if (response.ok) {
    gameData.value = await response.json();
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
  margin-top: 20px; /* Abstand zur Navbar */
}

.question {
  text-align: center; /* Zentriert den Text */
  font-size: 1.5em; /* Erhöht die Schriftgröße */
  margin-top: 20px; /* Abstand zur Überschrift */
}

.feedback {
  text-align: center; /* Zentriert den Text */
  margin-top: 20px; /* Abstand zur Antwortliste */
}
</style>
