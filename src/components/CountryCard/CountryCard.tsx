import { formatNumber, titleCase } from '../../utilities/helpers'
import Skeleton from '../Skeleton'
import './CountryCard.style.scss'

type CountryCardProps = {
  code?: string
  flag?: string
  name?: string
  population?: number
  region?: string
  capital?: string[]
  isLoading?: boolean
  onClick?: (countryCode: string) => void
}

const CountryCard = ({
  code,
  name,
  flag,
  population,
  region,
  capital,
  isLoading = false,
  onClick
}: CountryCardProps) => {
  const descriptionList = Object.entries({
    population: population ? formatNumber(population) : '',
    region,
    capital: capital?.join(', ')
  })

  const handleCardClick = () => {
    onClick && code && onClick(code)
  }

  return (
    <div
      data-testid={!isLoading ? 'country-card' : 'country-card-skeleton'}
      className={`country-card ${isLoading ? 'country-card-skeleton' : ''} ${
        onClick ? 'country-card--clickable' : ''
      }`}
      onClick={onClick && handleCardClick}
    >
      <div className='country-card__image-container'>
        {!isLoading ? (
          flag && (
            <img
              className='country-card__image'
              data-testid='country-card-flag'
              src={flag}
              alt={`${name}'s flag`}
            />
          )
        ) : (
          <Skeleton variant='rectangular' />
        )}
      </div>
      <div className='country-card__details'>
        <h3 className='country-card__name' data-testid='country-card-name'>
          {!isLoading ? name : <Skeleton />}
        </h3>
        <div className='description-list country-card__description-list'>
          {descriptionList.map(([label, value], index) => (
            <div key={label} className='description-item country-card__description-item'>
              {!isLoading ? (
                <>
                  <span className='description-label country-card__description-label'>
                    {titleCase(label)}
                  </span>
                  <span
                    className='description-value country-card__description-value'
                    data-testid='country-card-description-value'
                  >
                    {value}
                  </span>
                </>
              ) : (
                <Skeleton
                  className={`country-card-skeleton__text--${index % 2 === 0 ? '80' : '50'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CountryCard
