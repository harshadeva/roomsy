import { createRouter, createWebHistory } from 'vue-router'
import LoginFPage from '@/views/Login.vue'
import RegisterPage from '@/views/Register.vue'
import SearchPage from '@/views/Search.vue'
import BookingContactPage from '@/views/BookingContact.vue'
import BookingConfirmationPage from '@/views/BookingConfirmation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginFPage,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { guestOnly: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/booking/contact/:slug',
      name: 'bookingContacts',
      component: BookingContactPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/booking/confirmation',
      name: 'BookingConfirmation',
      component: BookingConfirmationPage,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('roomsy_user')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  }

  else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'search' })
  }
  else {
    next()
  }
})
export default router
