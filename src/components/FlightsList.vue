<!-- <template>
  <div class="d-flex justify-content-between">
    <div class="d-flex">
      <div class="mr-5">
        <img src="" alt="">
      </div>
      <div>
        <div class="font-weight">SAN</div>
        <div>Jun 27 7:34: AM</div>
      </div>
    </div>
    <div>2</div>
    <div class="text-right">
      <div class="font-weight">SAN</div>
      <div>Jun 27 7:34: AM</div>
    </div>
  </div>
</template>

<style scoped>
</style> -->


<template>
  <ul>
    <li
      v-for="(flight, index) in flights"
      :key="index"
    >
      duration: {{ flight.duration }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import type { Itinerary } from '@/interfaces';

interface Props {
  flights: Itinerary[]
}

const props = defineProps<Props>()
const flights = toRef(props, 'flights')
</script>

<style scoped></style>
