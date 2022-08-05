import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CountryCard from './CountryCard'

const setup = () => {
  render(<CountryCard name='test' />)
}

describe('Country Card', () => {
  describe('Layout', () => {
    xit('displays flag of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-flag')).toBeInTheDocument()
    })

    xit('displays name of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-name')).toBeInTheDocument()
    })

    xit('displays population of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-population')).toBeInTheDocument()
    })

    xit('displays region of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-region')).toBeInTheDocument()
    })

    xit('displays capital of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-capital')).toBeInTheDocument()
    })

    xit('displays skeleton loading', async () => {
      render(<CountryCard.Skeleton />)

      expect(screen.getByTestId('country-card-skeleton')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    xit('calls the onClick function when clicked', async () => {
      // render(<CountryCard.Skeleton />)
      // expect(screen.getByTestId('country-card-skeleton')).toBeInTheDocument()
    })
  })
})
