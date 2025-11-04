import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { serverurl } from '../main';

function Home() {
  const [totalProducts,setTotalProducts]=useState(0);
  const[totolorders,setTotalOrders]=useState(0)


  const fetchCounts=async () => {
 try {
        const products=await axios.get(`${serverurl}/api/product/list`,{},{withCredentials:true})
         setTotalProducts(products.data.length)

         const orders=await axios.post(`${serverurl}/api/order/list`,{},{withCredentials:true})
         setTotalOrders(orders.data.length)
 } catch (error) {
  console.log(error)
  console.log("Failed Error fetch count")
 }
  }

  useEffect(()=>{
   fetchCounts()
  },[])
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative'>
    <Nav/>
    <Sidebar/>

    <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px]'>
<h1 className='text-[35px] text-[#afe2f2]'>OneCart Admin Panel</h1>
<div className='flex items-start justify-start gap-[50px] flex-col md:flex-row'>
  <div className='text-[#dcfafd] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
   Total No.of Products:<span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'>{totalProducts}</span>
  </div>



<div className='text-[#dcfafd] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
   Total No.of Orders:<span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595]'>{totolorders}</span>
  </div>

  
</div>




    </div>
    </div>
  )
}

export default Home