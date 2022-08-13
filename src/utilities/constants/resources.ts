import { BASE_API, COUNTRIES_ALL_FIELDS } from './base'

export const RESOURCES = {
  COUNTRIES: 'countries',
  COUNTRY: 'country',
  REGIONS: 'regions'
} as const

export const RESOURCE_ENDPOINTS = {
  [RESOURCES.COUNTRIES]: `${BASE_API}all?fields=${COUNTRIES_ALL_FIELDS}`,
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
  flags: { [key: string]: string }
  population: number
}

export type CountryDetail =
  | Country & {
      subregion: string
      tld: string[]
      currencies: { [key: string]: { name: string; symbol: string } }
      languages: { [key: string]: string }
      borders: string[]
    }

export type Region = {
  region: string
}

export type ResourceType = {
  [RESOURCES.COUNTRIES]: Country[]
  [RESOURCES.COUNTRY]: CountryDetail
  [RESOURCES.REGIONS]: Region[]
}
