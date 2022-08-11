import { memo } from 'react'

import { Country, PAGE_LIMIT } from '../../utilities/constants'

import CountryCard from '../CountryCard'
import './CountryList.style.scss'

type CountryListProps = {
  isLoading?: boolean
  error?: string
  data: Country[]
}

const DUMMY_COUNTRIES: undefined[] = [...new Array(PAGE_LIMIT)]

const CountryList = memo(({ isLoading = false, error, data }: CountryListProps) => {
  return (
    <div className='country-list'>
      {isLoading ? (
        DUMMY_COUNTRIES.map((_, index) => <CountryCard key={index} isLoading />)
      ) : error ? (
        <div data-testid='error-section'>{error}</div>
      ) : !data.length ? (
        <div data-testid='empty-section'>No countries found</div>
      ) : (
        data
          .slice(0, PAGE_LIMIT)
          .map(({ cca2, flags, name, population, region, capital }) => (
            <CountryCard
              key={cca2}
              flag={flags.svg}
              name={name.common}
              population={population}
              region={region}
              capital={capital}
            />
          ))
      )}
    </div>
  )
})

export default CountryList
