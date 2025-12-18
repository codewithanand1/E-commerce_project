import React, { useContext, useEffect, useState } from 'react'
import Tittle from '../components/Tittle'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom';
import { IoTrashBinOutline } from "react-icons/io5";
import CartTotal from '../components/CartTotal';

function Cart() {
    const {products,currency,cartItem,updateQuantity}=useContext(shopDataContext)
    const [cartData,setCartData]=useState([]);
    const navigate=useNavigate()


    useEffect(()=>{
     const tempData=[];
     for(const items in cartItem)
     {
        for(const item in cartItem[items])
        {
            if(cartItem[items][item]>0)
            {
                tempData.push({
                    _id:items,
                    size:item,
                    quantity:cartItem[items][item],
                })
            }
        }
     }
     setCartData(tempData)
    },[cartItem])

  return (
    <div className='w-[100vw] min-h-[100vh] p-[10px] sm:p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
      <div className='w-[100%] text-center mt-[80px] mb-[20px]'>
        <Tittle text1={"YOUR"} text2={"CART"}/>
      </div>
      <div className='w-[100%] flex flex-col gap-[15px] sm:gap-[20px]'>
          {
            cartData.map((item,index)=>{
                const productData=products.find((product)=>product._id===item._id);
                return(
                    <div key={index} className='w-[100%] border-t border-b border-gray-600'>
                    <div className='w-[100%] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-[#51808048] py-[15px] px-[15px] sm:px-[20px] rounded-2xl relative'>
                      <img className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md flex-shrink-0' src={productData?.image1} alt=""/>
                      
                      <div className='flex-1 flex flex-col gap-[8px] sm:gap-[10px]'>
                         <p className='text-[18px] sm:text-[20px] md:text-[25px] text-white font-medium'>{productData?.name}</p>
                         <div className='flex items-center gap-[15px] sm:gap-[20px] flex-wrap'>
                            <p className='text-[18px] sm:text-[20px] text-[#aaf4e7] font-semibold'>{currency}{productData?.price}</p>
                            <p className='w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] text-[14px] sm:text-[16px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border-[1px] border-[#9ff9f9]'>{item.size}</p>
                         </div>
                      </div>
                      
                      <div className='flex items-center gap-3 sm:gap-4 mt-2 sm:mt-0'>
                         <input 
                           type="number" 
                           min={1} 
                           defaultValue={item.quantity} 
                           className='w-[60px] sm:w-[70px] px-2 py-2 text-[white] text-[16px] sm:text-[18px] font-semibold bg-[#518080b4] border-[1px] border-[#9ff9f9] rounded-md' 
                           onChange={(e)=>e.target.value===''||e.target.value==='0'?null:updateQuantity(item._id,item.size,Number(e.target.value))} 
                         />
                         <IoTrashBinOutline 
                           className='text-[#9ff9f9] w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:text-red-400 transition-colors' 
                           onClick={()=>updateQuantity(item._id,item.size,0)}
                         />
                      </div>
                    </div>
                    </div>
                    
                )
            })
          }
          
          {cartData.length > 0 && (
            <div className='flex justify-center items-center my-10 sm:my-20 text-white'>
              <div className='w-full max-w-[450px] px-4'>
                <CartTotal/>
                <button 
                  className='w-full sm:w-auto text-[16px] sm:text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[12px] px-[30px] sm:px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] mt-[20px] transition-colors' 
                  onClick={()=>navigate("/placeorder")}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Cart