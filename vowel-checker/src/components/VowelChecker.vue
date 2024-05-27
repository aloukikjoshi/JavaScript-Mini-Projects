<template>
  <div class="min-h-screen bg-gradient-to-r from-green-300 to-blue-500 flex items-center justify-center p-4">
    <div class="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
      <h1 class="text-4xl font-bold mb-6 text-center text-gray-800">Vowel Checker</h1>
      <textarea v-model="text" class="w-full h-40 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your text here"></textarea>
      <button @click="checkVowels" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">Check Vowels</button>
      <p class="mt-6 text-xl font-bold text-center text-gray-700">{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      result: 'Result will be displayed here',
    };
  },
  methods: {
    checkVowels() {
      const vowelCount = this.text
          .toLowerCase()
          .split('')
          .filter(char => 'aeiou'.includes(char)).length;
      this.result = `Total Vowels: ${vowelCount}`;
    },
  },
};
</script>

<style scoped>
</style>
