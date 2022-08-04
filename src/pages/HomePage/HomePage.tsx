import { useState } from 'react'

import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'

import './HomePage.style.scss'

const REGIONS = [
  {
    label: 'Africa',
    value: 'africa'
  },
  {
    label: 'America',
    value: 'america'
  },
  {
    label: 'Asia',
    value: 'asia'
  },
  {
    label: 'Europe',
    value: 'europe'
  },
  {
    label: 'Oceania',
    value: 'oceania'
  }
]

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleFilterValue = (value: string) => {
    setFilterValue(value)
  }

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
            placeholder='Filter by Region'
            onChange={handleFilterValue}
            menuItems={REGIONS}
          />
        </div>
        <div className='home-page__countries-list' data-testid='countries-list'></div>
      </div>
    </div>
  )
}

export default HomePage
