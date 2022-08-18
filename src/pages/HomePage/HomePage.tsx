import { lazy, Suspense, useContext, useDeferredValue, useEffect, useMemo, useState } from 'react'

import { StoreContext } from 'store/StoreProvider'
import { Country, Region, RESOURCES } from 'utilities/constants'
import { useResource } from 'utilities/hooks'

import CountryList from 'components/CountryList'
import { DropdownMenuItem } from 'components/Dropdown/Dropdown'

import FilterDropdown from 'components/FilterDropdown'
import SearchBar from 'components/SearchBar'

import './HomePage.style.scss'

const EmptyState = lazy(() => import('components/EmptyState'))

const DEFAULT_FILTER_DROPDOWN_PLACEHOLDER = 'Filter by Region'

const HomePage = () => {
  const { searchTerm, filterValue, handleSearchTerm, handleFilterValue } = useContext(StoreContext)
  const [regionData, isLoadingRegion, errorRegion] = useResource(RESOURCES.REGIONS)
  const [countries, isLoadingCountries, errorCountries] = useResource(RESOURCES.COUNTRIES)

  const deferredSearchTerm = useDeferredValue(searchTerm)
  const [filterDropdownPlaceholder, setFilterDropdownPlaceholder] = useState(
    DEFAULT_FILTER_DROPDOWN_PLACEHOLDER
  )

  const regionOptions = useMemo(() => getRegionOptions(regionData), [regionData])
  const filteredCountries = countries && filterCountries(countries, deferredSearchTerm, filterValue)

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
          {isLoadingCountries ? (
            <CountryList isLoading />
          ) : errorCountries ? (
            <Suspense fallback={<h3>Oops, something went wrong</h3>}>
              <EmptyState
                className='home-page__empty-state'
                variant='error'
                primaryMessage='Oops, something went wrong'
              >
                <p>{`Error message: ${errorCountries}`}</p>
                <p> Please check your console for more information.</p>
              </EmptyState>
            </Suspense>
          ) : (
            filteredCountries &&
            (!filteredCountries?.length ? (
              <Suspense fallback={<h3>No countries found</h3>}>
                <EmptyState
                  className='home-page__empty-state'
                  primaryMessage='No countries found'
                />
              </Suspense>
            ) : (
              <CountryList data={filteredCountries} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const getRegionOptions = (regionData: Region[]): DropdownMenuItem[] => {
  const regions = Array.isArray(regionData)
    ? Array.from(new Set(regionData.map(({ region }) => region)))
    : regionData

  return (
    regions
      ?.sort((region1, region2) => region1.localeCompare(region2))
      .map((region) => ({
        label: region,
        value: region.toLowerCase()
      })) || []
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
