import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { serverurl } from '../main'

function Lists() {
  const [list,setList]=useState([])
  
   const fetchList=async () => {
    try {
      let result=await axios.get(`${serverurl}/api/product/list`)
      setList(result.data)
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
   }


 const removeList=async (id) => {
  try {
    let result=await axios.post(`${serverurl}/api/product/remove/${id}`,{},{withCredentials:true})
    if(result.data)
    {
      fetchList()
    }
    else{
      console.log("Failed to remove Project")
    }
  } catch (error) {
    consolelog(error)
  }
 }


   useEffect(()=>{
     fetchList()
   },[])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] '>
      <Nav/>
      <div className='w-[100%] h-[100%] flex items-center justify-start' >
        <Sidebar/>
        <div className='w-full lg:w-[75%] lg:ml-[25%] mt-[70px] flex flex-col gap-[20px] sm:gap-[30px] overflow-x-hidden py-[30px] sm:py-[50px] px-[20px] lg:px-[40px]'>
          <div className='w-full text-[24px] sm:text-[28px] lg:text-[40px] mb-[20px] text-white'>All Listed Products</div>

     {
      list?.length>0?(
        <div className='w-full flex flex-col gap-[15px] sm:gap-[20px]'>
        {list.map((item,index)=>(
        <div className='w-full bg-slate-600 rounded-xl flex items-center justify-between gap-[10px] sm:gap-[20px] p-[15px] sm:p-[20px]' key={index}>
        <img src={item.image1} className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px] rounded-lg object-cover flex-shrink-0' alt=''/>
        
        <div className='flex-1 flex flex-col items-start justify-center gap-[5px] sm:gap-[8px] min-w-0'>
          <div className='w-[100%] text-[14px] sm:text-[16px] lg:text-[20px] text-[#bef0f3] font-medium truncate'>{item.name}</div>
          <div className='text-[12px] sm:text-[14px] lg:text-[17px] text-[#def3da]'>{item.category}</div>
          <div className='text-[12px] sm:text-[14px] lg:text-[17px] text-[#def3da] font-semibold'>₹{item.price}</div>
        </div>
        
        <div className='flex items-center justify-center'>
          <button 
            className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex items-center justify-center rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-colors text-[14px] sm:text-[16px] font-bold'
            onClick={()=>removeList(item._id)}
          >
            ×
          </button>
        </div>
        </div>))}
        </div>
      )
      :(<div className='text-white text-[16px] sm:text-[18px] lg:text-[20px] text-center py-[40px]'>No Products available.</div>)
     }

        </div>
      </div>
    </div>
  )
}

export default Lists