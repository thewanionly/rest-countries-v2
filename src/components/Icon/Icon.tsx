import React from 'react'
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaMoon,
  FaRegMoon,
  FaSearch,
  FaTimes
} from 'react-icons/fa'

import './Icon.style.scss'

export type IconProps = {
  name: IconName
  className?: string
  onClick?: (event: React.MouseEvent<SVGElement>) => void
}

// Icon name to component mapping
const IconMap = {
  arrow_left: FaArrowLeft,
  chevron_down: FaChevronDown,
  chevron_left: FaChevronLeft,
  chevron_right: FaChevronRight,
  chevron_up: FaChevronUp,
  moon_fill: FaMoon,
  moon_outline: FaRegMoon,
  search: FaSearch,
  close: FaTimes
} as const

// Type union of all possible icon names
type IconName = keyof typeof IconMap

// Type union of all possible icon components
type IconComponentType<T> = T[keyof T]

const Icon = ({ className = '', name, onClick }: IconProps) => {
  const IconComponent: IconComponentType<typeof IconMap> = IconMap[name]

  return (
    <IconComponent
      className={`icon ${onClick ? 'icon--clickable' : ''} ${className}`}
      onClick={onClick}
      data-testid={`icon-${name}`}
    />
  )
}

export default Icon
