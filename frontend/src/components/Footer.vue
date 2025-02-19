<template>
  <footer>
    <p>&copy; 2025 Electronic Shop | Ana-Marija Bakula i Sara Budimir</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: black;
  font-size: 14px;
  padding: 10px;
  display: flex;
  justify-content: flex-end; /* Poravnanje desno */
  align-items: center;
}
</style>
