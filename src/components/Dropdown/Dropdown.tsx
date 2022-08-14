import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../../utilities/hooks'

import Skeleton from '../Skeleton'
import './Dropdown.style.scss'

export type DropdownMenuItem = {
  label: string
  value: string
}

type DropdownProps = {
  className?: string
  onChange?: (item: DropdownMenuItem) => void
  children: React.ReactNode
  isLoading?: boolean
}

type DropdownToggleProps = {
  className?: string
  label: string | ((isMenuOpen: boolean, handleToggleMenu: () => void) => React.ReactNode)
}

type DropdownMenuProps = {
  className?: string
  menuItemClassName?: string
  menuItems: DropdownMenuItem[]
  defaultSelected?: DropdownMenuItem
}

type DropdownContextValue = {
  isMenuOpen: boolean
  isLoading: boolean
  handleToggleMenu: () => void
  selectedItem: DropdownMenuItem | undefined
  handleSelectItem: (menuItem: DropdownMenuItem) => void
  menuTopValue: number
  handleSetMenuTopValue: (value: number) => void
  handleCloseMenu: () => void
  hasEmptyMenu: boolean
  handleSetHasEmptyMenu: (value: boolean) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

/**
 * This component is following the Compound Components Pattern.
 * It holds the state of the Dropdown children and passed the state to the children through context.
 **/
const Dropdown = ({
  className = '',
  onChange: changeHandler,
  isLoading = false,
  children
}: DropdownProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropdownMenuItem | undefined>()
  const [menuTopValue, setMenuTopValue] = useState(0)
  const [hasEmptyMenu, setHasEmptyMenu] = useState(false)

  const handleToggleMenu = () => setMenuOpen((prevValue) => !prevValue)

  const handleCloseMenu = () => setMenuOpen(false)

  const handleSelectItem = (item: DropdownMenuItem) => {
    changeHandler?.(item)
    setSelectedItem(item)
    handleCloseMenu()
  }

  const handleSetMenuTopValue = useCallback((value: number) => {
    setMenuTopValue(value)
  }, [])

  const handleSetHasEmptyMenu = useCallback((value: boolean) => {
    setHasEmptyMenu(value)
  }, [])

  const value: DropdownContextValue = {
    isMenuOpen,
    isLoading,
    handleToggleMenu,
    selectedItem,
    handleSelectItem,
    menuTopValue,
    handleSetMenuTopValue,
    handleCloseMenu,
    hasEmptyMenu,
    handleSetHasEmptyMenu
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

  const {
    isMenuOpen = false,
    isLoading = false,
    hasEmptyMenu = false,
    handleToggleMenu = () => {},
    handleCloseMenu = () => {},
    handleSetMenuTopValue
  } = useContext(DropdownContext) || {}

  useEffect(() => {
    handleSetMenuTopValue?.(dropdownToggleRef.current?.['offsetHeight'] || 0)
  }, [isMenuOpen, handleSetMenuTopValue, isLoading])

  useClickOutside(dropdownToggleRef, handleCloseMenu)

  return (
    <div
      ref={dropdownToggleRef}
      className={`dropdown__toggle ${className}`}
      onClick={!hasEmptyMenu ? handleToggleMenu : undefined}
      data-testid={!isLoading ? 'dropdown-toggle' : undefined}
    >
      {isLoading ? (
        <Dropdown.Skeleton />
      ) : typeof label === 'function' ? (
        label(isMenuOpen, handleToggleMenu)
      ) : (
        label
      )}
    </div>
  )
}

const DropdownMenu = ({
  className = '',
  menuItemClassName = '',
  menuItems,
  defaultSelected
}: DropdownMenuProps) => {
  const { isMenuOpen, selectedItem, menuTopValue, handleSelectItem, handleSetHasEmptyMenu } =
    useContext(DropdownContext) || {}

  const selectedMenuItemValue = selectedItem?.value || defaultSelected?.value

  useEffect(() => {
    handleSetHasEmptyMenu?.(!menuItems.length)
  }, [menuItems, handleSetHasEmptyMenu])

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

const DropdownSkeleton = () => {
  return <Skeleton className='dropdown__skeleton' id='dropdown-skeleton' />
}

Dropdown.Toggle = DropdownToggle
Dropdown.Menu = DropdownMenu
Dropdown.Skeleton = DropdownSkeleton

export default Dropdown
