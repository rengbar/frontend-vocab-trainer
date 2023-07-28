<script setup>
import { inject } from 'vue';

const store = inject('store');

const props = defineProps({
  vocabListId: Number
});

const createGame = async () => {
  const requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/game/create/${props.vocabListId}?user_id=${store.userId}`, requestOptions);
    if (response.ok) {
      console.log('Game created successfully');
      console.log(response.json());
    } else {
      console.log('An error occurred');
    }
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<template>
  <a href="#" class="btn btn-primary" @click.prevent="createGame">{{ props.vocabListId }}</a>
</template>
