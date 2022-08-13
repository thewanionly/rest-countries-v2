import { useNavigate, useParams } from 'react-router-dom'

import { RESOURCES } from '../../utilities/constants'
import { useResource } from '../../utilities/hooks'

import CountryDetail from '../../components/CountryDetail'

import './DetailPage.style.scss'

const DetailPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, isLoadingCountry, errorCountry] = useResource(RESOURCES.COUNTRY, code)

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
          <button className='detail-page__back-button' onClick={handleBackClick}>
            Back
          </button>
        </div>
        <div className='detail-page__country-detail'>
          {isLoadingCountry ? (
            <CountryDetail isLoading />
          ) : errorCountry ? (
            <div data-testid='error-section'>{errorCountry}</div>
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
                Object.values(currencies).map(({ name, symbol }) => `${name} (${symbol}})`)
              }
              languages={languages && Object.values(languages)}
              borders={borders}
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

export default DetailPage
