import { BASE_API, FIELDS_FILTER } from './base'

export const RESOURCES = {
  COUNTRIES: 'countries',
  COUNTRY: 'country',
  REGIONS: 'regions'
} as const

export const RESOURCE_ENDPOINTS = {
  [RESOURCES.COUNTRIES]: `${BASE_API}all?fields=${FIELDS_FILTER}`,
  [RESOURCES.COUNTRY]: `${BASE_API}alpha/`,
  [RESOURCES.REGIONS]: `${BASE_API}all?fields=region`
} as const

type ResourceGeneric<T> = T[keyof T]
export type Resource = ResourceGeneric<typeof RESOURCES>

export type Country = {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        common: string
        official: string
      }
    }
  }
  cca2: string
  capital: string[]
  region: string
  flag: string
  population: number
}

export type Region = {
  region: string
}
