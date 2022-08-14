import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Country, INITIAL_ITEMS } from '../../utilities/constants'

import CountryCard from '../CountryCard'
import './CountryList.style.scss'

type CountryListProps = {
  isLoading?: boolean
  error?: string
  data: Country[]
}

const DUMMY_COUNTRIES: undefined[] = [...new Array(INITIAL_ITEMS)]

const CountryList = memo(({ isLoading = false, error, data }: CountryListProps) => {
  const navigate = useNavigate()

  const handleViewCountryDetail = (code: string) => {
    navigate(`/${code.toLowerCase()}`)
  }

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
          .slice(0, INITIAL_ITEMS)
          .map(({ cca2, flags, name, population, region, capital }) => (
            <CountryCard
              key={cca2}
              code={cca2}
              flag={flags.svg}
              name={name.common}
              population={population}
              region={region}
              capital={capital}
              onClick={handleViewCountryDetail}
            />
          ))
      )}
    </div>
  )
})

export default CountryList
