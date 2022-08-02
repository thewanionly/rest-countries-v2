import { render, screen } from '@testing-library/react'
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

const setup = () => {
  render(<FilterDropdown label={defaultLabel} menuItems={menuItems} />)
}

describe('FilterDropdown component', () => {
  it(`relfects the selected item's value to the toggle`, () => {
    setup()

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])

    expect(screen.getByTestId('dropdown-toggle')).toHaveTextContent(menuItems[0].label)
  })

  xit(`removes the selected item's value from the toggle and show the default label when selecting "Clear value" option`, () => {
    setup()

    userEvent.click(screen.getByTestId('dropdown-toggle'))
    userEvent.click(screen.getByTestId('filter-dropdown-clear-item'))

    expect(screen.getByTestId('dropdown-toggle')).toHaveTextContent(defaultLabel)
  })
})
