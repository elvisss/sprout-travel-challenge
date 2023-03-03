import type { Itinerary } from '@/interfaces'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFlightsStore = defineStore('flights', () => {
  const itineraries = ref<Itinerary[]>([])

  const currentPage = ref<number>(1)
  const totalPages = ref<number>(0)
  const pageSize = ref<number>(7)

  return {
    // State properties
    itineraries,

    currentPage,
    totalPages,
    pageSize,

    // Getters
    filteredItineraries: computed<Itinerary[]>(() =>
      itineraries.value.slice(
        currentPage.value * pageSize.value,
        currentPage.value * pageSize.value + pageSize.value
      )
    ),

    // Actions
    setItineraries(newItineraries: Itinerary[]) {
      totalPages.value = Math.ceil(newItineraries.length / pageSize.value) - 1
      itineraries.value = newItineraries
    },
    setPage(page: number) {
      if (currentPage.value === page) return
      currentPage.value = page
    },
    setPageSize(newPageSize: number) {
      pageSize.value = newPageSize
    },
  }
})
