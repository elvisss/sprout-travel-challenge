import type { Itinerary } from '@/interfaces'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFlightsStore = defineStore('flights', () => {

  const itineraries = ref<Itinerary[]>([])
  
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(10)

  return {
    // State properties
    itineraries,
    currentPage,
    totalPages,

    // Getters

    // Actions
    setItineraries(newItineraries: Itinerary[]) {
      itineraries.value = newItineraries
    },
    setTotalPages(newTotalPages: number) {
      totalPages.value = newTotalPages
    },
    setPage(page: number) {
      if (currentPage.value === page) return
      currentPage.value = page
    }
  }
})
