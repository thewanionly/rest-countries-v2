import useFetchData from './useFetchData'

import { RESOURCES, RESOURCE_ENDPOINTS, ResourceType } from '../constants'
import { mockedCountries, mockedCountryDetail, mockedRegions } from '../../mocks/data'

const RESOURCE_SAMPLE_VALUES = {
  [RESOURCES.COUNTRIES]: mockedCountries,
  [RESOURCES.COUNTRY]: mockedCountryDetail,
  [RESOURCES.REGIONS]: mockedRegions
}

const getResourceSampleValue = <T extends keyof ResourceType>(resource: T): ResourceType[T] => {
  return RESOURCE_SAMPLE_VALUES[resource] as ResourceType[T]
}

/**
 * Fetches the indicated resource through useFetchData
 */
const useResource = <T extends keyof ResourceType>(resource: T, id?: string) => {
  const resourceSampleValue = getResourceSampleValue(resource)
  const url = `${RESOURCE_ENDPOINTS[resource]}${id || ''}`

  return useFetchData<typeof resourceSampleValue>(url)
}

export default useResource
