<script setup>
import { ref } from 'vue';
import { inject } from 'vue';

const store = inject('store');

const username = ref('');

const searchUser = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`http://localhost:8080/rest/user/username/${username.value}`, requestOptions);

    if (response.ok) {
      store.username = username.value;
      alert('User found');
    } else if (response.status === 404) {
      createUser();
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
      store.username = username.value;
      alert('User created');
    } else {
      alert('User could not be created');
    }
  } catch (error) {
    console.log('error', error);
  }
};
</script>

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
          <input class="form-control me-2" type="search" placeholder="insert username" aria-label="Search" v-model="username">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
