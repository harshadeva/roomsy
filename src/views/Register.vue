<template>
  <section class="register-section">
    <form class="register-form" @submit.prevent="handleRegister" aria-labelledby="register-title">
      <h1 id="register-title">Create Your Roomsy Account</h1>

      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" required placeholder="Enter your full name" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" required placeholder="you@example.com" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          minlength="6"
          placeholder="Create a password"
        />
      </div>

      <button type="submit">Register</button>

      <p class="login-link">
        Already have an account? <router-link to="/login">Log in</router-link>
      </p>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

function handleRegister() {
  if (!name.value.trim() || !email.value.trim() || password.value.length < 6) {
    alert('Please fill in all fields correctly.')
    return
  }

  // Save user to session (or localStorage for now - mocked)
  sessionStorage.setItem('userName', name.value)
  sessionStorage.setItem('userEmail', email.value)
  sessionStorage.setItem('userPassword', password.value)

  // Redirect to login or directly log in
  router.push('/rooms')
}
</script>

<style scoped>
.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
  background-color: var(--color-bg);
}

.register-form {
  background-color: white;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 420px;
  width: 100%;
}

.register-form h1 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: var(--color-highlight);
  transition: border-color 0.2s ease-in-out;
}

.form-group input:focus {
  border-color: var(--color-primary);
  outline: none;
}

button {
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--color-secondary);
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
.login-link a {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
