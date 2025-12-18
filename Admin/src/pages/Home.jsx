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
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative'>
    <Nav/>
    <Sidebar/>

    <div className='w-full lg:w-[75vw] xl:w-[70vw] lg:absolute lg:left-[25%] xl:left-[25%] flex items-start justify-start flex-col gap-[30px] sm:gap-[40px] py-[100px] px-[20px] lg:px-[40px] mt-[70px] lg:mt-0'>
<h1 className='text-[24px] sm:text-[28px] lg:text-[35px] text-[#afe2f2] text-center lg:text-left'>OneCart Admin Panel</h1>
<div className='flex items-center justify-center lg:items-start lg:justify-start gap-[30px] sm:gap-[50px] flex-col sm:flex-row w-full'>
  <div className='text-[#dcfafd] flex items-center justify-center flex-col gap-[15px] sm:gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg text-[18px] sm:text-[20px] lg:text-[25px] border-[1px] border-[#969595] p-4 w-full sm:w-auto min-w-[250px]'>
   <span className='text-center'>Total No. of Products:</span>
   <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595] text-[20px] sm:text-[24px] lg:text-[28px] font-bold'>{totalProducts}</span>
  </div>

<div className='text-[#dcfafd] flex items-center justify-center flex-col gap-[15px] sm:gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg text-[18px] sm:text-[20px] lg:text-[25px] border-[1px] border-[#969595] p-4 w-full sm:w-auto min-w-[250px]'>
   <span className='text-center'>Total No. of Orders:</span>
   <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595] text-[20px] sm:text-[24px] lg:text-[28px] font-bold'>{totolorders}</span>
  </div>
</div>
    </div>
    </div>
  )
}

export default Home