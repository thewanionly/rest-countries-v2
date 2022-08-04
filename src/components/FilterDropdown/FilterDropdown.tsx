import { useState } from 'react'

import Dropdown from '../Dropdown'
import { DropdownMenuItem } from '../Dropdown/Dropdown'

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

  return (
    <Dropdown className={className} onChange={handleFilter}>
      <Dropdown.Toggle label={toggleLabel} />
      <Dropdown.Menu menuItems={filterMenuItems} />
    </Dropdown>
  )
}

export default FilterDropdown
