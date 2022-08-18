import { lazy, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Country, RESOURCES } from 'utilities/constants'
import { useResource } from 'utilities/hooks'

import Button from 'components/Button'
import CountryDetail from 'components/CountryDetail'
import { BorderCountry } from 'components/CountryDetail/CountryDetail'
import Icon from 'components/Icon'

import './DetailPage.style.scss'

const EmptyState = lazy(() => import('components/EmptyState'))

const DetailPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, isLoadingCountry, errorCountry] = useResource(RESOURCES.COUNTRY, code)
  const [countries = [], isLoadingCountries, errorCountries] = useResource(RESOURCES.COUNTRIES)

  const {
    cca2,
    name,
    flags,
    population,
    region,
    capital,
    subregion,
    tld,
    currencies,
    languages,
    borders
  } = country || {}

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className='detail-page' data-testid='detail-page'>
      <div className='container'>
        <div className='detail-page__top-area'>
          <Button className='detail-page__back-button' onClick={handleBackClick}>
            <Icon name='arrow_left' />
            Back
          </Button>
        </div>
        <div className='detail-page__country-detail'>
          {isLoadingCountry || isLoadingCountries ? (
            <CountryDetail isLoading />
          ) : errorCountry || errorCountries ? (
            <Suspense fallback={<h3>Oops, something went wrong</h3>}>
              <EmptyState variant='error' primaryMessage='Oops, something went wrong'>
                <p>{`Error message: ${errorCountry || errorCountries}`}</p>
                <p> Please check your console for more information.</p>
              </EmptyState>
            </Suspense>
          ) : (
            <CountryDetail
              code={cca2}
              name={name?.common}
              nativeName={name?.nativeName && getNativeNames(name.nativeName, languages)}
              flag={flags?.svg}
              population={population}
              region={region}
              subregion={subregion}
              capital={capital}
              topLevelDomain={tld}
              currencies={
                currencies &&
                Object.values(currencies).map(({ name, symbol }) => `${name} (${symbol})`)
              }
              languages={languages && Object.values(languages)}
              borders={borders && getBorders(borders, countries)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const getNativeNames = (
  nativeName: {
    [key: string]: {
      common: string
      official: string
    }
  },
  languages: { [key: string]: string }
): string[] => {
  return Object.keys(languages).map((language) => nativeName[language].common)
}

export const getBorders = (borders: string[], countries: Country[]): BorderCountry[] =>
  borders.map((borderCode) => {
    const { cca2, name } = countries.find(({ cca3 }) => borderCode === cca3) || {}

    return { cca2: cca2 || '', name: name?.common || '' }
  })

export default DetailPage
