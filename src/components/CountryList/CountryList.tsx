import { memo, useContext } from 'react'

import { PAGE_LIMIT, RESOURCES } from '../../utilities/constants'
import { useResource } from '../../utilities/hooks'

import { StoreContext } from '../../store/StoreProvider'
import CountryCard from '../CountryCard'
import './CountryList.style.scss'

const DUMMY_COUNTRIES: undefined[] = [...new Array(PAGE_LIMIT)]

const CountryList = memo(() => {
  const { searchTerm, filterValue } = useContext(StoreContext)
  const [countries = [], isLoading, error] = useResource(RESOURCES.COUNTRIES)

  return (
    <div className='country-list'>
      {isLoading ? (
        DUMMY_COUNTRIES.map((_, index) => <CountryCard key={index} isLoading />)
      ) : error ? (
        <div data-testid='error-section'>{error}</div>
      ) : !countries.length ? (
        <div data-testid='empty-section'>No countries found</div>
      ) : (
        countries
          ?.filter(
            (country) =>
              (!searchTerm ||
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) &&
              (!filterValue || country.region.toLowerCase() === filterValue.toLowerCase())
          )
          .sort((country1, country2) => country1.name.common.localeCompare(country2.name.common))
          .slice(0, PAGE_LIMIT)
          .map((country) => (
            <CountryCard
              key={country.cca2}
              flag={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))
      )}
    </div>
  )
})

export default CountryList
