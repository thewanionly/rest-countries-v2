import '@testing-library/jest-dom'

import { fetchCountryDetail, fetchCountryDetailsError } from 'mocks/handlers'
import { server } from 'mocks/server'
import { render, screen } from 'mocks/setup'

import App from 'layout/App'

const setup = (isError?: boolean) => {
  server.use(!isError ? fetchCountryDetail() : fetchCountryDetailsError())
  window.history.pushState({}, '', !isError ? '/us' : '/zz')
  render(<App />)
}

beforeEach(() => {
  localStorage.clear()
})

describe('Detail Page', () => {
  describe('Layout', () => {
    it('displays Back button', () => {
      setup()
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    })

    it('displays the country detail component', async () => {
      setup()
      expect(await screen.findByTestId('country-detail')).toBeInTheDocument()
    })

    it('displays skeleton loading in the country detail when the api call is still in progress', async () => {
      setup()

      expect(screen.getByTestId('country-detail-skeleton')).toBeInTheDocument()
      await screen.findByTestId('country-detail')
      expect(screen.queryByTestId('country-card-skeleton')).not.toBeInTheDocument()
    })

    it('displays error message when error occurs when fetching the country detail', async () => {
      const message = 'Error fetching (Bad Request)'

      setup(true)

      expect(await screen.findByTestId('error-section')).toBeInTheDocument()
      expect(await screen.findByText(message)).toBeInTheDocument()
    })
  })
})
