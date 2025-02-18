<template>
  <v-container fluid class="navbar">
    <v-row align="center" justify="space-between" class="navbar-row">
      <v-col cols="auto" class="logo-col">
        <img class="logo" src="@/assets/Logo.svg" alt="Logo" />
      </v-col>

      <v-col cols="auto" class="nav-links-col">
        <v-row align="center" justify="center" class="nav-links">
          <v-col v-for="item in navItems" :key="item.name" cols="auto" class="nav-item-col">
            <!-- Koristi router-link za navigaciju -->
            <router-link :to="item.link" class="nav-item">{{ item.name }}</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Lista stavki u navigaciji
const navItems = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact", link: "/contact" }
];
</script>

<style scoped>
/* Navigacijska traka */
.navbar {
  width: 100%;
  height: auto;
  position: fixed; /* Stavite navbar fiksno na vrh stranice */
  top: 0;
  left: 0;
  padding: 8px 98px; /* Unutrašnji razmaci */
  background-color: transparent; /* Transparentna pozadina */
  z-index: 1000; /* Prikazuje navbar iznad drugih elemenata */
  transition: padding 0.3s ease;  /* Tranzicija pri promjeni paddinga */
}

/* Stiliziranje loga */
.logo {
  width: 91px;
  height: 71px;
  transition: width 0.3s, height 0.3s; /*tranzicija pri promjeni velićine loga */
}

/* Razmak između navigacijskih stavki */
.nav-links {
  display: flex;
  align-items: center;  /* Poravnavanje elemenata po vertikali */
  gap: 48px;  /* Razmak između stavki */
  transition: gap 0.3s ease;  /* tranzicija pri promjeni razmaka između stavki */
}

/* Stiliziranje pojedinačnih navigacijskih stavki */
.nav-item {
  font-size: clamp(14px, 2.5vw, 16px);  /* Promjena fonta na temelju veličine ekrana */
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #624f82;  /* Boja teksta */
  cursor: pointer;  /* Pokazivač se mijenja na ruku */
  transition: font-size 0.3s ease;  /* Tranzicija pri promjeni veličine fonta */
}

/* Hover efekt na navigacijskim stavkama */
.nav-item:hover {
  text-decoration: underline;  /* Podcrtavanje teksta na hover */
}

/* Stiliziranje dugmeta */
.nav-button {
  flex-shrink: 0;  /* Dugme ne smanjuje veličinu */
}

/* Responsivni dizajn za mobilne uređaje */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;  /* Prebacivanje u vertikalni raspored */
    align-items: flex-start;  /* Poravnavanje sa početkom */
    padding: 16px 20px;  /* Povećanje paddinga za manji ekran */
  }

  .logo {
    width: 70px;
    height: 55px;  /* Manja veličina loga na manjim ekranima */
  }

  .nav-links {
    flex-direction: row;  /* Stavke ostaju u horizontalnom rasporedu */
    gap: 20px;
    margin-top: 20px;  /* Razmak od vrha */
  }

  .nav-item {
    font-size: clamp(12px, 4vw, 14px);  /* Smanjeni font za mobilne uređaje */
  }
}

/* Vrlo mali ekran (mobitel u portret režimu) */
@media (max-width: 480px) {
  .navbar {
    padding: 10px 15px;  /* Manji padding za još manji ekran */
  }

  .nav-links {
    gap: 15px;  /* Manji razmak između stavki */
  }

  .logo {
    width: 60px;
    height: 50px;  /* Smanjeni logo na vrlo malim ekranima */
  }

  .nav-item {
    font-size: clamp(10px, 5vw, 12px);  /* Dodatno smanjen font za izuzetno male ekrane */
  }
}
</style>
