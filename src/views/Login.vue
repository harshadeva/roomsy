<template>
  <section class="login-section">
    <form class="login-form" @submit.prevent="handleLogin" aria-labelledby="login-title">
      <h1 id="login-title">Sign in to Continue</h1>

      <div class="form-group">
        <label for="email">Your Email<span class="required-asterisk">*</span></label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          aria-required="true"
        />
        <p class="error-msg" v-if="emailError">{{ emailError }}</p>
      </div>

      <div class="form-group">
        <label for="password">Your Password<span class="required-asterisk">*</span></label>
        <div class="password-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            aria-required="true"
          />
          <button
            type="button"
            @click="togglePassword"
            class="toggle-btn"
            aria-label="Toggle password visibility"
          >
            <component :is="showPassword ? EyeOffIcon : EyeIcon" class="icon" />
          </button>
        </div>
        <p class="error-msg" v-if="passwordError">{{ passwordError }}</p>
      </div>

      <button type="submit">Log In</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

defineOptions({
  name: 'LoginPage',
})

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const showPassword = ref(false)

const router = useRouter()
const { login } = useAuth()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  }

  if (emailError.value || passwordError.value) return

  login('Test User', email.value, password.value)
  router.push('/dashboard')
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

.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
}

.password-wrapper input {
  width: 100%;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  color: var(--color-text);
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
}

.error-msg {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.4rem;
}

button[type='submit'] {
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

button[type='submit']:hover {
  background-color: var(--color-secondary);
}
</style>
