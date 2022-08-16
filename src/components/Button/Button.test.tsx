import { render, screen } from 'mocks/setup'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Icon from 'components/Icon'

import Button from './Button'

describe('Button component', () => {
  it('displays the label passed to the button', () => {
    const label = 'Click me'

    render(<Button label={label} />)

    expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
  })

  it('displays the children passed to the button', () => {
    const children = (
      <>
        <Icon name='arrow_left' />
        Back
      </>
    )

    render(<Button>{children}</Button>)

    expect(screen.getByTestId('icon-arrow_left')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  it('triggers the callback fn when button is clicked', () => {
    const handleButtonClick = jest.fn()
    const label = 'Click me'
    render(<Button label={label} onClick={handleButtonClick} />)

    userEvent.click(screen.getByRole('button', { name: label }))
    expect(handleButtonClick).toHaveBeenCalled()
  })
})
