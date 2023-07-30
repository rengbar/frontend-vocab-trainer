<script setup>
import { inject, ref } from 'vue';
import CreateButton from '../components/CreateButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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
      const data = await response.json();
      console.log('Successfully joined the game', data);
      store.gameId = data.gameId;
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
  <main v-if="store.username" class="d-flex flex-column justify-content-start align-items-center text-center" style="height: 100vh; padding-top: 4rem;">
    <div class="username-display text-start w-100 px-5 mb-4">
      <h1>Username: {{ store.username }}</h1>
    </div>
    <div class="d-flex gap-3 w-100 justify-content-center">
      <button type="button" class="btn btn-primary btn-lg btn-large-text" @click="handleCreateClick">Create</button>
      <button type="button" class="btn btn-success btn-lg btn-large-text" @click="handleJoinClick">Join</button>
    </div>
    <CreateButton v-if="showCreateOptions" />
  </main>
</template>



<style scoped>
.username-display h1 {
  font-size: 1.5rem;
  margin-top: 0.0rem; /* kleinerer oberer Rand */
}

.btn-primary, .btn-success {
  background-color: #112D4E !important;
  border-color: #112D4E !important;
  color: #ffffff !important;
  width: 150px;
  text-align: center;
}

.btn-primary:hover, .btn-success:hover {
  background-color: #0a1d33 !important;
  border-color: #0a1d33 !important;
}

.btn-success {
  background-color: #DBE2EF !important;
  border-color: #DBE2EF !important;
  color: #000000 !important;
}

.btn-success:hover {
  background-color: #c0cfd9 !important;
  border-color: #c0cfd9 !important;
}

.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.btn-large-text {
  font-size: 1.75rem;
}
</style>
