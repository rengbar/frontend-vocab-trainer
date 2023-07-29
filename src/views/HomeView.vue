<script setup>
import { inject, ref } from 'vue';
import CreateButton from '../components/CreateButton.vue';

const store = inject('store');
const showCreateOptions = ref(false);

const handleCreateClick = () => {
  showCreateOptions.value = true;
};

const handleJoinClick = async () => {
  const gameId = window.prompt("Please enter the game ID:");
  if (gameId) {
    await joinGame(gameId, store.userId);
  }
};

const joinGame = async (gameId, userId) => {
  const requestOptions = {
    method: 'PATCH',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/game/join/${gameId}?user_id=${userId}`, requestOptions);
    if (response.ok) {
      console.log('Successfully joined the game',response.json());
    } else {
      console.log('An error occurred');
    }
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<template>
  <main v-if="store.username" class="d-flex flex-column justify-content-start align-items-center text-center" style="height: 100vh; padding-top: 2rem;">
    <h1 class="mb-4">{{ store.username }}</h1>
    <h1 class="mb-4">{{ store.userId }}</h1>
    <div class="d-flex gap-3">
      <button type="button" class="btn btn-primary" @click="handleCreateClick">Create</button>
      <button type="button" class="btn btn-success" @click="handleJoinClick">Join</button>
    </div>
    <CreateButton v-if="showCreateOptions" />
  </main>
</template>


<style scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
