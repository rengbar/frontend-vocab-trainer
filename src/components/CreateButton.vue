<script setup>
import { ref } from 'vue';
import CreateGameButton from './CreateGameButton.vue';

const lists = ref([]);
const categoryLists = ref([]);

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

const fetchListsByCategory = async () => {
  let categoryName = window.prompt("Please enter the category name");
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/vocab/list/category?category_name=${categoryName}`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      categoryLists.value = data.map(item => ({
        title: item.title,
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

const handleCategoryChoice = () => {
  fetchListsByCategory();
};
</script>

<template>
  <div>
    <div class="d-flex flex-row align-items-center gap-3 mt-3 justify-content-center">
      <button type="button" class="btn btn-primary" @click="handleListChoice">choose from a List</button>
      <button type="button" class="btn btn-secondary" @click="handleCategoryChoice">choose by category</button>
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
            <CreateGameButton :vocabListId="list.vocabListId" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="categoryLists.length > 0">
      <h2 class="my-3">Here are all lists for the chosen category:</h2>
      <div class="d-flex flex-wrap justify-content-center">
        <div v-for="(list, index) in categoryLists" :key="index" class="card mt-3 me-3 mb-3">
          <div class="card-header">
            {{ list.title }}
          </div>
          <div class="card-body">
            <CreateGameButton :vocabListId="list.vocabListId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary, .btn-secondary {
  background-color: #3F72AF !important;
  border-color: #3F72AF !important;
  color: #ffffff !important;
}

.btn-primary:hover, .btn-secondary:hover {
  background-color: #264a73 !important;
  border-color: #264a73 !important;
}
 .card {
   min-width: 18rem;
   max-width: 18rem;
 }

 .my-3 {
   margin-top: 3rem !important;
 }

</style>

