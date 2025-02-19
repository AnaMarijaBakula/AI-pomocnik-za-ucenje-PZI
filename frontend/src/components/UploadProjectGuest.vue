<template>
  <div class="uploud-project-guest">
  <v-container>
    <v-row justify="center">
      <v-col :cols="12" :md="10" :lg="6" :xl="4">
        <FrameCenter>
          <div class="main-content">
            <span class="title">Upload your project here</span>

            <!-- Prikazivanje statusa gosta (preostali projekti i odbrojavanje vremena) -->
            <div v-if="message" class="alert">{{ message }}</div>
            <div v-if="isGuest">
              <p>Preostali projekti: {{ projectsLeft }}</p>
              <p>Vrijeme do isteka: {{ remainingTime }}</p>
            </div>

            <div class="upload-file" @dragover.prevent @drop="handleDrop">
              <span class="text_1">Drag & Drop your project folder</span>
              <span class="text_2">OR</span>
              <span class="text_3" @click="triggerFileInput">Select Project Folder</span>

              <input
                type="file"
                id="fileInput"
                @change="handleFileSelect"
                multiple
                webkitdirectory
                style="display: none"
              />

              <ul v-if="files.length">
                <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
              </ul>
            </div>
              <button @click="uploadFilesToBackend">Upload Project</button>
          </div>
        </FrameCenter>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import FrameCenter from '@/components/FrameCenter.vue';

const files = ref([]); // Reaktivne varijable
const projectsLeft = ref(0); // Preostali projekti
const remainingTime = ref(""); // Odbrojavanje vremena
const message = ref(""); // Poruka o statusu gosta
const isGuest = ref(false); // Provjera da li je korisnik gost

// Funkcija koja poziva input za odabir datoteka
const triggerFileInput = () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.click();
  }
};

// Funkcija koja provjerava status gosta
const checkGuestStatus = () => {
  const guestData = JSON.parse(localStorage.getItem("guestData"));
  if (guestData) {
    isGuest.value = true; // Korisnik je gost
    projectsLeft.value = guestData.projectsLeft;  // Preostali projekti
    const expiresAt = guestData.expiresAt;        // Datum isteka
    const currentTime = new Date().getTime();

    if (expiresAt < currentTime) {
      // Ako je gostu isteklo vrijeme
      localStorage.removeItem("guestData");
      message.value = "Vrijeme gosta je isteklo!";
    } else if (projectsLeft.value <= 0) {
      // Ako gost nema više preostalih projekata
      message.value = "Gost je iskoristio sve projekte!";
    } else {
      // Ako je vrijeme još uvijek važeće i ima preostalih projekata
      remainingTime.value = calculateRemainingTime(expiresAt);
    }
  }
};

// Funkcija za izračunavanje vremena do isteka za gosta (sati, minute, sekunde)
const calculateRemainingTime = (expiresAt) => {
  const currentTime = new Date().getTime();
  const timeLeft = expiresAt - currentTime;

  if (timeLeft <= 0) {
    return "Vrijeme je isteklo!";
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60)); // Sati
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Minute
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Sekunde

  return `${hours}h ${minutes}m ${seconds}s`;
};

// Funkcija za slanje datoteka na backend
const uploadFilesToBackend = async () => {
  if (files.value.length === 0) {
    alert('Nema datoteka za upload.');
    return;
  }

  if (projectsLeft.value <= 0) {
    alert('Nemate preostalih projekata za upload.');
    return;
  }

  const formData = new FormData(); // Kreira novi FormData objekt
  files.value.forEach(file => {
    formData.append('files', file); // Ključ je 'files', a value je datoteka
  });

  try {
    const response = await axios.post('http://localhost:5001/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Postavljanje odgovarajuće Content-Type
      },
    });
    alert('Datoteke su uspješno poslane!');
    console.log(response.data);
  } catch (error) {
    console.error('Greška prilikom slanja datoteka:', error);
    alert('Došlo je do greške prilikom slanja datoteka.');
  }
};

// Pokreni provjeru statusa gosta kad se komponenta montira
let intervalId;

onMounted(() => {
  checkGuestStatus();
  intervalId = setInterval(checkGuestStatus, 1000); // Ažuriraj svaki sekundu
});

// Očisti interval kada komponenta bude uništena
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.uploud-project-guest {
  background-image: url('@/assets/GetStartedBackground.png');
  background-size: cover;
  background-position: center;
  height: 100vh; /* Pokriva cijeli ekran */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px; /* Dodano za malo razmaka */
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  max-width: 100%;
  padding: 20px;
}

.title {
  font-size: clamp(18px, 5vw, 36px);
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.upload-file {
  width: 100%;
  max-width: 500px;
  min-width: 100px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #624f82;
  background-color: #ffffff;
  text-align: center;
}

.text_1, .text_2, .text_3 {
  font-size: clamp(14px, 4vw, 20px);
  font-family: 'DM Sans', sans-serif;
  color: #8ca2c0;
  text-align: center;
}

.text_3 {
  color: #624F82;
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 14px;
  color: #333;
}

button {
  padding: 10px 20px;
  background-color: #624f82;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #503c66;
}

.guest-status p {
  font-size: 16px;
  color: #333;
  margin: 5px 0;
}

@media (max-width: 600px) {
  .upload-file {
    max-width: 70%;
    padding: 10px;
  }
}
</style>


