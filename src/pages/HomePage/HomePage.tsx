import { useContext, useEffect, useState } from 'react'

import { StoreContext } from 'store/StoreProvider'
import { Country, RESOURCES } from 'utilities/constants'
import { useResource } from 'utilities/hooks'

import CountryList from 'components/CountryList'
import FilterDropdown from 'components/FilterDropdown'
import SearchBar from 'components/SearchBar'

import './HomePage.style.scss'

const DEFAULT_FILTER_DROPDOWN_PLACEHOLDER = 'Filter by Region'

const HomePage = () => {
  const { searchTerm, filterValue, handleSearchTerm, handleFilterValue } = useContext(StoreContext)
  const [regionData, isLoadingRegion, errorRegion] = useResource(RESOURCES.REGIONS)
  const [countries = [], isLoadingCountries, errorCountries] = useResource(RESOURCES.COUNTRIES)

  const [filterDropdownPlaceholder, setFilterDropdownPlaceholder] = useState(
    DEFAULT_FILTER_DROPDOWN_PLACEHOLDER
  )

  const regions = Array.isArray(regionData)
    ? Array.from(new Set(regionData.map(({ region }) => region)))
    : regionData
  const regionOptions =
    regions
      ?.sort((region1, region2) => region1.localeCompare(region2))
      .map((region) => ({
        label: region,
        value: region.toLowerCase()
      })) || []

  const filteredCountries = filterCountries(countries, searchTerm, filterValue)

  useEffect(() => {
    let placeholder = DEFAULT_FILTER_DROPDOWN_PLACEHOLDER

    if (isLoadingRegion) {
      placeholder = ''
    } else if (errorRegion) {
      placeholder = errorRegion
    } else if (!regionData?.length) {
      placeholder = 'No regions found'
    }

    setFilterDropdownPlaceholder(placeholder)
  }, [regionData, isLoadingRegion, errorRegion])

  return (
    <div className='home-page' data-testid='home-page'>
      <div className='container'>
        <div className='home-page__top-area'>
          <SearchBar
            className='home-page__search-bar'
            placeholder='Search for a country...'
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          <FilterDropdown
            className='home-page__filter-dropdown'
            placeholder={filterDropdownPlaceholder}
            value={filterValue}
            onChange={handleFilterValue}
            menuItems={regionOptions}
            isLoading={isLoadingRegion}
          />
        </div>
        <div className='home-page__country-list' data-testid='country-list'>
          <CountryList
            data={filteredCountries}
            isLoading={isLoadingCountries}
            error={errorCountries}
          />
        </div>
      </div>
    </div>
  )
}

export const filterCountries = (
  countries: Country[],
  searchTerm: string,
  filterValue: string
): Country[] =>
  countries
    ?.filter(
      (country) =>
        (!searchTerm || country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterValue || country.region.toLowerCase() === filterValue.toLowerCase())
    )
    .sort((country1, country2) => country1.name.common.localeCompare(country2.name.common))

export default HomePage
