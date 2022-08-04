import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { mockedCountries } from '../../mocks/data'
import CountryList from './CountryList'

const setup = () => {
  render(<CountryList />)
}

describe('Countries List', () => {
  describe('Interactions', () => {
    it('displays all countries in the list', async () => {
      setup()

      const countries = await screen.findAllByTestId('country-card')
      expect(countries.length).toBe(mockedCountries.length)
    })
  })
})
