import useFetchData from './useFetchData'

import { RESOURCES, RESOURCE_ENDPOINTS, ResourceType } from '../constants'
import { mockedCountries, mockedRegions } from '../../mocks/data'

const RESOURCE_SAMPLE_VALUES = {
  [RESOURCES.COUNTRIES]: mockedCountries,
  [RESOURCES.COUNTRY]: mockedCountries[0],
  [RESOURCES.REGIONS]: mockedRegions
}

const getResourceSampleValue = <T extends keyof ResourceType>(resource: T): ResourceType[T] => {
  return RESOURCE_SAMPLE_VALUES[resource] as ResourceType[T]
}

/**
 * Fetches the indicated resource through useFetchData
 */
const useResource = <T extends keyof ResourceType>(resource: T) => {
  const resourceSampleValue = getResourceSampleValue(resource)

  return useFetchData<typeof resourceSampleValue>(RESOURCE_ENDPOINTS[resource])
}

export default useResource
