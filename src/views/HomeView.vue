<template>
  <div class="container">
    <h1>Flights List</h1>

    <FlightItineraries :itineraries="itineraries" />

    <!-- Pagination -->
    <PaginationNumber
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-changed="setPage"
    />

  </div>
  <!-- Loading -->
  <LoadingModal v-if="isLoading" />
</template>

<script setup lang="ts">
import FlightItineraries from '@/components/FlightItineraries/ItineraryList.vue'
import PaginationNumber from '@/components/PaginationNumber.vue'
import LoadingModal from '@/components/LoadingModal.vue'
import useFlights from '@/composables/useFlights';

const { isLoading, itineraries, totalPages, currentPage, setPage } = useFlights()
</script>
