<script setup>
import AdviceArea from '../components/AdviceArea.vue'
</script>

<template>
  <main class="advicearea">
    <AdviceArea />
  </main>
</template>

<style scoped>
.advicearea {
  background-image: url('@/assets/GetStartedBackground.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
