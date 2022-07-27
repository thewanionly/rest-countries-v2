import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import HomePage from './HomePage'

const setup = () => {
  render(<HomePage />)
}

describe('Home Page', () => {
  describe('Layout', () => {
    xit('has a search bar component', () => {
      setup()

      const searchBar = screen.getByTestId('country-search-bar')
      expect(searchBar).toBeInTheDocument()
    })

    xit('has a dropdown component', () => {
      setup()

      const dropdown = screen.getByTestId('country-dropdown')
      expect(dropdown).toBeInTheDocument()
    })

    it('has the countries list component', () => {
      setup()

      const countriesList = screen.getByTestId('countries-list')
      expect(countriesList).toBeInTheDocument()
    })
  })
})
