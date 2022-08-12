import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'

import { server } from '../../mocks/server'
import { fetchCountryDetail, fetchCountryDetailsError } from '../../mocks/handlers'

import DetailPage from './DetailPage'

const setup = (isError?: boolean) => {
  server.use(!isError ? fetchCountryDetail() : fetchCountryDetailsError())

  render(<DetailPage />)
}

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

    xit('displays skeleton loading in the country detail when the api call is still in progress', async () => {
      setup()

      expect(screen.getAllByTestId('country-detail-skeleton')).toBeInTheDocument()
      await screen.findByTestId('country-detail')
      expect(screen.queryAllByTestId('country-card-skeleton')).not.toBeInTheDocument()
    })

    xit('displays error message when error occurs when fetching the country detail', async () => {
      const message = 'Error fetching (Bad Request)'

      setup(true)

      expect(await screen.findByTestId('error-section')).toBeInTheDocument()
      expect(await screen.findByText(message)).toBeInTheDocument()
    })
  })
})
