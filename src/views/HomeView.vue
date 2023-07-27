<script setup>
import { inject } from 'vue';

const store = inject('store');
</script>

<template>
  <main>
    <h1>{{ store.username }}</h1>
  </main>
</template>



