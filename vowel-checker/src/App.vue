<template>
  <div id="app">
    <VowelChecker />
  </div>
</template>

<script>
import VowelChecker from './components/VowelChecker.vue';

export default {
  name: 'App',
  components: {
    VowelChecker,
  },
};
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
