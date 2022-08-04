import { render, screen } from '@testing-library/react'
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

const setup = (menuItems?: DropdownMenuItem[], onChange?: (item: DropdownMenuItem) => void) => {
  render(
    <Dropdown onChange={onChange}>
      <Dropdown.Toggle label='Click to open' />
      <Dropdown.Menu menuItems={menuItems || []} />
    </Dropdown>
  )
}

describe('Dropdown component', () => {
  it('opens the dropdown menu when dropdown toggle is clicked', () => {
    setup()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('dropdown-toggle'))

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('closes the dropdown menu when dropdown toggle is clicked again', () => {
    setup()

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
})
