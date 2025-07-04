<template>
  <nav class="site-nav max-container" aria-label="Main Navigation">
    <!-- Desktop Navigation -->
    <div class="desktop-nav">
      <h1 class="site-logo"><router-link to="/search">Roomsy</router-link></h1>
      <div class="left">
        <ul class="nav-links" v-if="isAuthenticated">
          <li>
            <router-link to="/search">Search Rooms</router-link>
          </li>
        </ul>
      </div>
      <div class="right">
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
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav">
      <div class="top-row">
        <h1 class="site-logo">
          <router-link to="/search">Roomsy</router-link>
        </h1>

        <!-- Mobile Menu Toggle -->
        <button class="hamburger" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle navigation">
          ☰
        </button>
      </div>
      <div class="nav-container" :class="{ open: isMenuOpen }">
        <ul class="nav-links">
          <li v-if="isAuthenticated"><router-link to="/search">Search Rooms</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>

          <li v-if="isAuthenticated" class="user-info">
            <span>Welcome, {{ user?.name }}</span>
          </li>
          <li v-if="isAuthenticated">
            <button @click="logoutUser" class="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

defineOptions({ name: 'NavbarComponent' })

const { user, logout, isAuthenticated } = useAuth()
const router = useRouter()
const isMenuOpen = ref(false)

function logoutUser() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.site-nav {
}

.desktop-nav {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav {
  display: none;
}

.desktop-nav .left {
  display: flex;
  justify-content: center;
  flex: 1;
}

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

/* Mobile Navigation */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
    width: 100%;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
  }

  .hamburger:focus {
    background-color: initial;
  }

  .nav-container {
    flex-direction: column;
    width: 100%;
    background-color: var(--color-primary);
    display: none;
  }

  .nav-container.open {
    display: flex;
    padding-top: 1rem;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .logout-btn {
    padding: 0;
    font-size: 1rem;
  }
}
</style>
