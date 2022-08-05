import { useEffect, useState } from 'react'
import { fetchData } from '../helpers'

/**
 * Fetches data using the native Fetch API through the `fetchData` helper function.
 */
const useFetchData = <T>(url: string) => {
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
        const data = await fetchData<T>(url)

        // Success
        setIsLoading(false)
        setData(data)
        setError(undefined)
      } catch (err: any) {
        // Error
        setIsLoading(false)
        setData(undefined)
        setError(err?.message || '')
      }
    }

    loadData()
  }, [url])

  return { data, isLoading, error }
}

export default useFetchData
