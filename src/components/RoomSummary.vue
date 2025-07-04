<template>
  <div class="room-card">
    <!-- Left: Image -->
    <img class="room-image" :src="room.image" :alt="room.title" />

    <!-- Center: Info -->
    <div class="room-details">
      <h2 class="room-title">{{ room.title }}</h2>
      <p class="room-subtitle">{{ room.type }}</p>
      <p class="room-description">{{ room.description }}</p>
    </div>

    <!-- Right: Price & CTA -->
    <div class="room-actions">
      <div class="price-container">
        <div class="room-price">{{ formatPriceUSD(room.price) }}<span>/night</span></div>
        <p class="room-note">Subject to GST and charges</p>
      </div>
      <button @click="redirectToRoomPage" class="book-button">Book Room</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatPriceUSD } from '@/utils/formatters'

const props = defineProps<{
  room: {
    id: number
    image: string
    title: string
    slug: string
    type: string
    description: string
    price: number
  }
}>()

defineOptions({
  name: 'RoomSummaryComponent',
})

const emit = defineEmits(['bookRoom'])
function redirectToRoomPage() {
  emit('bookRoom', props.room)
}
</script>

<style scoped>
.room-card {
  display: flex;
  background-color: #f9f9f5;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: -1px 3px 10px 2px rgba(2, 2, 2, 0.096);
  padding: 1rem;
  gap: 1rem;
  align-items: center;
}

.room-image {
  width: 340px;
  height: 210px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.room-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  height: 100%;
}

.room-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.room-subtitle {
  font-size: 0.85rem;
  text-transform: uppercase;
  font-weight: 500;
  color: #666;
  margin: 0;
}

.room-description {
  font-size: 0.95rem;
  color: #444;
}

.room-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  padding-left: 1rem;
}

.room-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text);
}

.room-price span {
  font-size: 0.9rem;
  color: #444;
  margin-left: 0.2rem;
}

.room-note {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
  text-align: right;
}

.book-button {
  background-color: var(--color-text);
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  /* margin-bottom: 1rem; */
}

.book-button:hover {
  background-color: var(--color-primary);
}

@media (max-width: 768px) {
  .room-card {
    display: flex;
    flex-direction: column;
  }

  .room-image {
    width: 100%;
    height: auto;
  }

  .room-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .room-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
  }
}
</style>
