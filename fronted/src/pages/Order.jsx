import React, { useContext, useEffect, useState } from 'react'
import Tittle from '../components/Tittle'
import { shopDataContext } from '../context/ShopContext';
import axios from 'axios';
import { serverurl } from '../App';

function Order() {
    const [orderData,setOrderData]=useState([]);
    const {currency}=useContext(shopDataContext)
    
    const loadOrderData=async () => {
        try {
            const result=await axios.post(`${serverurl}/api/order/userorder`,{},{withCredentials:true})
            if(result.data)
            {
                let allOrdersItem=[];
                result.data.map((order)=>(
                    order.items.map((item)=>{
                        item['status']=order.status;
                        item['payment']=order.payment
                        item['paymentMethod']=order.paymentMethod;
                        item['date']=order.date
                        allOrdersItem.push(item);
                    })
                ))
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        loadOrderData()
    },[])

        console.log("HERE ORDERS=>"+orderData);
        
  return (
    <div className='w-[100vw] min-h-[100vh] p-[10px] sm:p-[20px] pb-[15px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
       <div className='w-[100%] text-center mt-[80px] mb-[20px]'>
        <Tittle text1={"MY"} text2={"ORDERS"}/>
       </div>
       <div className='flex flex-col gap-[15px] sm:gap-[20px]'>
        {
     orderData.map((item,index)=>(
        <div key={index} className='w-[100%] border-t border-b border-gray-600'>
            <div className='w-[100%] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-[#51808048] py-[15px] px-[15px] sm:px-[20px] rounded-2xl relative'>
                <img src={item.image1} alt="" className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-md object-cover flex-shrink-0'/>
                <div className='flex-1 flex flex-col gap-[8px] sm:gap-[10px] w-full'>
                    <p className='text-[18px] sm:text-[20px] lg:text-[25px] text-white font-medium'>{item.name}</p>
                     <div className='flex items-center gap-[10px] sm:gap-[15px] lg:gap-[20px] flex-wrap'>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px] text-[#aaf4e7]'>{currency}{item.price}</p>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px] text-[#aaf4e7]'>Qty:{item.quantity}</p>
                        <p className='text-[14px] sm:text-[16px] lg:text-[18px] text-[#aaf4e7]'>Size: {item.size}</p>
                     </div>
                     <div className='flex items-center'>
                      <p className='text-[14px] sm:text-[16px] lg:text-[18px] text-[#aaf4e7]'>Date: <span className='text-white pl-[5px] sm:pl-[10px]'>{new Date(item.date).toDateString()}</span></p>
                     </div>
                     <div className='flex items-center'>
                         <p className='text-[14px] sm:text-[16px] text-[#aaf4e7]'>Payment-mode:{item.paymentMethod}</p>
                     </div>
                     
                     <div className='flex items-center justify-between mt-2 sm:mt-0 sm:absolute sm:right-[20px] sm:top-[20px] gap-3'>
                       <div className='flex items-center gap-[8px]'>
                         <p className='w-2 h-2 rounded-full bg-green-500'></p>
                         <p className='text-[14px] sm:text-[16px] lg:text-[17px] text-[#f3f9fc]'>{item.status}</p>
                       </div>
                       <button className='px-[12px] sm:px-[15px] py-[6px] sm:py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] sm:text-[14px] lg:text-[16px] cursor-pointer hover:bg-slate-500 transition-colors whitespace-nowrap' onClick={loadOrderData}>Track Order</button>
                     </div>
                </div>
            </div>
        </div>
     ))
        }
       </div>
    </div>
  )
}

export default Order