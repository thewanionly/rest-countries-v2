import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { DropdownMenuItem } from '../Dropdown/Dropdown'
import FilterDropdown from './FilterDropdown'

const defaultLabel = 'Pick a color'
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

const setup = (options: DropdownMenuItem[] = menuItems, isLoading?: boolean) => {
  render(<FilterDropdown placeholder={defaultLabel} menuItems={options} isLoading={isLoading} />)
}

describe('FilterDropdown component', () => {
  it('displays a down icon when dropdown menu is closed', () => {
    setup()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByTestId('icon-chevron_down')).toBeInTheDocument()
  })

  it('displays an up icon when dropdown menu is opened', () => {
    setup()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    userEvent.click(screen.getByTestId('dropdown-toggle'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    expect(screen.getByTestId('icon-chevron_up')).toBeInTheDocument()
  })

  it('displays no icon when there are empty options', () => {
    setup([])

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-chevron_down')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-chevron_up')).not.toBeInTheDocument()
  })

  it(`relfects the selected item's value to the toggle`, () => {
    setup()

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])

    expect(screen.getByTestId('dropdown-toggle')).toHaveTextContent(menuItems[0].label)
  })

  it(`removes the selected item's value from the toggle and show the default label when selecting "Clear value" option`, () => {
    setup()

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getByText('Show all'))

    expect(screen.getByTestId('dropdown-toggle')).toHaveTextContent(defaultLabel)
  })

  it('shows skeleton loading when isLoading is true', () => {
    setup(undefined, true)

    expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()
  })
})
