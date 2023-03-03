import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const isError = ref(false)

  return {
    // state
    isError,

    // actions
    setError(error: boolean) {
      isError.value = error
    }
  }
})
