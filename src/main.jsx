import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#000000',
          color: '#d4af37',
          border: '1px solid #d4af37',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.02em',
          padding: '14px 18px',
          borderRadius: '2px',
          maxWidth: '380px',
        },
        success: {
          iconTheme: {
            primary: '#d4af37',
            secondary: '#000000',
          },
        },
        error: {
          style: {
            background: '#000000',
            color: '#d4af37',
            border: '1px solid #d4af37',
          },
          iconTheme: {
            primary: '#d4af37',
            secondary: '#000000',
          },
        },
      }}
    />
  </StrictMode>,
)