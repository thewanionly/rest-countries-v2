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

  const handleFilter = (item: DropdownMenuItem) => {
    changeHandler?.(item.value)
    setToggleLabel(item.label)
  }

  return (
    <Dropdown className={className} onChange={handleFilter}>
      <Dropdown.Toggle label={toggleLabel} />
      <Dropdown.Menu menuItems={menuItems} />
    </Dropdown>
  )
}

export default FilterDropdown
