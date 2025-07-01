// useAuth.ts
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
}

const user = ref<User | null>(null)

// Load from localStorage on first use
const loadUser = (): User | null => {
  try {
    const data = localStorage.getItem('roomsy_user')
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error('Error parsing user data:', e)
    return null
  }
}

user.value = loadUser()

const isAuthenticated = computed(() => user.value !== null)

function login(name: string, email: string, password: string) {
  const userData = { name, email }
  localStorage.setItem('roomsy_user', JSON.stringify(userData))
  user.value = userData
}

function register(name: string, email: string, password: string) {
  login(name, email, password)
}

function logout() {
  localStorage.removeItem('roomsy_user')
  user.value = null
}

function getUser(): User | null {
  return user.value
}

export function useAuth() {
  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    getUser
  }
}
