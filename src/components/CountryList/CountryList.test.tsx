import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { fetchAllCountriesEmpty, fetchAllCountriesError } from '../../mocks/handlers'
import { server } from '../../mocks/server'
import { PAGE_LIMIT } from '../../utilities/constants'

import CountryList from './CountryList'

const setup = () => {
  render(<CountryList />)
}

describe('Country List', () => {
  describe('Interactions', () => {
    it('displays all countries in the list', async () => {
      setup()

      const countries = await screen.findAllByTestId('country-card')
      expect(countries.length).toBe(PAGE_LIMIT)
    })

    it('displays skeleton loading in the country card when the api call is still in progress', async () => {
      setup()

      expect(screen.getAllByTestId('country-card-skeleton').length).toBe(PAGE_LIMIT)
      await screen.findAllByTestId('country-card')

      expect(screen.queryAllByTestId('country-card-skeleton').length).toBe(0)
    })

    it('displays error message when error occurs when fetching the countries', async () => {
      const message = 'Error fetching (Bad Request)'
      server.use(fetchAllCountriesError())
      setup()

      expect(await screen.findByTestId('error-section')).toBeInTheDocument()
      expect(await screen.findByText(message)).toBeInTheDocument()
    })

    it('displays an empty section when there are no countries found', async () => {
      server.use(fetchAllCountriesEmpty())
      setup()

      const emptySection = await screen.findByTestId('empty-section')
      const countries = screen.queryAllByTestId('country-card')

      expect(emptySection).toBeInTheDocument()
      expect(countries.length).toBe(0)
    })
  })
})
