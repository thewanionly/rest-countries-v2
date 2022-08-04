import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import HomePage from './HomePage'

const setup = () => {
  render(<HomePage />)
}

describe('Home Page', () => {
  describe('Layout', () => {
    it('has a search bar component', () => {
      setup()

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      expect(searchBar).toBeInTheDocument()
    })

    it('has a dropdown component', () => {
      setup()

      const dropdown = screen.getByText('Filter by Region')
      expect(dropdown).toBeInTheDocument()
    })

    it('has the countries list component', () => {
      setup()

      const countriesList = screen.getByTestId('countries-list')
      expect(countriesList).toBeInTheDocument()
    })
  })
})
