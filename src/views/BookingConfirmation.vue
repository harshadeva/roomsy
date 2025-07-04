<template>
  <section class="confirmation-page">
    <h1 class="confirmation-title">Your Booking Has Been Confirmed</h1>
    <p class="confirmation-subtitle">
      We have sent your booking confirmation to the email address that you have provided.
    </p>

    <div class="confirmation-info">
      <p>
        <strong>Check-in/Check-out:</strong>
        {{ formattedDateRange }}
      </p>
      <p><strong>Booking Confirmation Number:</strong> {{ confirmationNumber }}</p>
      <p>
        <strong>Total Price for {{ nights }} Night{{ nights > 1 ? 's' : '' }}:</strong>
        <span class="price">{{ formatPriceUSD(room?.price ?? 0) }}</span>
      </p>
    </div>

    <div class="summary-box">
      <div class="room-info">
        <div class="room-image">
          <img :src="room?.image" alt="Room Image" />
        </div>
        <div class="room-details">
          <h3>Room: {{ room?.title }}</h3>

          <h4>Package:</h4>
          <ul>
            <li>Room: {{ formatPriceUSD(room?.price ?? 0) }}</li>
            <li>Tax & Service Charges (0): $0</li>
            <li><strong>Total Price:</strong> {{ formatPriceUSD(room?.price ?? 0) }}</li>
          </ul>
        </div>
      </div>

      <div class="guest-info">
        <h4>Guest Details</h4>
        <p>Name: {{ guest.title }} {{ guest.name }}</p>
        <p>Email Address: {{ guest.email }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { formatPriceUSD } from '@/utils/formatters'
import type { Room } from '@/types/common'
import { useRouter } from 'vue-router'

defineOptions({ name: 'BookingConfirmationPage' })

const store = useBookingStore()

// Dummy confirmation number
const confirmationNumber = 'RES123456789'

const router = useRouter()

// Room info
const room: Room | null = store.reservedRoom
if (room == null) {
  router.push({ name: 'search' })
}

// Guest details
const guest = computed(() => store.form)

// Dates and nights
const start = store.startDate
const end = store.endDate
const nights = store.nights

const formattedDateRange = computed(() => {
  if (!start || !end) return ''
  return `${start.toDateString()} → ${end.toDateString()}`
})
</script>

<style scoped>
.confirmation-page {
  padding: 2rem 1rem;
  max-width: 960px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: var(--color-bg);
}

.confirmation-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.confirmation-subtitle {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.confirmation-info {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text);
  line-height: 1.7;
  font-size: 1rem;
}

.price {
  font-weight: 600;
  color: var(--color-primary);
}

.summary-box {
  background-color: #f6f6f0;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.room-info {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.room-image img {
  width: 340px;
  height: 210px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.room-details {
  flex: 1;
}

.room-details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.room-details h4 {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.room-details ul {
  margin-top: 0.75rem;
  padding-left: 1.5rem;
  list-style-type: disc;
  color: #444;
  font-size: 0.95rem;
}

.guest-info {
  background: #edece7;
  padding: 1.25rem;
  border-radius: 10px;
  border-left: 4px solid var(--color-primary);
}

.guest-info h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: var(--color-text);
}

.guest-info p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .room-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .room-image img {
    width: 100%;
    height: auto;
  }
}
</style>
