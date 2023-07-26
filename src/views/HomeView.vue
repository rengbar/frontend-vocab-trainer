<script setup>
import { ref } from 'vue'

const vocabList = ref([])

const fetchVocabList = async () => {
  const response = await fetch('http://localhost:8080/rest/vocab/list')
  if (!response.ok) {
    console.error('HTTP-Error: ' + response.status)
    return
  }
  vocabList.value = await response.json()
}
</script>

<template>
  <main>
    <button type="button" class="btn btn-primary" @click="fetchVocabList">Primary</button>
    <div v-for="vocab in vocabList" :key="vocab.vocabListId" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ vocab.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ vocab.vocabularyLanguage }} - {{ vocab.translationLanguage }}</h6>
        <p class="card-text" v-for="word in vocab.vocabularies" :key="word.vocabularyId">
          {{ word.name }}: {{ word.translations[0].synonyms[0].name }}
        </p>
      </div>
    </div>
  </main>
</template>

