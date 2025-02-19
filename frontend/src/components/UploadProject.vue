<template>
  <v-container>
    <v-row justify="center">
      <v-col :cols="12" :md="10" :lg="6" :xl="4">
        <FrameCenter>
          <div class="main-content">
            <!-- Prikazivanje pohranjenog e-maila korisnika sa ikonom korisnika -->
            <div v-if="email" class="user-profile">
              <!-- Ikona korisnika -->
              <v-avatar size="30">
                <v-img src="https://img.freepik.com/premium-wektory/ikona-profilu-osob_718801-114.jpg?w=360" alt="User Icon" />
              </v-avatar>
              <div class="user-info">
                <p>Dobrodošli, <strong>{{ email }}</strong></p>
              </div>
            </div>

            <span class="title">Upload your project here</span>

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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FrameCenter from '@/components/FrameCenter.vue';

const files = ref([]);
const email = ref(""); // Email varijabla kao ref

// Funkcija za selektiranje datoteka
const handleFileSelect = (event) => {
  files.value = Array.from(event.target.files);
};

// Funkcija za upload datoteka
const uploadFilesToBackend = async () => {
  if (files.value.length === 0) {
    alert('Nema datoteka za upload.');
    return;
  }

  const formData = new FormData();
  files.value.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post('http://localhost:5001/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Datoteke su uspješno poslane!');
  } catch (error) {
    console.error('Greška prilikom slanja datoteka:', error);
    alert('Došlo je do greške prilikom slanja datoteka.');
  }
};

// Funkcija koja se poziva kad se komponenta montira
onMounted(() => {
  // Provjerava da li postoji email u localStorage
  const savedEmail = localStorage.getItem("email");
  if (savedEmail) {
    email.value = savedEmail;  // Ako postoji, postavi email u ref varijablu
  }
});
</script>

<style scoped>
.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 90%;
}

.title {
  font-size: clamp(16px, 5vw, 40px);
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.upload-file {
  width: 510px;
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 19px;
  gap: 10px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #624f82;
  background-color: #ffffff;
  position: relative;
}

.text_1, .text_2, .text_3 {
  width: 100%;
  font-size: clamp(12px, 4vw, 20px);
  font-family: 'DM Sans', sans-serif;
  color: #8ca2c0;
  text-align: center;
  line-height: 32px;
}

.text_3 {
  color: #624F82;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
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

/* Razdvajanje dijela za korisničke informacije */
.user-profile {
  display: flex;
  align-items: center;
  background-color: #e3e3e3;
  padding: 10px 15px;
  border-radius: 25px;
  width: 100%;
  max-width: 350px;
  justify-content: center;
  gap: 15px;
  position: relative;
  top: -100px; /* Pomak iznad bijelog okvira */
}

.user-info p {
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  color: #333;
  margin: 0;
  text-align: left;
}
</style>
