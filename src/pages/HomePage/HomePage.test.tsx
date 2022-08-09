import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { mockedCountries, mockedRegions } from '../../mocks/data'
import { server } from '../../mocks/server'
import { fetchAllRegionsError, fetchAllRegionsEmpty } from '../../mocks/handlers'

import StoreProvider from '../../store/StoreProvider'
import HomePage from './HomePage'

const setup = () => {
  render(
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  )
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

      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    })

    it('displays dropdown skeleton component when regions are still being fetched', async () => {
      setup()

      expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument()
      expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()

      await screen.findByText('Filter by Region')

      expect(screen.queryByText('dropdown-skeleton')).not.toBeInTheDocument()
    })

    it('cannot toggle the menu when skeleton loading is displayed', async () => {
      setup()

      expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument()
      expect(screen.getByTestId('dropdown-skeleton')).toBeInTheDocument()
      expect(screen.queryByTestId('dropdown-toggle')).not.toBeInTheDocument()

      await screen.findByText('Filter by Region')

      expect(screen.queryByTestId('dropdown-skeleton')).not.toBeInTheDocument()
      userEvent.click(screen.getByTestId('dropdown-toggle'))
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('displays error message when fetching regions has failed', async () => {
      const message = 'Error fetching (Bad Request)'
      server.use(fetchAllRegionsError())
      setup()

      expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument()
      expect(await screen.findByText(message)).toBeInTheDocument()
    })

    it('cannot toggle if there are errors in fetching regions', async () => {
      const message = 'Error fetching (Bad Request)'
      server.use(fetchAllRegionsError())
      setup()

      await screen.findByText(message)

      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      userEvent.click(screen.getByTestId('dropdown-toggle'))
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('shows an empty message when there empty regions fetched', async () => {
      server.use(fetchAllRegionsEmpty())
      setup()

      expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument()
      expect(await screen.findByText('No regions found')).toBeInTheDocument()
    })

    it('cannot toggle if there are empty options', async () => {
      server.use(fetchAllRegionsEmpty())
      setup()

      await screen.findByText('No regions found')

      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      userEvent.click(screen.getByTestId('dropdown-toggle'))
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('displays regions in the dropdown', async () => {
      setup()

      expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument()
      const dropdown = await screen.findByText('Filter by Region')
      userEvent.click(dropdown)

      const dropdownMenuItems = screen.getAllByTestId('dropdown-menu-item')

      expect(dropdownMenuItems.length).toBe(mockedRegions.length + 1)

      const regionOptions =
        mockedRegions
          ?.map(({ region }) => region)
          .map((region) => ({
            label: region,
            value: region.toLowerCase()
          })) || []

      dropdownMenuItems.forEach((dropdown, index) => {
        let label: string
        if (index === dropdownMenuItems.length - 1) {
          label = 'Show all'
        } else {
          label = regionOptions[index].label
        }

        expect(dropdown.textContent).toBe(label)
      })
    })

    it('has the countries list component', () => {
      setup()

      const CountryList = screen.getByTestId('country-list')
      expect(CountryList).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('can search a country', async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Philippines')

      const countries = screen.getAllByTestId('country-card')
      expect(countries.length).toBe(1)
      expect(countries[0].textContent).toBe('Philippines')
    })

    it('shows the first 10 countries after clearing search term', async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Philippines')

      expect(screen.getAllByTestId('country-card').length).toBe(1)

      userEvent.click(screen.getByTestId('icon-close'))

      expect(screen.getAllByTestId('country-card').length).toBe(mockedCountries.length)
    })

    xit('can filter a country by region', async () => {
      setup()
      await screen.findAllByTestId('country-card')
    })

    xit('shows the first 10 countries after clearing filter value', async () => {
      setup()
      await screen.findAllByTestId('country-card')
    })
  })
})
