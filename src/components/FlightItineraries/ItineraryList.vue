<template>
  <div
    class="itinerary-box mb-4 p-4"
    v-for="(itinerary, index) in itineraries"
    :key="index"
  >
    <ItineraryJourney
      v-for="(journey, index) in itinerary.journeys"
      :key="index"
      :journey="journey"
      :is-even="index % 2 === 0"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Itinerary } from '@/interfaces'
import ItineraryJourney from './ItineraryJourney.vue'

interface Props {
  itineraries: Itinerary[]
}

const props = defineProps<Props>()
const itineraries = toRef(props, 'itineraries')
</script>

<style scoped>
.itinerary-box {
  background-color: #f5f5f5;
}
</style>
