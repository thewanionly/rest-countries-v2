import { useEffect, useState } from 'react'

import { fetchData } from 'utilities/helpers'

/**
 * Fetches data using the native Fetch API through the `fetchData` helper function.
 */
const useFetchData = <T>(url: string, cacheResults?: boolean): [T, boolean, undefined] => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState()

  useEffect(() => {
    const loadData = async () => {
      // Fetching
      setIsLoading(true)
      setData(undefined)
      setError(undefined)

      try {
        let data: T

        // Get cachced data from localStorage
        const cachedData = localStorage.getItem(url)

        if (cachedData) {
          // Parse data from localStorage
          data = JSON.parse(cachedData)
        } else {
          // Fetch data from url
          data = await fetchData<T>(url)

          // Cache data by storing in localStorage
          cacheResults && localStorage.setItem(url, JSON.stringify(data))
        }

        // Success
        setIsLoading(false)
        setData(data)
        setError(undefined)
      } catch (err: any) {
        if (typeof jest === 'undefined') {
          console.error(err)
        }

        // Error
        setIsLoading(false)
        setData(undefined)
        setError(err?.message || '')
      }
    }

    loadData()
  }, [url, cacheResults])

  return [data as T, isLoading, error]
}

export default useFetchData
