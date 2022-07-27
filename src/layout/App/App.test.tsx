import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'

const setup = () => {
  render(<App />)
}

describe('Header', () => {
  it('displays header component', () => {
    setup()

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })
})

describe('Routing', () => {
  it('displays home page', () => {
    setup()

    const homePage = screen.getByTestId('home-page')
    expect(homePage).toBeInTheDocument()
  })
})
