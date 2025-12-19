import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContext from './context/AdminContext.jsx'
<<<<<<< HEAD
// export const serverurl="http://localhost:8000"
=======
>>>>>>> 7d2b19a30b217f4d5a7b97291d2c063dcb40208b
export const serverurl="https://e-commerce-backend-i18h.onrender.com"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContext>
     <App />
  </AdminContext>
  </BrowserRouter>
   

)
