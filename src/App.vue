<template>
  <div id="app">
    <header class="site-header">
      <h1 class="site-logo">Roomsy</h1>
      <nav class="site-nav">
        <nav-link to="/login">Login</nav-link>
        <nav-link to="/register">Register</nav-link>
      </nav>
    </header>

    <main class="site-main">
      <router-view />
    </main>

    <footer class="site-footer">&copy; {{ currentYear }} Roomsy. All rights reserved.</footer>
  </div>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
}

/* Header */
.site-header {
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.site-logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.site-nav {
  display: flex;
  gap: 1rem;
}

/* Main Content */
.site-main {
  flex: 1;
  padding: 2rem;
}

/* Footer */
.site-footer {
  background-color: var(--color-highlight);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #ddd;
}
</style>
