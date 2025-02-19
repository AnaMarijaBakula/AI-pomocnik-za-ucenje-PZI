<template>
  <v-container>
    <v-row justify="center">
      <v-col :cols="12" :md="10" :lg="6" :xl="4">
        <FrameCenter>
          <div class="main-content">
            <!-- Prikazivanje pohranjenog e-maila korisnika sa ikonom korisnika -->
            <div v-if="email" class="user-profile">
              <v-avatar size="40">
                <v-img src="https://i.pinimg.com/736x/d4/c2/9b/d4c29bce80764dc50e72a5f87c255dab.jpg" alt="User Icon" />
              </v-avatar>
              <div class="user-info">
                <p>Welcome, <strong>{{ email }}</strong></p>
              </div>
            </div>

            <span class="title">Upload your project here</span>

            <div class="upload-file" @dragover.prevent @drop="handleDrop">
              <span class="text_1" @click="triggerFileInput">Drag & Drop your project folder</span>
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
const email = ref("");

// Funkcija za odabir datoteka
const handleFileSelect = (event) => {
  files.value = Array.from(event.target.files);
};

// Funkcija koja poziva input za odabir datoteka
const triggerFileInput = () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.click();
  }
};

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
    await axios.post('http://localhost:5001/api/upload', formData, {
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

onMounted(() => {
  const savedEmail = localStorage.getItem("email");
  if (savedEmail) {
    email.value = savedEmail;
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
  min-width: 280px;
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

.user-profile {
  display: flex;
  align-items: center;
  background-color: #e2e9f3;
  padding: 10px 15px;
  border-radius: 25px;
  max-width: 90%;
  width: fit-content;
  gap: 10px;
}

.user-info p {
  font-size: clamp(14px, 4vw, 18px);
  font-family: 'DM Sans', sans-serif;
  color: #333;
  margin: 0;
}

@media (max-width: 600px) {
  .upload-file {
    max-width: 90%;
    padding: 10px;
  }

  .user-profile {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
    padding: 10px;
  }
}
</style>
