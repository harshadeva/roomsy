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
      path: '/login',
      name: 'login',
      component: LoginFPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
    },
    {
      path: '/booking/contact/:slug',
      name: 'bookingContacts',
      component: BookingContactPage,
    },
    {
      path: '/booking/confirmation',
      name: 'BookingConfirmation',
      component: BookingConfirmationPage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
