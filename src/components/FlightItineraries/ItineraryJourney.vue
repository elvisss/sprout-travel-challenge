<template>
  <div :class="['bg-white p-4 d-flex justify-content-between', isEven ? 'mb-3' : '']">
    <img
      class="journey-image me-5"
      :src="airline.image"
      :alt='airline.name'
      :title='airline.name'
    />
    <div class="flex-grow-1 d-flex justify-content-between">
      <ItineraryDetail
        :title='journey.originPlace.code'
        :direction="'left'"
        :date='journey.departureDateTime'
      />
      <div class="journey-detail text-center">
        <div class="journey-airline mb-2">
          {{ airline.name }}
        </div>
        <div>
          <span>{{ journeyDuration }} - {{ totalScales > 0 ? `${totalScales} scales` : 'nonstop' }}</span>
        </div>
      </div>
      <ItineraryDetail
        :title='journey.destinationPlace.code'
        :direction="'right'"
        :date='journey.arrivalDateTime'
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue'
import type { Journey } from '@/interfaces'
import { Airline as AirlineEnum } from '@/interfaces';
import ItineraryDetail from './ItineraryDetail.vue';
import { numToTime } from '@/utils';

interface Props {
  journey: Journey
  isEven: boolean
}

interface Airline {
  image: string
  name: string
}

const props = defineProps<Props>()
const journey = toRef(props, 'journey')

const airline = computed<Airline>(() => {
  const marketingAirline = journey.value.segments[0].marketingAirline || journey.value.segments[0].operatingAirline
  return {
    image: `/logos/${ marketingAirline }.jpg`,
    name: (AirlineEnum as any)[marketingAirline]
  }
})

// TODO: validate if we need to plus 'all' and 'short'
const totalScales = computed<number>(() => {
  return journey.value.layovers.all.length
})

const journeyDuration = computed<string>(() => {
  return numToTime(journey.value.duration)
})
</script>

<style lang='scss' scoped>
.journey-image {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 5px;
}

.journey-detail {
  width: 200px;
}

.journey-airline {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    bottom: -6px;
    border-radius: 2px;
    background-color: #cfcfcf;
  }
}
</style>
