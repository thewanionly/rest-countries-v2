import { memo, useEffect, useState } from 'react'

import { COUNTRIES_ALL, FIELDS_FILTER, PAGE_LIMIT } from '../../utilities/constants'
import { fetchData } from '../../utilities/helpers'

type Country = {
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

const DUMMY_COUNTRIES: undefined[] = [...new Array(PAGE_LIMIT)]

const CountryList = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCountries = async () => {
      const url = `${COUNTRIES_ALL}${FIELDS_FILTER}`

      // Fetching
      setIsLoading(true)
      setCountries([])
      setError(null)

      try {
        const data = await fetchData<Country[]>(url)

        // Success
        setIsLoading(false)
        setCountries(data)
        setError(null)
      } catch (err: any) {
        // Error
        setIsLoading(false)
        setCountries([])
        setError(err?.message || '')
      }
    }

    loadCountries()
  }, [])

  return (
    <div className='country-list'>
      {isLoading ? (
        DUMMY_COUNTRIES.map((_, index) => <CountryCard.Skeleton key={index} />)
      ) : error ? (
        <div data-testid='error-section'>{error}</div>
      ) : !countries.length ? (
        <div data-testid='empty-section'>No countries found</div>
      ) : (
        countries
          ?.sort((country1, country2) => country1.name.common.localeCompare(country2.name.common))
          .slice(0, PAGE_LIMIT)
          .map((country) => <CountryCard key={country.cca2} name={country.name.common} />)
      )}
    </div>
  )
})

type CountryCardProps = {
  name: string
}

const CountryCard = ({ name = '' }: CountryCardProps) => {
  return <div data-testid='country-card'>{name}</div>
}

type CountryCardSkeletonProps = {
  className?: string
}

const CountryCardSkeleton = ({ className }: CountryCardSkeletonProps) => {
  return <div data-testid='country-card-skeleton'>Loading...</div>
}

CountryCard.Skeleton = CountryCardSkeleton

export default CountryList
