<template>
  <div class="Users">
    <!-- Gumb "Users" koji aktivira padajući izbornik za "Sign in" i "Log out" -->
    <v-menu v-model="drawer" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn text v-bind="props" class="users-btn">Users</v-btn>
      </template>
      <v-list class="dropdown-list">
        <v-list-item @click="$router.push('/signin')" class="menu-item">Sign in</v-list-item>
        <v-list-item @click="$router.push('/')" class="menu-item">Log out</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Provjera je li ekran manji od 768px
const isMobile = ref(window.innerWidth < 768);
const drawer = ref(false); // Varijabla za praćenje stanja hamburger menija
</script>

<style scoped>
/* Gumb "Users" */
.users-btn {
  color: white; /* Bijela boja teksta */
  background-color: #624f82; /* Ljubičasta boja gumba */
  font-size: 16px; /* Veličina fonta */
  font-weight: 400; /* Normalna debljina fonta */
  font-family: 'DM Sans', sans-serif; /* Font DM Sans */
  text-transform: none; /* Tekst ostaje malim slovima */
  border-radius: 25px; /* Zaobljeni kutovi gumba */
  padding: 8px 20px; /* Oko 8px sa svih strana */
  transition: background-color 0.3s ease; /* Glatka promjena boje na hover */
}

.users-btn:hover {
  background-color: #4b2a72; /* Tamnija ljubičasta boja na hover */
}

/* Stil za padajući izbornik */
.dropdown-list {
  padding: 0;
  margin: 0;
  border-radius: 5px; /* Zaobljeni kutovi za izbornik */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Lagana sjena ispod izbornika */
}

/* Pojedine stavke u padajućem izborniku */
.menu-item {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: #624f82; /* Ljubičasta boja za tekst u izborniku */
  cursor: pointer;
  padding: 10px 20px; /* Dodan prostor oko stavki */
}

.menu-item:hover {
  color: #0000FF; /* Plava boja na hover */
  background-color: #f0f0f0;
}

/* Pomicanje gumba na desnu stranu ekrana */
.Users {
  display: flex;
  justify-content: flex-end; /* Pomakni sve prema desnoj strani */
  padding: 10px 20px;
}
</style>
