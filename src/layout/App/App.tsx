import { Routes, Route } from 'react-router-dom'

import Header from 'layout/Header'
import HomePage from 'pages/HomePage'
import DetailPage from 'pages/DetailPage'

import './App.style.scss'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:code' element={<DetailPage />} />
      </Routes>
    </div>
  )
}

export default App
