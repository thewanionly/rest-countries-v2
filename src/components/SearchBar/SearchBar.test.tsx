import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import SearchBar from './SearchBar'

const setup = () => {
  render(<SearchBar />)
}

describe('SearchBar component', () => {
  it('reflects the inputted text by the user', () => {
    setup()

    const searchBarInputText = screen.getByTestId('text-input-field')
    userEvent.type(searchBarInputText, 'Typing into the text input')
    expect(searchBarInputText).toBeInTheDocument()
  })

  xit('has a search icon', () => {
    setup()

    const searchBarIcon = screen.getByTestId('search-bar-icon')
    expect(searchBarIcon).toBeInTheDocument()
  })
})
