<script setup>
import { ref } from 'vue';

const lists = ref([]);

const fetchLists = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch("http://localhost:8080/rest/vocab/list", requestOptions);
    if (response.ok) {
      const data = await response.json();
      lists.value = data.map(item => ({
        title: item.title,
        vocabularyLanguage: item.vocabularyLanguage,
        translationLanguage: item.translationLanguage,
        vocabListId: item.vocabListId
      }));
    } else {
      console.log('An error occurred');
    }
  } catch (error) {
    console.log('error', error);
  }
};

const handleListChoice = () => {
  fetchLists();
};
</script>

<template>
  <div>
    <div class="d-flex flex-row align-items-center gap-3 mt-3 justify-content-center">
      <button type="button" class="btn btn-primary" @click="handleListChoice">choose from a List</button>
      <button type="button" class="btn btn-secondary">choose by category</button>
    </div>
    <div v-if="lists.length > 0">
      <h2 class="my-3">Here are all lists stored in the database:</h2>
      <div class="d-flex flex-wrap justify-content-center">
        <div v-for="(list, index) in lists" :key="index" class="card mt-3 me-3 mb-3">
          <div class="card-header">
            {{ list.title }}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ list.vocabularyLanguage }}</h5>
            <p class="card-text">{{ list.translationLanguage }}</p>
            <a href="#" class="btn btn-primary">{{ list.vocabListId }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
