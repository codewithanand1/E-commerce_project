import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContext from './context/AdminContext.jsx'
export const serverurl="http://localhost:8000"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContext>
     <App />
  </AdminContext>
  </BrowserRouter>
   

)
