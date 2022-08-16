import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { mockedCountries, mockedRegions } from 'mocks/data'
import { fetchAllRegionsError, fetchAllRegionsEmpty } from 'mocks/handlers'
import { server } from 'mocks/server'
import { render, screen } from 'mocks/setup'
import { Country, INITIAL_ITEMS } from 'utilities/constants'

import HomePage, { filterCountries } from './HomePage'

const setup = () => {
  render(<HomePage />)
}

const filterAndSliceCountries = (
  countries: Country[],
  searchTerm: string,
  filterValue: string
): Country[] => filterCountries(countries, searchTerm, filterValue).slice(0, INITIAL_ITEMS)

beforeEach(() => {
  localStorage.clear()
})

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

      const countryList = screen.getByTestId('country-list')
      expect(countryList).toBeInTheDocument()
    })

    it('does not display the pagination area when countries length is less than or equal to 8', async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Philippines')

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('can search a country by entering the exact name of the country', async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Philippines')

      const countries = screen.getAllByTestId('country-card-name')
      expect(countries.length).toBe(1)
      expect(countries[0].textContent).toBe('Philippines')
    })

    it(`can search a country by entering a text that is a substring of the country's name`, async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Phil')

      const countries = screen.getAllByTestId('country-card-name')
      expect(countries.length).toBe(1)
      expect(countries[0].textContent).toBe('Philippines')
    })

    it(`shows empty section when searching a text that does not match nor a susbtring of any country's name`, async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'asd')

      expect(screen.queryAllByTestId('country-card-name').length).toBe(0)
      expect(screen.getByTestId('empty-section')).toBeInTheDocument()
    })

    it(`shows the first ${INITIAL_ITEMS} countries after clearing search term`, async () => {
      setup()
      await screen.findAllByTestId('country-card')

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, 'Philippines')

      expect(screen.getAllByTestId('country-card').length).toBe(1)

      userEvent.click(screen.getByTestId('icon-close'))

      expect(screen.getAllByTestId('country-card').length).toBe(INITIAL_ITEMS)
    })

    it('can filter a country by region', async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      userEvent.click(screen.getByTestId('dropdown-toggle'))
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe('Africa')

      const countries = screen.getAllByTestId('country-card-name')
      expect(countries.length).toBe(
        mockedCountries.filter(({ region }) => region === 'Africa')?.length || 0
      )
    })

    it(`shows the first ${INITIAL_ITEMS} countries after clearing filter value`, async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      userEvent.click(screen.getByTestId('dropdown-toggle'))
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe('Africa')

      userEvent.click(screen.getByTestId('dropdown-toggle'))
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[4])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe('Filter by Region')

      const countries = screen.getAllByTestId('country-card')
      expect(countries.length).toBe(INITIAL_ITEMS)
    })

    it(`displays the target country after searching then choosing a region that matches the country's region`, async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      const filterValue = mockedRegions[1].region
      const searchTerm = 'Philippines'

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, searchTerm)

      const filteredCountries1 = filterAndSliceCountries(mockedCountries, searchTerm, '')
      const countries1 = screen.getAllByTestId('country-card-name')
      expect(countries1.length).toBe(filteredCountries1.length)
      expect(countries1[0].textContent).toBe(filteredCountries1[0].name.common)

      const toggle = await screen.findByTestId('dropdown-toggle')
      userEvent.click(toggle)
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[1])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe(filterValue)

      const filteredCountries2 = filterAndSliceCountries(mockedCountries, searchTerm, filterValue)
      const countries2 = screen.getAllByTestId('country-card-name')
      expect(countries2.length).toBe(filteredCountries2.length)
      expect(countries2[0].textContent).toBe(filteredCountries2[0].name.common)
    })

    it(`does not display the target country after searching then choosing a region that does not match the country's region`, async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      const filterValue = mockedRegions[0].region
      const searchTerm = 'Philippines'

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, searchTerm)

      const filteredCountries1 = filterAndSliceCountries(mockedCountries, searchTerm, '')
      const countries1 = screen.getAllByTestId('country-card-name')
      expect(countries1.length).toBe(filteredCountries1.length)
      expect(countries1[0].textContent).toBe(filteredCountries1[0].name.common)

      const toggle = await screen.findByTestId('dropdown-toggle')
      userEvent.click(toggle)
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[0])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe(filterValue)

      const filteredCountries2 = filterAndSliceCountries(mockedCountries, searchTerm, filterValue)
      expect(screen.queryAllByTestId('country-card').length).toBe(filteredCountries2.length)
    })

    it(`displays the target country after choosing a region then searching a country that belong to the chosen region`, async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      const filterValue = mockedRegions[1].region
      const searchTerm = 'Philippines'

      const toggle = await screen.findByTestId('dropdown-toggle')
      userEvent.click(toggle)
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[1])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe(filterValue)

      const filteredCountries1 = filterAndSliceCountries(mockedCountries, '', filterValue)
      const countries1 = screen.getAllByTestId('country-card-name')
      expect(countries1.length).toBe(filteredCountries1.length)
      expect(countries1[0].textContent).toBe(filteredCountries1[0].name.common)

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, searchTerm)

      const filteredCountries2 = filterAndSliceCountries(mockedCountries, searchTerm, filterValue)
      const countries2 = screen.getAllByTestId('country-card-name')
      expect(countries2.length).toBe(filteredCountries2.length)
      expect(countries2[0].textContent).toBe(filteredCountries2[0].name.common)
    })

    it('does not display the target country after choosing a region then searching a country that does not belong to the chosen region', async () => {
      setup()
      await screen.findAllByTestId('country-card')
      await screen.findByText('Filter by Region')

      const filterValue = mockedRegions[1].region
      const searchTerm = 'Morocco'

      const toggle = await screen.findByTestId('dropdown-toggle')
      userEvent.click(toggle)
      userEvent.click(screen.getAllByTestId('dropdown-menu-item')[1])
      expect(screen.getByTestId('dropdown-toggle').textContent).toBe(filterValue)

      const filteredCountries1 = filterAndSliceCountries(mockedCountries, '', filterValue)
      const countries1 = screen.getAllByTestId('country-card-name')
      expect(countries1.length).toBe(filteredCountries1.length)
      expect(countries1[0].textContent).toBe(filteredCountries1[0].name.common)

      const searchBar = screen.getByPlaceholderText('Search for a country...')
      userEvent.type(searchBar, searchTerm)

      const filteredCountries2 = filterAndSliceCountries(mockedCountries, searchTerm, filterValue)
      expect(screen.queryAllByTestId('country-card').length).toBe(filteredCountries2.length)
    })
  })
})
