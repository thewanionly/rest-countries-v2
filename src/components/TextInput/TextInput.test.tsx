import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import TextInput from './TextInput'

const setup = () => {
  render(<TextInput name='test-input' />)
}

describe('TextInput component', () => {
  it('text is reflected to the component after user types anything', () => {
    setup()

    const textInput = screen.getByTestId('text-input-field')
    userEvent.type(textInput, 'Typing into the text input')
    expect(textInput).toBeInTheDocument()
  })
})
