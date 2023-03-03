import { storeToRefs } from 'pinia'
import sproutApi from '@/api/sprout-api'
import * as flightsResponse from '@/assets/json/sprout.json'
import type { FlightsResponse } from '@/interfaces'
import { useFlightsStore } from '@/stores/flights'
import { useLoadingStore } from '@/stores/loading'
import { useErrorStore } from '@/stores/error'

const useFlights = () => {
  const flihgtsStore = useFlightsStore()
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  const { itineraries, currentPage, totalPages } = storeToRefs(flihgtsStore)
  const { isLoading } = storeToRefs(loadingStore)
  const { isError } = storeToRefs(errorStore)

  const getItineraries = async (): Promise<void> => {
		loadingStore.setLoading(true)
    /* await new Promise(resolve => {
			setTimeout(() => resolve(true), 1500)
		}) */

    try {
      /* const { data } = await sproutApi.get<FlightsResponse>('/sprout/example')
      flihgtsStore.setItineraries(data.options) */
      const json = (flightsResponse as unknown as FlightsResponse)
      flihgtsStore.setItineraries(json.options)
    } catch (error) {
      console.log(error)
      errorStore.setError(true)
    } finally {
      loadingStore.setLoading(false)
    }
  }

  getItineraries()

  return {
    // properties
    itineraries,

    isLoading,
    isError,

    currentPage,
    totalPages,

    // methods
    setPage: flihgtsStore.setPage,
  }
}

export default useFlights
