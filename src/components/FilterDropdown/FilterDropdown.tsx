import { memo, useCallback, useEffect, useState } from 'react'

import Dropdown from 'components/Dropdown'
import { DropdownMenuItem } from 'components/Dropdown/Dropdown'
import Icon from 'components/Icon'

import './FilterDropdown.style.scss'

type FilterDropdownProps = {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  menuItems: DropdownMenuItem[]
  isLoading?: boolean
}

const FilterDropdown = memo(
  ({
    className = '',
    placeholder = '',
    value,
    onChange: changeHandler,
    menuItems,
    isLoading = false
  }: FilterDropdownProps) => {
    const [toggleLabel, setToggleLabel] = useState('')

    console.log('FilterDropdown')

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
      setToggleLabel(
        (value && menuItems.find((item) => item.value === value)?.label) || placeholder
      )
    }, [value, placeholder, menuItems])

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
)

export default FilterDropdown
