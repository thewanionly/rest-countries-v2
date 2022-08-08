import { useCallback, useEffect, useState } from 'react'

import Dropdown from '../Dropdown'
import { DropdownMenuItem } from '../Dropdown/Dropdown'
import Icon from '../Icon'

import './FilterDropdown.style.scss'

type FilterDropdownProps = {
  className?: string
  placeholder?: string
  onChange?: (value: string) => void
  menuItems: DropdownMenuItem[]
  isLoading?: boolean
}

const FilterDropdown = ({
  className = '',
  placeholder = '',
  onChange: changeHandler,
  menuItems,
  isLoading = false
}: FilterDropdownProps) => {
  const [toggleLabel, setToggleLabel] = useState('')

  const filterMenuItems = menuItems.length
    ? [
        ...menuItems,
        {
          label: 'Show all',
          value: ''
        }
      ]
    : []

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

  useEffect(() => {
    setToggleLabel(placeholder)
  }, [placeholder])

  return (
    <Dropdown
      className={`filter-dropdown ${className}`}
      onChange={handleFilter}
      isLoading={isLoading}
    >
      <Dropdown.Toggle
        className='filter-dropdown__toggle'
        label={!!menuItems.length ? renderLabel : toggleLabel}
      />
      <Dropdown.Menu menuItems={filterMenuItems} />
    </Dropdown>
  )
}

export default FilterDropdown
