import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import './Dropdown.style.scss'

export type DropdownMenuItem = {
  label: string
  value: string
}

type DropdownProps = {
  className?: string
  children: React.ReactNode
}

type DropdownToggleProps = {
  className?: string
  label: string
}

type DropdownMenuProps = {
  className?: string
  menuItemClassName?: string
  menuItems: DropdownMenuItem[]
  defaultSelected?: DropdownMenuItem
}

type DropdownContextValue = {
  isMenuOpen: boolean
  handleToggleMenu: () => void
  selectedItem: DropdownMenuItem | undefined
  handleSelectItem: (menuItem: DropdownMenuItem) => void
  menuTopValue: number
  handleSetMenuTopValue: (value: number) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

/**
 * This component is following the Compound Components Pattern.
 * It holds the state of the Dropdown children and passed the state to the children through context.
 **/
const Dropdown = ({ className = '', children }: DropdownProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropdownMenuItem | undefined>()
  const [menuTopValue, setMenuTopValue] = useState(0)

  const handleToggleMenu = () => setMenuOpen((prevValue) => !prevValue)

  const handleSelectItem = (item: DropdownMenuItem) => {
    setSelectedItem(item)
    setMenuOpen(false)
  }

  const handleSetMenuTopValue = useCallback((value: number) => {
    setMenuTopValue(value)
  }, [])

  const value: DropdownContextValue = {
    isMenuOpen,
    handleToggleMenu,
    selectedItem,
    handleSelectItem,
    menuTopValue,
    handleSetMenuTopValue
  }

  return (
    <DropdownContext.Provider value={value}>
      <div
        className={`dropdown ${isMenuOpen ? 'dropdown--open' : ''} ${className}`}
        data-testid='dropdown'
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

const DropdownToggle = ({ className = '', label }: DropdownToggleProps) => {
  const dropdownToggleRef = useRef(null)
  const { selectedItem, handleToggleMenu, handleSetMenuTopValue } =
    useContext(DropdownContext) || {}

  useEffect(() => {
    handleSetMenuTopValue?.(dropdownToggleRef.current?.['offsetHeight'] || 0)
  }, [handleSetMenuTopValue])

  return (
    <div
      ref={dropdownToggleRef}
      className={`dropdown__toggle ${className}`}
      onClick={handleToggleMenu}
      data-testid='dropdown-toggle'
    >
      {selectedItem?.label || label}
    </div>
  )
}

const DropdownMenu = ({
  className = '',
  menuItemClassName = '',
  menuItems,
  defaultSelected
}: DropdownMenuProps) => {
  const { isMenuOpen, selectedItem, menuTopValue, handleSelectItem } =
    useContext(DropdownContext) || {}

  const selectedMenuItemValue = selectedItem?.value || defaultSelected?.value

  return (
    <ul
      style={{ top: menuTopValue }}
      className={`dropdown__menu ${className}`}
      role='menu'
      aria-hidden={!isMenuOpen}
      data-testid='dropdown-menu'
    >
      {menuItems?.map((menuItem) => (
        <li
          key={menuItem.value}
          className={`dropdown__menu-item ${
            selectedMenuItemValue === menuItem.value ? 'dropdown__menu-item--selected' : ''
          } ${menuItemClassName}`}
          onClick={() => handleSelectItem?.(menuItem)}
          data-testid='dropdown-menu-item'
        >
          {menuItem.label}
        </li>
      ))}
    </ul>
  )
}

Dropdown.Toggle = DropdownToggle
Dropdown.Menu = DropdownMenu

export default Dropdown
