<template>
  <section class="booking-contact-page">
    <!-- Stepper -->
    <Stepper :active="3" />

    <!-- Content Layout -->
    <div class="booking-grid">
      <!-- Contact Form -->
      <section class="contact-form">
        <h2>Contact Information</h2>
        <form @submit.prevent="proceedToConfirmation">
          <div class="form-group">
            <label for="title">Title</label>
            <select id="title" v-model="form.title" required>
              <option disabled value="">Select</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
          </div>

          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>

          <button type="submit" class="proceed-button">Proceed</button>
        </form>
      </section>

      <!-- Room Summary -->
      <aside class="room-summary">
        <div class="stay-details">
          <p class="date-range">
            {{ bookingStore.formattedStartDate }} - {{ bookingStore.formattedEndDate }}
          </p>
          <p class="nights">{{ bookingStore.nights }} night</p>
          <p class="guests">Room: {{ bookingStore.guests }} guest</p>
        </div>

        <img class="room-image" :src="room?.image" alt="Selected room" />

        <div class="room-details">
          <h3 class="room-title">{{ room?.title }}</h3>
          <p class="line-item">{{ room?.type }}</p>
          <p class="line-item">{{ room?.description }}</p>
          <p class="total">Total: {{ formatPriceUSD(room?.price ?? 0) }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Stepper from '@/components/Stepper.vue'
import { getRoom } from '@/composables/rooms'
import { useBookingStore } from '@/stores/booking'
import { formatPriceUSD } from '@/utils/formatters'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const roomSlug = route.params.slug as string
const room = getRoom(roomSlug)
const bookingStore = useBookingStore()

if (!room || bookingStore.formattedStartDate == '') {
  router.push({ name: 'search' })
}

const form = reactive({
  title: '',
  name: '',
  email: '',
})

defineOptions({
  name: 'BookingContactPage',
})

function proceedToConfirmation() {
  bookingStore.setForm(form)
  console.log('Saved to store:', bookingStore.form)
  router.push({ name: 'BookingConfirmation' })
}
</script>

<style scoped>
.booking-contact-page {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: auto;
  font-family: sans-serif;
  background-color: var(--color-bg);
}

/* Layout */
.booking-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-form {
  flex: 1 1 400px;
  background: #f2f2ea;
  padding: 1.5rem;
  border-radius: 8px;
}

.contact-form h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

input,
select {
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
}

.proceed-button {
  margin-top: 1rem;
  background-color: black;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}

.proceed-button:hover {
  background-color: var(--color-primary);
}

/* Room Summary */
.room-summary {
  flex: 1 1 300px;
  background: #f7f7f3;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stay-details p,
.room-details p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.date-range {
  font-weight: bold;
}

.room-image {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  max-height: 210px;
}

.room-details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.room-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--color-text);
}

.line-item {
  font-size: 0.9rem;
  color: #333;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: var(--color-text);
}

/* Responsive */
@media (max-width: 768px) {
  .booking-grid {
    flex-direction: column;
  }

  .stepper ol {
    justify-content: space-between;
  }

  .room-summary {
    order: -1;
  }
}
</style>
