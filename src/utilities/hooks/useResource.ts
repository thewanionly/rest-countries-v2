import useFetchData from './useFetchData'

import { Resource, RESOURCE_ENDPOINTS } from '../constants'

/**
 * Fetches the indicated resource through useFetchData
 */
const useResource = <T>(resource: Resource) => useFetchData<T>(RESOURCE_ENDPOINTS[resource])

export default useResource
