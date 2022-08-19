import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDarkMode } from 'utilities/hooks'

import Icon from 'components/Icon'

import './Header.style.scss'

const Header = () => {
  const navigate = useNavigate()
  const [isDarkMode, toggleDarkMode] = useDarkMode()

  const handleGoHome = () => {
    navigate('/')
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDarkMode])

  return (
    <div className='header' data-testid='header'>
      <div className='container header__container'>
        <h2 className='header__title' onClick={handleGoHome}>
          Where in the world?
        </h2>
        <span role='button' className='header__dark-mode-toggle' onClick={toggleDarkMode}>
          <Icon name={isDarkMode ? 'moon_fill' : 'moon_outline'} />
          Dark Mode
        </span>
      </div>
    </div>
  )
}

export default Header
