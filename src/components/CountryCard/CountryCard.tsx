type CountryCardProps = {
  name: string
}

type CountryCardSkeletonProps = {
  className?: string
}

const CountryCard = ({ name = '' }: CountryCardProps) => {
  return <div data-testid='country-card'>{name}</div>
}

const CountryCardSkeleton = ({ className }: CountryCardSkeletonProps) => {
  return <div data-testid='country-card-skeleton'>Loading...</div>
}

CountryCard.Skeleton = CountryCardSkeleton

export default CountryCard
