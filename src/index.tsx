import React from 'react'
import ReactDOM from 'react-dom/client'

import StoreProvider from './store/StoreProvider'
import App from './layout/App'

import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
