import Skeleton from '../Skeleton'
import './CountryCard.style.scss'

type CountryCardProps = {
  flag?: string
  name?: string
  population?: number
  region?: string
  capital?: string[]
  isLoading?: boolean
}

const CountryCard = ({
  name,
  flag,
  population,
  region,
  capital,
  isLoading = false
}: CountryCardProps) => {
  return (
    <div
      data-testid={!isLoading ? 'country-card' : 'country-card-skeleton'}
      className={`country-card ${isLoading ? 'country-card-skeleton' : ''}`}
    >
      <div className='country-card__image'>
        {!isLoading ? (
          flag && <img src={flag} alt={`${name}'s flag`} />
        ) : (
          <Skeleton className='country-card-skeleton__image' variant='rectangular' />
        )}
      </div>
      <div className='country-card__details'>
        <h4 className='country-card__name' data-testid='country-card-name'>
          {!isLoading ? name : <Skeleton />}
        </h4>
        <dl>
          <dt>Population:</dt>
          <dd>{population}</dd>
          <dt>Region:</dt>
          <dd>{region}</dd>
          <dt>Capital:</dt>
          <dd>{capital?.join(', ')}</dd>
        </dl>
      </div>
    </div>
  )
}

export default CountryCard
