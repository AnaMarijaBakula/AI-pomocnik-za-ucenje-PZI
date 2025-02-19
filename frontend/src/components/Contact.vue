<template>
  <div class="contact">
    <v-form v-model="valid" ref="form" @submit.prevent="submitForm" class="form-container">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              label="Ime"
              required
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              label="Email"
              required
              :rules="[rules.required, rules.email]"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="message"
              label="Poruka"
              required
              :rules="[rules.required]"
              rows="5"
            ></v-textarea>
            <h2>Za sve dodatne informacije, javite se na:</h2>
            <p>Email: <a href="mailto:anamarijabakula@fpmoz.sum.ba">Ana-Marija Baula</a> i <a href="mailto:sara.budimir@fpmoz.sum.ba">Sara Budimir</a></p>
          </v-col>

          <v-col cols="12">
            <v-btn :disabled="!valid" @click="submitForm" type="submit" color="primary">
              Pošaljite Poruku
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';

// Form state
const valid = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');

// Validation rules
const rules = {
  required: (value) => !!value || 'Ovo polje je obavezno',
  email: (value) => /.+@.+\..+/.test(value) || 'Molimo unesite valjan email',
};

// Initialize EmailJS
emailjs.init('PbDt4_Z9FPmtZgwaY'); // Zamijeni s tvojim public key-em

// Form submission
const submitForm = () => {
  if (!valid.value) return;

  const templateParams = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  emailjs.send('service_0hsvomj', 'template_ojnakqh', templateParams)
    .then(
      (response) => {
        console.log('Poruka uspješno poslana:', response);
        alert('Poruka je uspješno poslana!');
      },
      (error) => {
        console.log('Greška prilikom slanja poruke:', error);
        alert('Došlo je do greške, molimo pokušajte ponovo.');
      }
    );

  // Reset forme nakon slanja
  name.value = '';
  email.value = '';
  message.value = '';
};
</script>

<style scoped>
.contact {
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

.form-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  position: relative;
}

</style>
