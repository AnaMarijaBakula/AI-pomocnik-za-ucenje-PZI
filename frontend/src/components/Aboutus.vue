<template>
  <v-container fluid class="about-us">
    <v-row align="center" justify="center">
      <!-- Sekcija za Uvod -->
      <v-col cols="12" class="intro-section">
        <h1 class="title">Kako dodati svoj projekt u aplikaciju?</h1>
        <p class="description">
          Naša aplikacija omogućava korisnicima da učitaju svoje projekte, bilo da se radi o kodu, web aplikacijama ili programima,
          te dobiju korisne savjete o tome kako optimizirati svoj kod i poboljšati performanse. Kroz našu platformu možete
          lako dobiti preporuke za bolje organiziranje koda i učinkovitije korištenje resursa.
        </p>
      </v-col>

      <!-- Sekcija za Proces dodavanja projekta -->
      <v-col cols="12" md="6" class="upload-section">
        <h2 class="section-title">Proces unosa projekta</h2>
        <v-row>
          <v-col cols="12" md="6" class="process-step">
            <h3>Korak 1: Odaberi svoj projekt</h3>
            <p>Prvo, odaberite projekt koji želite dodati u aplikaciju. Bilo da se radi o kodu, aplikaciji ili skripti, možete ga
              jednostavno uploadati putem naše intuitivne platforme.</p>
          </v-col>
          <v-col cols="12" md="6" class="process-step">
            <h3>Korak 2: Očitavanje koda</h3>
            <p>Nakon što ste odabrali projekt, naš sustav automatski analizira vaš kod i traži moguće načine za optimizaciju.
              Također se provodi provjera za greške i prijedloge za poboljšanja u kodu.</p>
          </v-col>
          <v-col cols="12" md="6" class="process-step">
            <h3>Korak 3: Savjeti za optimizaciju</h3>
            <p>Na temelju analize, aplikacija pruža specifične savjete o tome kako optimizirati kod, poboljšati performanse,
              reducirati duplikate i implementirati bolje prakse kodiranja.</p>
          </v-col>
          <v-col cols="12" md="6" class="process-step">
            <h3>Korak 4: Primjeni preporuke</h3>
            <p>Koristite naše preporuke kako biste unaprijedili svoj projekt. Nakon što poboljšate kod prema našim savjetima, možete
              ponovo uploadati novu verziju i dobiti dodatne preporuke.</p>
          </v-col>
        </v-row>
      </v-col>


    </v-row>
  </v-container>
</template>
<style scoped>
.about-us {
  background-image: url('@/assets/GetStartedBackground.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}


.title {
  font-size: 28px;
  font-weight: bold;
  color: #624f82;
  margin-bottom: 15px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #4E89FD;
  margin: 30px 0 15px;
}

.description, .tips-description {
  font-size: 16px;
  color: black;
  max-width: 800px;
  margin: 0 auto;
}

/* Naslovi */
.process-step h3, .tip-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: #4E89FD;
}

.process-step p, .tip-item p {
  font-size: 14px;
  color: black;
}

/* RESPONZIVNOST */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }
  .section-title {
    font-size: 20px;
  }
  .description, .tips-description {
    font-size: 14px;
  }

  /* Smanjenje okvira na manjim ekranima */
  .process-step, .tip-item {
    padding: 10px;
    font-size: 13px;
    border-radius: 8px;
  }
}
</style>
