// CreateGameButton.vue
<script setup>
import { inject } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const store = inject('store');
const router = useRouter();

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
      const data = await response.json();
      store.gameId = data.gameId;
      console.log('Game created successfully', data);
      router.push({ name: 'game', params: { gameId: data.gameId } });
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
