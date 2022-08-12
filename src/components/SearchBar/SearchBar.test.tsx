import { useState } from 'react'
import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import SearchBar from './SearchBar'

const setup = () => {
  const TestEnvironment = () => {
    const [value, setValue] = useState('')

    const handleChange = (newValue: string) => {
      setValue(newValue)
    }

    return <SearchBar value={value} onChange={handleChange} />
  }

  render(<TestEnvironment />)
}

describe('SearchBar component', () => {
  const inputtedText = 'Typing into the text input'

  it('reflects the inputted text by the user', () => {
    setup()

    const searchBarInputText = screen.getByTestId('text-input-field')
    userEvent.type(searchBarInputText, inputtedText)
    expect(searchBarInputText).toHaveValue(inputtedText)
  })

  it('displays a search icon', () => {
    setup()

    expect(screen.getByTestId('icon-search')).toBeInTheDocument()
  })

  it('displays a close icon when search bar has input', () => {
    setup()

    expect(screen.queryByTestId('icon-close')).not.toBeInTheDocument()

    const searchBarInputText = screen.getByTestId('text-input-field')
    userEvent.type(searchBarInputText, inputtedText)

    expect(screen.getByTestId('icon-close')).toBeInTheDocument()
  })

  it('clears the inputted text when user clicks on the close icon', () => {
    setup()

    expect(screen.queryByTestId('icon-close')).not.toBeInTheDocument()

    userEvent.type(screen.getByTestId('text-input-field'), inputtedText)

    userEvent.click(screen.getByTestId('icon-close'))

    expect(screen.getByTestId('text-input-field')).toHaveValue('')
  })
})
