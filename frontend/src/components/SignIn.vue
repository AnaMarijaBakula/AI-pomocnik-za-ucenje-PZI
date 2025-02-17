<template>
  <div class="signin-container">
    <h2>{{ isRegistering ? 'Registracija' : 'Prijava' }}</h2>

    <!-- Prikazivanje obavijesti -->
    <div v-if="message" class="alert" :class="alertType">{{ message }}</div>

    <!-- Ako je registracija, prikazujemo formu za registraciju -->
    <div class="form-wrapper">
      <div v-if="isRegistering">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Korisničko ime</label>
            <input v-model="username" type="text" id="username" placeholder="Unesi korisničko ime" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Unesi email" required />
          </div>
          <div class="form-group">
            <label for="password">Lozinka</label>
            <input v-model="password" type="password" id="password" placeholder="Unesi lozinku" required />
          </div>
          <div class="form-group">
            <button type="submit">Registriraj se</button>
          </div>
          <div class="toggle">
            <button @click="toggleForm" class="link-button">Već imaš račun? Prijavi se</button>
          </div>
        </form>
      </div>

      <!-- Ako nije registracija, prikazujemo formu za prijavu -->
      <div v-else>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Unesi email" required />
          </div>
          <div class="form-group">
            <label for="password">Lozinka</label>
            <input v-model="password" type="password" id="password" placeholder="Unesi lozinku" required />
          </div>
          <div class="form-group">
            <button type="submit">Prijavi se</button>
          </div>
          <div class="toggle">
            <button @click="toggleForm" class="link-button">Nemate račun? Registrirajte se</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Gosti prijava -->
    <div class="guest-login">
      <button @click="guestLogin" class="link-button">Prijavi se kao gost</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "", // Username za registraciju
      isRegistering: false, // Ako je true, prikazuj formu za registraciju
      message: "", // Obavijesti o uspjehu
      alertType: "", // Tip obavijesti (npr. 'success' ili 'error')
      isGuest: false, // Da li je korisnik prijavljen kao gost
    };
  },
  methods: {
    // Za registraciju korisnika
    async registerUser() {
      try {
        await axios.post("http://localhost:5010/api/users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          role: "user",
        });

        this.message = "Korisnik uspješno registriran!";
        this.alertType = "success";

        setTimeout(() => {
          this.toggleForm();
        }, 2000);
      } catch (error) {
        this.message = "Greška pri registraciji: " + (error.response?.data?.message || "Pokušajte ponovno.");
        this.alertType = "error";
      }
    },
    async loginUser() {
      try {
        const response = await axios.post("http://localhost:5010/api/users/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token);
        this.message = "Prijava uspješna!";
        this.alertType = "success";

        setTimeout(() => {
          this.$router.push("/uploadproject");
        }, 2000);
      } catch (error) {
        this.message = "Greška pri prijavi: " + (error.response?.data?.message || "Pokušajte ponovno.");
        this.alertType = "error";
      }
    },
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.message = "";
    },
    async guestLogin() {
      try {
        const response = await axios.post("http://localhost:5010/api/users/guest");
        localStorage.setItem("token", response.data.token);
        this.isGuest = true;
        this.message = "Prijava kao gost uspješna!";
        this.alertType = "success";
        setTimeout(() => {
          this.$router.push("/uploadproject");
        }, 2000);
      } catch (error) {
        this.message = "Greška pri prijavi gosta: " + (error.response?.data?.message || "Pokušajte ponovno.");
        this.alertType = "error";
      }
    },
  },
};
</script>
<style scoped>
.signin-container {
  width: 500px;
  min-height: 500px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #f4f4f4;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Responzivnost za manje ekrane */
@media (max-width: 768px) {
  .signin-container {
    width: 80%;
    padding: 30px;
  }

  button, .link-button {
    font-size: 14px;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .signin-container {
    width: 90%;
    padding: 20px;
  }

  button, .link-button {
    font-size: 14px;
    padding: 10px;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 8px;
    font-size: 14px;
  }

  .guest-login {
    margin-top: 10px;
  }
}

.form-wrapper {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #624f82;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #503b6a;
}

.link-button {
  background: none;
  border: 2px solid #624f82;
  color: #624f82;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
}

.link-button:hover {
  background-color: #624f82;
  color: white;
}

.toggle {
  margin-top: 20px;
}

.guest-login {
  margin-top: 15px;
}
</style>
