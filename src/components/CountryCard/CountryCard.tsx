import './CountryCard.style.scss'

type CountryCardProps = {
  name: string
}

type CountryCardSkeletonProps = {
  className?: string
}

const CountryCard = ({ name = '' }: CountryCardProps) => {
  return (
    <div data-testid='country-card' className='country-card'>
      <div className='country-card__image'></div>
      <div className='country-card__details'>{name}</div>
    </div>
  )
}

const CountryCardSkeleton = ({ className }: CountryCardSkeletonProps) => {
  return <div data-testid='country-card-skeleton'>Loading...</div>
}

CountryCard.Skeleton = CountryCardSkeleton

export default CountryCard
