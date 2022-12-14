import { useNavigate } from 'react-router-dom'

import { camelCaseToStandardFormat, formatNumber } from 'utilities/helpers'

import Button from 'components/Button'
import Skeleton from 'components/Skeleton'

import './CountryDetail.style.scss'

export type BorderCountry = {
  cca2: string
  name: string
}

type CountryDetailProps = {
  code?: string
  flag?: string
  name?: string
  nativeName?: string[]
  population?: number
  region?: string
  subregion?: string
  capital?: string[]
  topLevelDomain?: string[]
  currencies?: string[]
  languages?: string[]
  borders?: BorderCountry[]
  isLoading?: boolean
}

const CountryDetail = ({
  code,
  name,
  nativeName,
  flag,
  population,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders,
  isLoading = false
}: CountryDetailProps) => {
  const navigate = useNavigate()

  const handleViewCountryDetail = (code: string) => {
    navigate(`/${code.toLowerCase()}`)
  }

  const primaryDescriptionList = Object.entries({
    nativeName: nativeName?.join(', '),
    population: population ? formatNumber(population) : '',
    region,
    subRegion: subregion,
    capital: capital?.join(', ')
  })

  const otherDescriptionList = Object.entries({
    topLevelDomain: topLevelDomain?.join(', '),
    currencies: currencies?.join(', '),
    languages: languages?.join(', ')
  })

  return (
    <div
      className='country-detail'
      data-testid={!isLoading ? 'country-detail' : 'country-detail-skeleton'}
    >
      <div className='country-detail__image-container'>
        {!isLoading ? (
          flag && <img className='country-detail__image' src={flag} alt={`${code} wide flag`} />
        ) : (
          <Skeleton className='country-detail-skeleton__image' variant='rectangular' />
        )}
      </div>
      <div className='country-detail__info'>
        <div className='country-detail__header'>
          <h2 className='country-detail__name'>
            {' '}
            {!isLoading ? name : <Skeleton className='country-detail-skeleton__text--80' />}
          </h2>
        </div>
        <div className='country-detail__description'>
          <div className='country-detail__description-list country-detail__description-list--primary'>
            {primaryDescriptionList.map(([label, value], index) => (
              <div key={label} className='description-item'>
                {!isLoading ? (
                  <>
                    <span className='description-label' id={label}>
                      {camelCaseToStandardFormat(label)}
                    </span>
                    <span
                      className={`description-value ${!value ? 'description-value--empty' : ''}`}
                      aria-labelledby={label}
                    >
                      {value || '-'}
                    </span>
                  </>
                ) : (
                  <Skeleton
                    className={`country-detail-skeleton__text--${index % 2 === 0 ? '65' : '40'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='country-detail__description-list country-detail__description-list--other'>
            {otherDescriptionList.map(([label, value], index) => (
              <div key={label} className='description-item'>
                {!isLoading ? (
                  <>
                    <span className='description-label' id={label}>
                      {camelCaseToStandardFormat(label)}
                    </span>
                    <span
                      className={`description-value ${!value ? 'description-value--empty' : ''}`}
                      aria-labelledby={label}
                    >
                      {value || '-'}
                    </span>
                  </>
                ) : (
                  <Skeleton
                    className={`country-detail-skeleton__text--${index % 2 === 0 ? '65' : '40'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='country-detail__borders'>
          <h3 className='country-detail__border-label' id='borders'>
            {!isLoading ? (
              'Border Countries:'
            ) : (
              <Skeleton className='country-detail-skeleton__text--80' />
            )}
          </h3>
          <div className='country-detail__border-list' data-testid='border-list'>
            {!isLoading ? (
              borders && !!borders.length ? (
                borders.map(({ cca2, name }) => (
                  <Button
                    key={cca2}
                    className='country-detail__border-value'
                    onClick={() => handleViewCountryDetail(cca2)}
                    label={name}
                  />
                ))
              ) : (
                <span aria-labelledby='borders' className='country-detail__border-value--empty'>
                  No border countries
                </span>
              )
            ) : (
              <>
                <Skeleton className='country-detail-skeleton__text--25' />
                <Skeleton className='country-detail-skeleton__text--25' />
                <Skeleton className='country-detail-skeleton__text--25' />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail
