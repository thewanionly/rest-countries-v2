import './Skeleton.style.scss'

const SkeletonVariantMap = {
  TEXT: 'text',
  CIRCULAR: 'circular',
  RECTANGULAR: 'rectangular',
  ROUNDED: 'rounded'
} as const

type SkeletonVariant<T> = T[keyof T]

type SkeletonProps = {
  id?: string
  className?: string
  variant?: SkeletonVariant<typeof SkeletonVariantMap>
}

const Skeleton = ({ id, className = '', variant = SkeletonVariantMap.TEXT }: SkeletonProps) => {
  return (
    <div
      className={`skeleton skeleton-animation skeleton__${variant} ${className}`}
      data-testid={id}
    >
      {variant === 'text' ? 'Loading...' : ''}
    </div>
  )
}

export default Skeleton
