import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import sproutApi from '@/api/sprout-api'
import * as flightsResponse from '@/assets/json/sprout.json'
import type { FlightsResponse, Itinerary } from '@/interfaces'
import { useFlightsStore } from '@/stores/flights'
import { useLoadingStore } from '@/stores/loading'
import { useErrorStore } from '@/stores/error'

const useFlights = () => {
  const router = useRouter()

  const flihgtsStore = useFlightsStore()
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  const { filteredItineraries, currentPage, totalPages } =
    storeToRefs(flihgtsStore)
  const { isLoading } = storeToRefs(loadingStore)
  const { isError } = storeToRefs(errorStore)

  const getItinerariesFromApi = async (): Promise<Itinerary[] | null> => {
    try {
      const { data } = await sproutApi.get<FlightsResponse>(
        '/sprout/example'
      )
      if (!data.options) {
        throw new Error('Body response error')
      }
      return data.options
    } catch (error: any) {
      console.log(error)
      errorStore.setError(error.message || '')
      return null
    }
  }

  const getItinerariesFromJsonStatic = (): Itinerary[] | null => {
    try {
      const json = flightsResponse as unknown as FlightsResponse
      return json.options
    } catch (error: any) {
      errorStore.setError(error.message || '')
      return null
    }
  }

  const getItineraries = async (): Promise<void> => {
    loadingStore.setLoading(true)

    let itineraries: Itinerary[] | null

    itineraries = await getItinerariesFromApi()

    if (!itineraries) {
      itineraries = getItinerariesFromJsonStatic()
    }
    
    loadingStore.setLoading(false)

    if (!itineraries) {
      router.push({ name: 'error' })
      return
    }

    flihgtsStore.setItineraries(itineraries)
  }

  getItineraries()

  return {
    // properties
    filteredItineraries,

    isLoading,
    isError,

    currentPage,
    totalPages,

    // methods
    setPage: flihgtsStore.setPage,
  }
}

export default useFlights
