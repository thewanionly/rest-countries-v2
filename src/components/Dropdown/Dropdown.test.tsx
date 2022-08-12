import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Dropdown, { DropdownMenuItem } from './Dropdown'

const menuItems: DropdownMenuItem[] = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Blue',
    value: 'blue'
  },
  {
    label: 'Green',
    value: 'green'
  }
]

const setup = (
  menuItems?: DropdownMenuItem[],
  onChange?: (item: DropdownMenuItem) => void,
  isLoading?: boolean
) => {
  render(
    <Dropdown onChange={onChange} isLoading={isLoading}>
      <Dropdown.Toggle label='Click to open' />
      <Dropdown.Menu menuItems={menuItems || []} />
    </Dropdown>
  )
}

describe('Dropdown component', () => {
  it('opens the dropdown menu when dropdown toggle is clicked', () => {
    setup(menuItems)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('closes the dropdown menu when dropdown toggle is clicked again', () => {
    setup(menuItems)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    expect(screen.getByRole('menu')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('displays all the dropdown menu options', () => {
    setup(menuItems)

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    const dropdownMenuItems = screen.getAllByTestId('dropdown-menu-item')

    expect(dropdownMenuItems).toHaveLength(menuItems.length)
    dropdownMenuItems.forEach((dropdownMenuItem, index) =>
      expect(dropdownMenuItem).toHaveTextContent(menuItems[index].label)
    )
  })

  it('calls the handleSelectItem function with the selected item when a menu item is clicked', () => {
    const handleSelectItem = jest.fn()
    setup(menuItems, handleSelectItem)

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])

    expect(handleSelectItem).toHaveBeenCalledWith(menuItems[0])
  })

  it('closes the dropdown menu when a menu item is clicked', () => {
    setup(menuItems)

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes the dropdown menu when user clicked anywhere outside the dropdown', () => {
    setup(menuItems)

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    userEvent.click(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('shows skeleton loading when isLoading is true', () => {
    setup(menuItems, undefined, true)

    expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()
  })

  it('cannot toggle the menu when skeleton loading is displayed', () => {
    setup(menuItems, undefined, true)

    expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('dropdown-toggle')).not.toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('cannot toggle if there are empty options', () => {
    setup([])

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
