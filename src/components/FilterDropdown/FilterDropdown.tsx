import { useCallback, useState } from 'react'

import Dropdown from '../Dropdown'
import { DropdownMenuItem } from '../Dropdown/Dropdown'
import Icon from '../Icon'

import './FilterDropdown.style.scss'

type FilterDropdownProps = {
  className?: string
  placeholder?: string
  onChange?: (value: string) => void
  menuItems: DropdownMenuItem[]
}

const FilterDropdown = ({
  className = '',
  placeholder = '',
  onChange: changeHandler,
  menuItems
}: FilterDropdownProps) => {
  const [toggleLabel, setToggleLabel] = useState(placeholder)

  const filterMenuItems = [
    ...menuItems,
    {
      label: 'Show all',
      value: ''
    }
  ]

  const handleFilter = (item: DropdownMenuItem) => {
    changeHandler?.(item.value)

    setToggleLabel(item.value === '' ? placeholder : item.label)
  }

  const renderLabel = useCallback(
    (isMenuOpen: boolean, handleToggleMenu: () => void) => {
      const handleClick = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation()
        handleToggleMenu()
      }

      return (
        <>
          {toggleLabel}
          <Icon name={isMenuOpen ? 'chevron_up' : 'chevron_down'} onClick={handleClick} />
        </>
      )
    },
    [toggleLabel]
  )

  return (
    <Dropdown className={`filter-dropdown ${className}`} onChange={handleFilter}>
      <Dropdown.Toggle className='filter-dropdown__toggle' label={renderLabel} />
      <Dropdown.Menu menuItems={filterMenuItems} />
    </Dropdown>
  )
}

const renderLabel2 = (label: string) => {
  return (
    <>
      {label}
      <Icon name='chevron_down' />
    </>
  )
}

export default FilterDropdown
