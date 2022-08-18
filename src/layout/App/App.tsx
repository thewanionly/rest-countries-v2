import { Routes, Route } from 'react-router-dom'

import DetailPage from 'pages/DetailPage'
import ErrorBoundary from 'components/ErrorBoundary'
import Header from 'layout/Header'
import HomePage from 'pages/HomePage'

import './App.style.scss'

const App = () => {
  return (
    <div className='app'>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:code' element={<DetailPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
