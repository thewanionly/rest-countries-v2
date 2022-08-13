import { useNavigate } from 'react-router-dom'

import './DetailPage.style.scss'

import CountryDetail from '../../components/CountryDetail'

const DetailPage = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className='detail-page' data-testid='detail-page'>
      <div className='container'>
        <div className='detail-page__top-area'>
          <button className='detail-page__back-button' onClick={handleBackClick}>
            Back
          </button>
        </div>
        <div className='detail-page__country-detail'>
          <CountryDetail />
        </div>
      </div>
    </div>
  )
}

export default DetailPage
