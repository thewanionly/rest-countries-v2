import { memo, useCallback, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Country, INITIAL_ITEMS } from 'utilities/constants'

import CountryCard from 'components/CountryCard'
import { StoreContext } from 'store/StoreProvider'

import './CountryList.style.scss'

type CountryListProps = {
  isLoading?: boolean
  data?: Country[]
}

const DUMMY_COUNTRIES: undefined[] = [...new Array(INITIAL_ITEMS)]

const CountryList = memo(({ isLoading = false, data }: CountryListProps) => {
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
      {isLoading
        ? DUMMY_COUNTRIES.map((_, index) => <CountryCard key={index} isLoading />)
        : data
            ?.slice(0, limit)
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
            ))}
      <span ref={loader} className='country-list__loader' aria-hidden />
    </div>
  )
})

export default CountryList
