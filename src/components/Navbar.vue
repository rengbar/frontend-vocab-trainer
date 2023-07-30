<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand nav-link active" aria-current="page">VocabTrainer App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/about" class="nav-link" aria-current="page">About</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="searchUser">
          <input class="form-control me-2" :class="{ 'input-glow': username.length === 0 }" type="search" placeholder="insert username" aria-label="Search" v-model="username">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <!-- Modal for searchUser -->
  <div class="modal fade" id="searchUserModal" tabindex="-1" aria-labelledby="searchUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="searchUserModalLabel">Welcome to the game</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Welcome back {{ username }}!<br>Have fun playing the game
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for createUser -->
  <div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createUserModalLabel">Welcome to the game</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Welcome {{ username }}!<br>We created an account for you
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { inject } from 'vue';

const store = inject('store');

let username = ref('');

onMounted(() => {
  window.searchUserModal = new bootstrap.Modal(document.getElementById('searchUserModal'), {keyboard: false});
  window.createUserModal = new bootstrap.Modal(document.getElementById('createUserModal'), {keyboard: false});
});

const searchUser = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/user/username/${username.value}`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      store.username = username.value;
      store.userId = data.userId;
      window.searchUserModal.show();
    } else if (response.status === 404) {
      await createUser();
    } else {
      console.log('An error occurred');
    }
  } catch (error) {
    console.log('error', error);
  }
};

const createUser = async () => {
  const requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/user/username/${username.value}`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      store.username = username.value;
      store.userId = data.userId;
      window.createUserModal.show();
    } else {
      alert('User could not be created');
    }
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style scoped>
.input-glow {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 80px #009688, 0 0 160px #009688, 0 0 240px #009688, 0 0 320px #009688;
  }

  50% {
    box-shadow: 0 0 160px #009688, 0 0 240px #009688, 0 0 320px #009688, 0 0 400px #009688;
  }

  100% {
    box-shadow: 0 0 80px #009688, 0 0 160px #009688, 0 0 240px #009688, 0 0 320px #009688;
  }
}
</style>




