<template>
  <div class="mt-4 d-flex justify-content-center">
    <button
      type="button"
      :disabled="currentPage === 1"
      @click="setPage(1)"
    >
      First
    </button>

    <button
      type="button"
      :disabled="currentPage === 1"
      @click="setPage(currentPage - 1)"
    >
      Previous
    </button>

    <button
      v-for="page of pages"
      :key="page.name"
      @click="setPage(page.name)"
      :disabled="page.isDisabled"
      :class="{ active: currentPage === page.name }"
    >
      {{ page.name }}
    </button>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      @click="setPage(currentPage + 1)"
    >
      Next
    </button>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      @click="setPage(totalPages)"
    >
      Last
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue'

interface Props {
  totalPages: number
  currentPage: number
}

const props = defineProps<Props>()
const currentPage = toRef(props, 'currentPage')
const totalPages = toRef(props, 'totalPages')

const emit = defineEmits(['pageChanged'])

const setPage = (page: number) => {
  emit('pageChanged', page)
}

const maxVisibleButtons = 5

const startPage = computed<number>(() => {
  if (currentPage.value === 1) {
    return 1
  }

  if (currentPage.value === totalPages.value) {
    const start = totalPages.value - (maxVisibleButtons - 1)

    if (start === 0) {
      return 1
    } else {
      return start
    }
  }

  return currentPage.value - 1
})

interface Page {
  name: number
  isDisabled: boolean
}

const pages = computed<Page[]>(() => {
  const range: Page[] = []

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + maxVisibleButtons - 1, totalPages.value);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    })
  }

  return range
})
</script>

<style scoped>
button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  margin-right: 5px;
  padding: 10px;
  transition: all 0.2s;
}

button:hover {
  background-color: #42d392;
}

button:disabled,
button.disabled {
  cursor: not-allowed;
  user-select: none;
  opacity: 0.3;
  background-color: #b8b8b8;
  color: black;
}

button.active {
  background-color: #42d392;
}
</style>
