import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  return {
    // state
    isLoading,

    // actions
    setLoading(loading: boolean) {
      isLoading.value = loading
    }
  }
})
