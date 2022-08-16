import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { render, screen } from 'mocks/setup'

import TextInput from './TextInput'

const setup = () => {
  render(<TextInput name='test-input' />)
}

describe('TextInput component', () => {
  it('reflects the inputted text by the user', () => {
    setup()

    const textInput = screen.getByTestId('text-input-field')
    userEvent.type(textInput, 'Typing into the text input')
    expect(textInput).toBeInTheDocument()
  })
})
