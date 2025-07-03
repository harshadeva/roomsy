<template>
  <section class="register-section">
    <form
      class="register-form"
      @submit.prevent="handleRegister"
      aria-labelledby="register-title"
      novalidate
    >
      <h1 id="register-title">Create Your Account</h1>

      <div class="form-group">
        <label for="name">Full Name<span class="required-asterisk">*</span></label>
        <input
          id="name"
          type="text"
          v-model.trim="name"
          placeholder="Enter your full name"
          aria-required="true"
          :aria-invalid="!!nameError"
        />
        <p class="error-msg" v-if="nameError">{{ nameError }}</p>
      </div>

      <div class="form-group">
        <label for="email">Your Email<span class="required-asterisk">*</span></label>
        <input
          id="email"
          type="email"
          v-model.trim="email"
          placeholder="Enter your email"
          aria-required="true"
          :aria-invalid="!!emailError"
        />
        <p class="error-msg" v-if="emailError">{{ emailError }}</p>
      </div>

      <div class="form-group">
        <label for="password">Password<span class="required-asterisk">*</span></label>
        <div class="password-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            aria-required="true"
            :aria-invalid="!!passwordError"
            autocomplete="new-password"
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

      <div class="form-group">
        <label for="passwordConfirm"
          >Confirm Password<span class="required-asterisk">*</span></label
        >
        <div class="password-wrapper">
          <input
            :type="showPasswordConfirm ? 'text' : 'password'"
            id="passwordConfirm"
            v-model="passwordConfirm"
            placeholder="Confirm your password"
            aria-required="true"
            :aria-invalid="!!passwordConfirmError"
            autocomplete="new-password"
          />
          <button
            type="button"
            @click="togglePasswordConfirm"
            class="toggle-btn"
            aria-label="Toggle confirm password visibility"
          >
            <component :is="showPasswordConfirm ? EyeOffIcon : EyeIcon" class="icon" />
          </button>
        </div>
        <p class="error-msg" v-if="passwordConfirmError">{{ passwordConfirmError }}</p>
      </div>

      <button type="submit">Register</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

defineOptions({
  name: 'RegisterPage',
})

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const passwordConfirmError = ref('')

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const router = useRouter()
const { register } = useAuth()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function togglePasswordConfirm() {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

function validateEmail(email: string): boolean {
  // Simple email regex pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function handleRegister() {
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  passwordConfirmError.value = ''

  if (!name.value) {
    nameError.value = 'Full name is required'
  }

  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
  }

  if (!passwordConfirm.value) {
    passwordConfirmError.value = 'Please confirm your password'
  } else if (passwordConfirm.value !== password.value) {
    passwordConfirmError.value = 'Passwords do not match'
  }

  if (nameError.value || emailError.value || passwordError.value || passwordConfirmError.value)
    return

  register(name.value, email.value, password.value)

  router.push('/dashboard')
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
  max-width: 400px;
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
