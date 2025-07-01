<template>
  <section class="login-section">
    <form class="login-form" @submit.prevent="handleSubmit" aria-labelledby="login-title">
      <h1 id="login-title">Sign in to Continue</h1>

      <div class="form-group">
        <label for="username">Your Name</label>
        <input
          id="username"
          type="text"
          v-model="username"
          required
          placeholder="Enter your name"
          aria-required="true"
        />
      </div>

      <button type="submit">Log In</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const username = ref<string>('')

const emit = defineEmits<{
  (e: 'login', username: string): void
}>()

function handleSubmit() {
  if (!username.value.trim()) {
    return
  }

  emit('login', username.value.trim())
}
</script>

<style scoped>
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1rem;
  background-color: var(--color-bg);
}

.login-form {
  background-color: white;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  width: 100%;
}

.login-form h1 {
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
</style>
