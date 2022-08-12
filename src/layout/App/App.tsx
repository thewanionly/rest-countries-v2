import { Routes, Route } from 'react-router-dom'

import Header from '../Header'
import HomePage from '../../pages/HomePage'
import DetailPage from '../../pages/DetailPage'

import './App.style.scss'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </div>
  )
}

export default App
