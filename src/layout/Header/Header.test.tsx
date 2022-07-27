import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from './Header'

const setup = () => {
  render(<Header />)
}

describe('Layout', () => {
  it('displays "Where in the world?" heading', () => {
    setup()

    const headerText = screen.getByRole('heading', { name: 'Where in the world?' })
    expect(headerText).toBeInTheDocument()
  })

  xit('displays Dark Mode toggle', () => {
    setup()

    const darkModeToggle = screen.getByRole('button', { name: 'Dark Mode' })
    expect(darkModeToggle).toBeInTheDocument()
  })
})
