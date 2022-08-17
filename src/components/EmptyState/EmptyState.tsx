import { ReactComponent as EmptyImg } from 'assets/images/undraw_lost.svg'
import { ReactComponent as ErrorImg } from 'assets/images/undraw_road_sign.svg'

import './EmptyState.style.scss'

const EMPTY_STATE_IMAGES = {
  empty: EmptyImg,
  error: ErrorImg
} as const

type EmptyStateProps = {
  variant: keyof typeof EMPTY_STATE_IMAGES
  primaryMessage: string
  className?: string
  children?: React.ReactNode
}

const EmptyState = ({ className = '', variant, primaryMessage, children }: EmptyStateProps) => {
  const EmptyStateImg = EMPTY_STATE_IMAGES[variant]

  return (
    <div className={`empty-state ${className}`} data-testid={`${variant}-section`}>
      <EmptyStateImg className='empty-state__image' />
      <div className='empty-state__message'>
        <h3 className='empty-state__title'>{primaryMessage}</h3>
        <div className='empty-state__detail'>{children}</div>
      </div>
    </div>
  )
}

export default EmptyState
