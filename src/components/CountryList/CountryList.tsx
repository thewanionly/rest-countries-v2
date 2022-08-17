import { memo, useCallback, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as EmptyImg } from 'assets/images/undraw_lost.svg'
import { ReactComponent as ErrorImg } from 'assets/images/undraw_road_sign.svg'
import { Country, INITIAL_ITEMS } from 'utilities/constants'

import CountryCard from 'components/CountryCard'
import { StoreContext } from 'store/StoreProvider'

import './CountryList.style.scss'

type CountryListProps = {
  isLoading?: boolean
  error?: string
  data: Country[]
}

const DUMMY_COUNTRIES: undefined[] = [...new Array(INITIAL_ITEMS)]

const CountryList = memo(({ isLoading = false, error, data }: CountryListProps) => {
  const loader = useRef(null)
  const { limit, handleIncreaseLimit } = useContext(StoreContext)
  const navigate = useNavigate()

  const handleViewCountryDetail = (code: string) => {
    navigate(`/${code.toLowerCase()}`)
  }

  const handleLoadMore: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0]

      if (target.isIntersecting) {
        handleIncreaseLimit()
      }
    },
    [handleIncreaseLimit]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleLoadMore, {
      root: null,
      rootMargin: '20px',
      threshold: 0
    })

    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [handleLoadMore, loader])

  return (
    <div className='country-list'>
      {isLoading ? (
        <div className='country-list__card-grid'>
          {DUMMY_COUNTRIES.map((_, index) => (
            <CountryCard key={index} isLoading />
          ))}
        </div>
      ) : error ? (
        <div className='country-list__empty-section' data-testid='error-section'>
          <ErrorImg className='country-list__empty-image' />
          <div className='country-list__empty-message'>
            <h3 className='country-list__empty-message-title'>Oops, something went wrong</h3>
            <div className='country-list__empty-message-detail'>
              <p>{`Error message: ${error}`}</p>
              <p> Please check your console for more information.</p>
            </div>
          </div>
        </div>
      ) : !data.length ? (
        <div className='country-list__empty-section' data-testid='empty-section'>
          <EmptyImg className='country-list__empty-image' />
          <div className='country-list__empty-message'>
            <h3 className='country-list__empty-message-title'>No countries found</h3>
          </div>
        </div>
      ) : (
        <div className='country-list__card-grid'>
          {data.slice(0, limit).map(({ cca2, flags, name, population, region, capital }) => (
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
          ))}
        </div>
      )}
      <span ref={loader} className='country-list__loader' aria-hidden />
    </div>
  )
})

export default CountryList
