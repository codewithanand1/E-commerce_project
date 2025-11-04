import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Home from    "./pages/Home"
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const {admindata}=useContext(adminDataContext)
  return (
    <>
    <ToastContainer/>
    {!admindata?<Login/>:<>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/add' element={<Add/>}/>
    <Route path='/lists' element={<Lists/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes></>}
    </>
  )
}

export default App