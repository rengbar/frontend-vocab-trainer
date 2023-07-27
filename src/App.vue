<script setup>
import Navbar from './components/Navbar.vue'
import { provide } from 'vue';
import { store } from './store.js';

provide('store', store);

</script>

<template>
  <Navbar/>
  <router-view />
</template>


<style scoped>

</style>
