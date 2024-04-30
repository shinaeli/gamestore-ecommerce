import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import TotalCostContextProvider from './contexts/TotalCostContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <TotalCostContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </TotalCostContextProvider>
    </Router>
  </React.StrictMode>,
)
