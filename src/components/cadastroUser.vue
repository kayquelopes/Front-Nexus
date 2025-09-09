<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const username = ref('')
</script>
<template>
  <main>
    <div class="container">
      <div class="background-form">
        <div class="transition-Page">
          <div class="signIn"><router-link to="/" style="color: white; text-decoration: none;">Sign In</router-link></div>
          <div class="signUp"><router-link to="/cadastroUser" style="color: black; text-decoration: none;">Sign Up</router-link></div>
        </div>
        <form @submit.prevent="">
          <div class="email-cadastro">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="password-cadastro">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="user-cadastro">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="submit-cadastro">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<style scoped>
.container {
  width: auto;
  height: 100%;
  margin: auto;
  padding: 16px;
  background-color: #333;
}
.background-form {
  width: 400px;
  margin: 210px auto;
  padding: 24px;
  border-radius: 8px;
  background: linear-gradient(to bottom right, #0E2A9E, #050F38);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Times New Roman', Times, serif;
}

.transition-Page {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  color: rgb(0, 0, 0);
  background-color: white;
  border-radius: 50px;
  width: 240px;
  height: 40px;
}
.signIn {
  width: 120px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #0E2A9E;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signUp {
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 20px;
}

form {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 0);

}

.email-cadastro, .password-cadastro, .submit-cadastro, .user-cadastro {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  color: white;
}

label {
  margin-bottom: 4px;
}

input {
  width: 240px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #0E2A9E;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}

button:hover {
  background-color: #050F38;
}
</style>
