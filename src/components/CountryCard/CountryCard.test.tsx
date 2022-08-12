import { render, screen } from '../../mocks/setup'
import '@testing-library/jest-dom'

import { mockedCountries } from '../../mocks/data'
import CountryCard from './CountryCard'
import { formatNumber } from '../../utilities/helpers'
import userEvent from '@testing-library/user-event'

const { cca2, name, flags, population, region, capital } = mockedCountries[0]

const setup = (onClick?: (countryCode: string) => void) => {
  render(
    <CountryCard
      code={cca2}
      name={name.common}
      flag={flags.svg}
      population={population}
      region={region}
      capital={capital}
      onClick={onClick}
    />
  )
}

describe('Country Card', () => {
  describe('Layout', () => {
    it('displays flag of the country', async () => {
      setup()
      const countryFlagImg = screen.getByTestId('country-card-flag')
      expect(countryFlagImg).toHaveAttribute('src', flags.svg)
      expect(countryFlagImg).toHaveAttribute('alt', `${name.common}'s flag`)
    })

    it('displays name of the country', async () => {
      setup()
      expect(screen.getByTestId('country-card-name').textContent).toBe(name.common)
    })

    it('displays population of the country', async () => {
      setup()
      expect(screen.getAllByTestId('country-card-description-value')[0].textContent).toBe(
        formatNumber(population)
      )
    })

    it('displays region of the country', async () => {
      setup()
      expect(screen.getAllByTestId('country-card-description-value')[1].textContent).toBe(region)
    })

    it('displays capital of the country', async () => {
      setup()
      expect(screen.getAllByTestId('country-card-description-value')[2].textContent).toBe(
        capital?.join(', ')
      )
    })

    it('displays skeleton loading', async () => {
      render(<CountryCard isLoading />)
      expect(screen.getByTestId('country-card-skeleton')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls the onClick function when clicked', async () => {
      const handleCountryCardClick = jest.fn()
      setup(handleCountryCardClick)

      userEvent.click(screen.getByTestId('country-card'))

      expect(handleCountryCardClick).toHaveBeenCalledWith(cca2)
    })
  })
})
