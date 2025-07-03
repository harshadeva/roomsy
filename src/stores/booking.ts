import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    form: {
      title: '',
      name: '',
      email: '',
    },
    roomSlug: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    guests: ''
  }),
  getters: {
    nights(state): number {
      if (state.startDate && state.endDate) {
        const diffTime = state.endDate.getTime() - state.startDate.getTime()
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }
      return 0
    },
    formattedStartDate(state): string {
      if (!state.startDate) return ''
      return state.startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).toUpperCase()
    },
    formattedEndDate(state): string {
      if (!state.endDate) return ''
      return state.endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).toUpperCase()
    },
  },

  actions: {
    setForm(formData: { title: string; name: string; email: string }) {
      this.form = formData
    },

    setRoomSlug(slug: string) {
      this.roomSlug = slug
    },

    setSearchFilters(payload: {
      startDate: Date | null
      endDate: Date | null
      guests: string
    }) {
      this.startDate = payload.startDate
      this.endDate = payload.endDate
      this.guests = payload.guests
    },
  },
})
