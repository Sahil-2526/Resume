import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* This provides the context for useLocation and Routes used in App.jsx */}
    <BrowserRouter basename="/Resume">
      <App />
    </BrowserRouter>
  </StrictMode>,
)