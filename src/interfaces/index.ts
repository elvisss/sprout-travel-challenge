export interface FlightsResponse {
  options: Itinerary[]
  carriers: Carriers
}

export interface Carriers {
	UA: string;
	AC: string;
	AM: string;
	DL: string;
	AS: string;
	AA: string;
}

export interface Itinerary {
  itineraryPrice: number
  journeys: Journey[]
  duration: number
}

export interface Journey {
  departureDateTime: string
  arrivalDateTime: string
  segments: Segment[]
  originPlace: NPlace
  destinationPlace: NPlace
  cabinClass: CabinClass
  duration: number
  layovers: Layovers
}

export enum CabinClass {
  Business = 'Business',
  Economy = 'Economy',
  First = 'First',
}

export interface NPlace {
  code: string
  name: string
  cityCode: string
}

export interface Layovers {
  all: any[]
  short: any[]
}

export interface Segment {
  originPlace: NPlace
  destinationPlace: NPlace
  departureDateTime: string
  arrivalDateTime: string
  marketingAirline: string
  marketingFlightNumber: string
  operatingAirline: string
  operatingFlightNumber: string
  duration: number
  fareCategory: CabinClass
  fareBasis: string
  departureDateTimeWithTimeZone: string
  arrivalDateTimeWithTimeZone: string
	fareClasses?: string
	fareFamily?: string
}

export enum Airline {
  UA = 'United Airlines',
  AC = 'Air Canada',
  AM = 'AeroMéxico',
  DL = 'Delta Air Lines',
  AS = 'Alaska Airlines',
  AA = 'American Airlines',
}
