import '@testing-library/jest-dom'

import { fetchAllCountriesEmpty, fetchAllCountriesError } from 'mocks/handlers'
import { server } from 'mocks/server'
import { render, screen } from 'mocks/setup'
import { INITIAL_ITEMS } from 'utilities/constants'

import HomePage from 'pages/HomePage'

const setup = () => {
  render(<HomePage />)
}

beforeEach(() => {
  localStorage.clear()
})

describe('Country List', () => {
  describe('Interactions', () => {
    it(`displays ${INITIAL_ITEMS} countries in the list`, async () => {
      setup()

      const countries = await screen.findAllByTestId('country-card')
      expect(countries.length).toBe(INITIAL_ITEMS)
    })

    it('displays skeleton loading in the country card when the api call is still in progress', async () => {
      setup()

      expect(screen.getAllByTestId('country-card-skeleton').length).toBe(INITIAL_ITEMS)
      await screen.findAllByTestId('country-card')

      expect(screen.queryAllByTestId('country-card-skeleton').length).toBe(0)
    })

    it('displays error message when error occurs when fetching the countries', async () => {
      const message = 'Oops, something went wrong'
      server.use(fetchAllCountriesError())
      setup()

      expect(await screen.findByTestId('error-state')).toBeInTheDocument()
      expect(await screen.findByText(message)).toBeInTheDocument()
    })

    it('displays an empty section when there are no countries found', async () => {
      server.use(fetchAllCountriesEmpty())
      setup()

      const emptySection = await screen.findByTestId('empty-state')
      const countries = screen.queryAllByTestId('country-card')

      expect(emptySection).toBeInTheDocument()
      expect(countries.length).toBe(0)
    })
  })
})
