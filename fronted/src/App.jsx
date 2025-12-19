import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav'
import { userDataContext } from './context/UserCoxtext'
import About from './pages/About'
import Collections from './pages/Collections'
import Products from './pages/Products'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import PageNotFound from './pages/PageNotFound'
import Ai from './components/Ai'

export const serverurl="https://e-commerce-backend-i18h.onrender.com"
function App() {
  const {userData}=useContext(userDataContext);
   let location=useLocation()
  return (
    <>
          {userData?<Nav/>:null}
    
     <Routes>
      <Route path='/login' element={userData?(<Navigate to={location.state?.from||"/"}/>):(<Login/>)}></Route>
      <Route path='/signup' element={userData?(<Navigate to={location.state?.from||"/"}/>):(<Registration/>)}></Route>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>

      <Route path='/about' element={userData?<About/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>

      <Route path='/collections' element={userData?<Collections/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>

      <Route path='/product' element={userData?<Products/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>

      <Route path='/contact' element={userData?<Contact/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>

       <Route path='/productdetail/:productId' element={userData?<ProductDetail/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>


 <Route path='/cart' element={userData?<Cart/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>


 <Route path='/placeorder' element={userData?<PlaceOrder/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>


  <Route path='/order' element={userData?<Order/>:<Navigate to="/login"  state={{from:location.pathname}}/>}></Route>


  <Route path='/*' element={<PageNotFound/>}></Route>
     </Routes>
  <Ai/>
     
    </>
  )
}

export default App
