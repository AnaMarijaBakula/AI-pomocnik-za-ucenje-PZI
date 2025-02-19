<template>
  <v-container fluid class="navbar">
    <v-row align="center" justify="space-between" class="navbar-row">
      <v-col cols="auto" class="logo-col">
        <img class="logo" src="@/assets/Logo.svg" alt="Logo" />
      </v-col>

      <!-- Gumbi za desktop s desne strane -->
      <v-row v-if="!isMobile" class="nav-links" justify="end">
        <v-col cols="auto">
          <router-link to="/" class="nav-item">Home</router-link>
        </v-col>
        <v-col cols="auto">
          <router-link to="/about-us" class="nav-item">About us</router-link>
        </v-col>
        <v-col cols="auto">
          <router-link to="/contact" class="nav-item">Contact</router-link>
        </v-col>

        <!-- Gumb za korisnike -->
        <v-col cols="auto" class="user-col">
          <nav-bar-button></nav-bar-button>
        </v-col>
      </v-row>

      <!-- Hamburger meni za mobilne uređaje -->
      <v-menu v-if="isMobile" offset-y v-model="drawer">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push('/')">Home</v-list-item>
          <v-list-item @click="$router.push('/about-us')">About us</v-list-item>
          <v-list-item @click="$router.push('/contact')">Contact</v-list-item>
          <v-col>
            <nav-bar-button></nav-bar-button>
          </v-col>
        </v-list>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import NavBarButton from "@/components/NavBarButton.vue";

// Provjera je li ekran manji od 768px
const isMobile = ref(window.innerWidth < 768);
const drawer = ref(false); // Varijabla za praćenje stanja hamburger menija
</script>

<style scoped>
/* Navigacijska traka */
.navbar {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px 20px; /* Povećan padding za bolju razmjenu */
  background-color: transparent;
  z-index: 1000;
  transition: padding 0.3s ease;
}

/* Stiliziranje loga */
.logo {
  width: 91px;
  height: 71px;
  transition: width 0.3s, height 0.3s;
}

/* Razmak između navigacijskih stavki na desktopu */
.nav-links {
  display: flex;
  align-items: center;
  gap: 24px; /* Smanjen razmak između stavki */
  transition: gap 0.3s ease;
}

/* Stiliziranje pojedinačnih navigacijskih stavki */
.nav-item {
  font-size: clamp(14px, 2.5vw, 16px);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #624f82;
  cursor: pointer;
  transition: font-size 0.3s ease, color 0.3s ease;
}

/* Hover efekt na navigacijskim stavkama */
.nav-item:hover {
  color: #3f51b5; /* Plava boja pri hoveru */
  text-decoration: underline;  /* Podcrtavanje teksta na hover */
}

/* Gumb za korisnike */
.user-col {
  margin-left: 16px; /* Razmak između gumba i drugih stavki */
}

/* Responsivni dizajn za mobilne uređaje */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;
  }

  .logo {
    width: 70px;
    height: 55px;
  }

  .nav-links {
    flex-direction: column;  /* Stavke u padajućem izborniku */
    gap: 20px;
    margin-top: 20px;
  }

  .nav-item {
    font-size: clamp(12px, 4vw, 14px);
  }
}

/* Vrlo mali ekran (mobitel u portret režimu) */
@media (max-width: 480px) {
  .navbar {
    padding: 10px 15px;
  }

  .nav-links {
    gap: 15px;
  }

  .logo {
    width: 60px;
    height: 50px;
  }

  .nav-item {
    font-size: clamp(10px, 5vw, 12px);
  }
}
</style>
