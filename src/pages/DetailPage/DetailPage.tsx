import { useNavigate } from 'react-router-dom'

import './DetailPage.style.scss'

import CountryDetail from '../../components/CountryDetail'

const DetailPage = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className='detail-page'>
      <button onClick={handleBackClick}>Back</button>
      <CountryDetail />
    </div>
  )
}

export default DetailPage
