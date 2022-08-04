import { memo, useEffect, useState } from 'react'

import { COUNTRIES_ALL, FIELDS_FILTER } from '../../utilities/constants'
import { fetchData } from '../../utilities/helpers'

type Countries = {
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

const CountryList = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [countries, setCountries] = useState<Countries[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCountries = async () => {
      const url = `${COUNTRIES_ALL}${FIELDS_FILTER}`

      try {
        // Set loading true
        setIsLoading(true)

        // Fetch data
        const data = await fetchData<Countries[]>(url)
        // console.log('CountryList data', data)

        // Set data
        setCountries(data)

        // Set loading false
        setIsLoading(false)
      } catch (err) {
        // Set error
        setError(err as string)

        // Set loading false
        setIsLoading(false)
      }
    }

    loadCountries()
  }, [])

  return (
    <div>
      {isLoading && 'Loading...'}
      {error}
      {countries?.map((country) => (
        <CountryCard key={country.cca2} name={country.name.common} />
      ))}
    </div>
  )
})

const CountryCard = ({ name }: { name: string }) => {
  return <div data-testid='country-card'>{name}</div>
}

export default CountryList
