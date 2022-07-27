import { useState } from 'react'

import SearchBar from '../../components/SearchBar'

import './HomePage.style.scss'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className='home-page' data-testid='home-page'>
      <div className='container home-page__container'>
        <SearchBar
          className='home-page__search-bar'
          data-testid='country-search-bar'
          placeholder='Search for a country...'
          value={searchTerm}
          onChange={handleSearchTerm}
        />
        <div className='home-page__countries-list' data-testid='countries-list'></div>
      </div>
    </div>
  )
}

export default HomePage
