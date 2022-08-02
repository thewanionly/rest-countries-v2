import Dropdown from '../Dropdown'
import { DropdownMenuItem } from '../Dropdown/Dropdown'

type FilterDropdownProps = {
  className?: string
  label: string
  menuItems: DropdownMenuItem[]
}

const FilterDropdown = ({ className = '', label, menuItems }: FilterDropdownProps) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle label={label} />
      <Dropdown.Menu menuItems={menuItems} />
    </Dropdown>
  )
}

export default FilterDropdown
