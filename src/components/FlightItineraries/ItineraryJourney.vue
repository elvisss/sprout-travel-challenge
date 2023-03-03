<template>
  <div :class="['bg-white p-4 d-flex justify-content-between', isEven ? 'mb-3' : '']">
    <img
      class="journey-image me-5"
      :src="airlineItem.source"
      :alt='airlineItem.title'
      :title='airlineItem.title'
    />
    <div class="flex-grow-1 d-flex justify-content-between">
      <ItineraryDetail
        :title='journey.originPlace.code'
        :direction="'left'"
        :date='journey.departureDateTime'
      />
      <div class="journey-detail text-center">
        <div class="journey-airline mb-2">
          {{ airlineItem.title }}
        </div>
        <div>
          <span>{{ journeyDuration }} - {{ hasScales ? 'with scales' : 'nonstop' }}</span>
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
import { Airline } from '@/interfaces';
import ItineraryDetail from './ItineraryDetail.vue';
import { numToTime } from '@/utils';

interface Props {
  journey: Journey
  isEven: boolean
}

interface AirlineItem {
  source: string
  title: any
}

const props = defineProps<Props>()
const journey = toRef(props, 'journey')

const airlineItem = computed<AirlineItem>(() => {
  return {
    source: `/logos/${ journey.value.segments[0].marketingAirline }.jpg`,
    title: (Airline as any)[journey.value.segments[0].marketingAirline]
  }
})

const hasScales = computed<boolean>(() => {
  return (journey.value.layovers.all.length || journey.value.layovers.short.length) > 0
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
    bottom: -8px;
    border-radius: 2px;
    background-color: #cfcfcf;
  }
}
</style>
