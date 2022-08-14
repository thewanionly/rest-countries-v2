import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'

import Header from './Header'
import userEvent from '@testing-library/user-event'

const setup = () => {
  render(<Header />)
}

describe('Header', () => {
  it('displays "Where in the world?" heading', () => {
    setup()

    expect(screen.getByRole('heading', { name: 'Where in the world?' })).toBeInTheDocument()
  })

  it('displays Dark Mode toggle', () => {
    setup()

    expect(screen.getByRole('button', { name: 'Dark Mode' })).toBeInTheDocument()
  })

  it(`displays light mode icon by default in Dark Mode toggle`, () => {
    localStorage.setItem('isDarkMode', 'false')
    setup()

    expect(screen.getByTestId('icon-moon_outline')).toBeInTheDocument()
  })

  it(`toggles from light mode to dark mode icon after clicking the Dark Mode toggle`, () => {
    localStorage.setItem('isDarkMode', 'false')
    setup()

    userEvent.click(screen.getByRole('button', { name: 'Dark Mode' }))

    expect(screen.getByTestId('icon-moon_fill')).toBeInTheDocument()
  })

  it(`toggles from dark mode to light mode icon after clicking the Dark Mode toggle`, () => {
    localStorage.setItem('isDarkMode', 'true')
    setup()

    userEvent.click(screen.getByRole('button', { name: 'Dark Mode' }))

    expect(screen.getByTestId('icon-moon_outline')).toBeInTheDocument()
  })
})
