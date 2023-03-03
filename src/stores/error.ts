import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const isError = ref('')

  return {
    // state
    isError,

    // actions
    setError(error: string) {
      isError.value = error
    }
  }
})
