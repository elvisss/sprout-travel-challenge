<template>
  <div class="itinerary-detail" :class="direction === 'left' ? 'text-start' : 'text-end'">
    <p class="fw-bold mb-0">
      {{ title }}
    </p>
    <p class="mb-0">{{ formattedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { toRef, computed } from 'vue'

interface Props {
  title: string
	date: string
	direction: 'left' | 'right'
}

const props = defineProps<Props>()
const title = toRef(props, 'title')
const date = toRef(props, 'date')
const direction = toRef(props, 'direction')

const formattedDate = computed<string>(() => {
  return moment(date.value).format("MMM D HH:mm A")
})
</script>

<style scoped>
.itinerary-detail {
  min-width: 200px;
  line-height: 25px;
}
</style>
