import { useNavigate } from 'react-router-dom'

import './Header.style.scss'

const Header = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='header' data-testid='header'>
      <div className='container header__container'>
        <h2 onClick={handleGoHome}>Where in the world?</h2>
        {/* <button>Dark Mode</button> */}
      </div>
    </div>
  )
}

export default Header
