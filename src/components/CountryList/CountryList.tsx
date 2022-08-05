import { memo } from 'react'

import { Country, PAGE_LIMIT, RESOURCES } from '../../utilities/constants'
import { useResource } from '../../utilities/hooks'

const DUMMY_COUNTRIES: undefined[] = [...new Array(PAGE_LIMIT)]

const CountryList = memo(() => {
  const { data: countries = [], isLoading, error } = useResource<Country[]>(RESOURCES.COUNTRIES)

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
