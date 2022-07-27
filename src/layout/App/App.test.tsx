import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'

const setup = () => {
  render(<App />)
}

describe('Header', () => {
  it('displays header component', () => {
    setup()
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
