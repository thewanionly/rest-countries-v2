import { mockedCountries, mockedCountryDetail, mockedRegions } from 'mocks/data'
import { RESOURCES, RESOURCE_ENDPOINTS, ResourceType } from 'utilities/constants'
import { useFetchData } from 'utilities/hooks'

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

  let url: string = RESOURCE_ENDPOINTS[resource]
  if (id) url = url.replace(':id', id)

  return useFetchData<typeof resourceSampleValue>(url, true)
}

export default useResource
