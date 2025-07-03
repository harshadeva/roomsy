<template>
  <section class="search-page">
    <!-- Banner -->
    <div class="banner-container max-container">
      <img
        class="banner-image"
        src="@/assets/images/banner.jpg"
        alt="Banner"
        width="1000"
        height="400"
      />
      <div class="banner-overlay">
        <h1 class="banner-text">BOOK A ROOM</h1>
      </div>
    </div>

    <!-- Search Bar -->
    <form class="search-bar max-container" @submit.prevent="performSearch">
      <!-- Date Range Picker -->
      <div class="search-left">
        <label for="date">Date Range</label>
        <div class="input-icon-wrapper">
          <CalendarIcon class="icon" />
          <Datepicker
            v-model="search.dateRange"
            format="yyyy-MM-dd"
            range
            :auto-apply="true"
            placeholder="Select check-in & check-out"
          />
        </div>
      </div>

      <!-- Guest Count -->
      <div class="search-right">
        <label for="guests">Guests</label>
        <div class="input-icon-wrapper">
          <UsersIcon class="icon" />
          <select id="guests" v-model="search.guests">
            <option disabled value="">Select guests</option>
            <option v-for="n in 10" :key="n" :value="n">{{ n }} Guest{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
      </div>

      <!-- Submit -->
      <div class="search-submit">
        <button type="submit">Search</button>
      </div>
    </form>

    <!-- Results Header -->
    <div class="results-header max-container">
      <div class="result-count">{{ results.length }} rooms found</div>
      <div class="sort-options">
        <label for="sort">Sort by:</label>
        <select id="sort" v-model="sortOrder" @change="sortResults">
          <option value="desc">Price (High to Low)</option>
          <option value="asc">Price (Low to High)</option>
        </select>
      </div>
    </div>

    <!-- Search Results -->
    <div class="results-grid">
      <h1 v-for="room in results" :key="room.id">Room Here : {{ room.name }}</h1>
      <!-- <RoomSummaryCard v-for="room in results" :key="room.id" :room="room" /> -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { CalendarIcon, UsersIcon } from 'lucide-vue-next'
// import RoomSummaryCard from '@/components/RoomSummaryCard.vue'

defineOptions({
  name: 'SearchPage',
})

const search = ref({
  dateRange: '',
  guests: '',
})

const allRooms = ref([
  { id: 1, name: 'Luxury Suite', price: 200 },
  { id: 2, name: 'Cozy Double', price: 150 },
  { id: 3, name: 'Family Room', price: 180 },
  { id: 4, name: 'Budget Single', price: 100 },
])

const sortOrder = ref<'asc' | 'desc'>('desc')

const results = computed(() => {
  return [...allRooms.value].sort((a, b) => {
    return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
  })
})

function performSearch() {
  console.log('Searching with:', search.value)
}

function sortResults() {}
</script>

<style scoped>
.search-page {
  padding: 2rem 1rem;
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Banner */
.banner-container {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 47, 47, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-text {
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  text-align: center;
}

/* Search Bar */
.search-bar {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-bar input,
.search-bar select {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.input-icon-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
  position: absolute;
  left: 0.75rem;
  pointer-events: none;
}

.date-input,
.input-icon-wrapper select {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
}

.input-icon-wrapper select:focus {
  outline: none;
}

.search-submit {
  flex: 1 1 100%;
  text-align: center;
  margin-top: 1rem;
}

.search-submit button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-submit button:hover {
  background-color: var(--color-secondary);
}

/* Results Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-count {
  font-weight: 600;
  color: var(--color-text);
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-options select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  background: var(--color-highlight);
  border: 1px solid #ccc;
}

/* Results Grid */
.results-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
}
</style>
