<template>
  <nav class="site-nav" aria-label="Main Navigation">
    <ul class="nav-links">
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </li>

      <li v-if="isAuthenticated" class="user-info">
        <span>Welcome, {{ user?.name }}</span>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logoutUser" class="logout-btn">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user, logout, isAuthenticated } = useAuth()

const router = useRouter()

function logoutUser() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  font-weight: 500;
  color: white;
}

.user-info {
  margin-right: auto;
  font-weight: bold;
  color: var(--color-primary);
}

.logout-btn {
  background: none;
  border: none;
  color: var(--color-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.logout-btn:hover {
  color: red;
}
</style>
