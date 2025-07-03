<template>
  <div class="stepper">
    <ol>
      <li v-for="(link, index) in links" :class="getClass(index)" :key="index">
        <router-link v-if="index + 1 < active" :to="link.link"
          >{{ index + 1 }}. {{ link.name }}</router-link
        >
        <span v-else>{{ index + 1 }}. {{ link.name }}</span>
      </li>
    </ol>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'

const props = withDefaults(defineProps<{ active?: number }>(), {
  active: 1,
})

function getClass(index: number) {
  index++
  if (index < props.active) {
    return 'done'
  } else if (index === props.active) {
    return 'active'
  } else {
    return ''
  }
}

const links = [
  {
    name: 'Search',
    link: router.resolve({ name: 'search' }).href,
  },
  {
    name: 'Select Room',
    link: router.resolve({ name: 'search' }).href,
  },
  {
    name: 'Contact Details',
    link: router.resolve({ name: 'bookingContacts' }).href,
  },
  {
    name: 'Confirmation',
    link: router.resolve({ name: 'search' }).href,
  },
]

defineOptions({
  name: 'StepperComponent',
})
</script>
<style scoped>
.stepper {
  margin-bottom: 2rem;
}

.stepper ol {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.stepper li {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #eee;
  font-weight: 600;
  font-size: 0.95rem;
  color: #999;
}

.stepper li.done {
  background-color: var(--color-primary);
  color: white;
}

.stepper li.active {
  background-color: var(--color-text);
  color: white;
}
</style>
