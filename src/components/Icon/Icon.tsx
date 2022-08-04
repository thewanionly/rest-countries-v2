import { FaChevronDown, FaMoon, FaRegMoon, FaSearch } from 'react-icons/fa'

type IconProps = {
  className?: string
  name: IconName
}

// Icon name to component mapping
const IconMap = {
  chevron_down: FaChevronDown,
  moon_fill: FaMoon,
  moon_outline: FaRegMoon,
  search: FaSearch
} as const

// Type union of all possible icon names
type IconName = keyof typeof IconMap

// Type union of all possible icon components
type IconComponentType<T> = T[keyof T]

const Icon = ({ className = '', name }: IconProps) => {
  const IconComponent: IconComponentType<typeof IconMap> = IconMap[name]

  return <IconComponent className={`icon ${className}`} data-testid={`icon-${name}`} />
}

export default Icon
