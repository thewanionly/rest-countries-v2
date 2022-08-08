import { useEffect, useState } from 'react'

import { RESOURCES } from '../../utilities/constants'
import { useResource } from '../../utilities/hooks'

import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import CountryList from '../../components/CountryList'

import './HomePage.style.scss'

const DEFAULT_FILTER_DROPDOWN_PLACEHOLDER = 'Filter by Region'

const HomePage = () => {
  const [regionData, isLoadingRegion, errorRegion] = useResource(RESOURCES.REGIONS)
  const [filterDropdownPlaceholder, setFilterDropdownPlaceholder] = useState(
    DEFAULT_FILTER_DROPDOWN_PLACEHOLDER
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const regions = Array.isArray(regionData)
    ? Array.from(new Set(regionData.map(({ region }) => region)))
    : regionData
  const regionOptions =
    regions?.map((region) => ({
      label: region,
      value: region.toLowerCase()
    })) || []

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleFilterValue = (value: string) => {
    setFilterValue(value)
  }

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
      <div className='container home-page__container'>
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
            onChange={handleFilterValue}
            menuItems={regionOptions}
            isLoading={isLoadingRegion}
          />
        </div>
        <div className='home-page__country-list' data-testid='country-list'>
          <CountryList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
