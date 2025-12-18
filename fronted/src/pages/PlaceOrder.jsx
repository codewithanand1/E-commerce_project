import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Tittle from '../components/Tittle'
import razorpay from "../assets/Razorpay.jpg"
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { serverurl } from '../App'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const[method,setmethod]=useState('cod')
  const navigate=useNavigate()
   const {cartItem,setCartItem,getCartAmount,delivery_fee,products}=useContext(shopDataContext)
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    country:'',
    phone:''
  })


  const onchangeHandle=(e)=>{
    const{name,value}=e.target

    setFormData(data=>({...data,[name]:value}))
    
  }

    const  initPay=(order)=>{
     const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response) => {
        console.log(response)

        const {data}=await axios.post(`${serverurl}/api/order/verifyrazorpay`,response,{withCredentials:true})

       if(data)
       {
        navigate("/order")
        setCartItem({})
       }
      }

     }
      const rzp=new window.Razorpay(options)
        rzp.open()
    }





    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      try {
        let orderItems=[]
        for(const items in cartItem)
        {
          for(const item in cartItem[items])
          {
            if(cartItem[items][item]>0)
            {
              const itemInfo=structuredClone(products.find(product=>product._id===items))
              if(itemInfo)
              {
                itemInfo.size=item
                itemInfo.quantity=cartItem[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        let orderData={
          address:formData,
          items:orderItems,
          PaymentMethod:"razorpay",
          amount:getCartAmount()+delivery_fee
        }
        switch (method) {
          case 'cod':
            const result=await axios.post(`${serverurl}/api/order/placeorder`,orderData,{withCredentials:true})
            console.log(result.data)
            if(result.data)
            {
              setCartItem({});
              navigate("/order")
            }
            else{
              console.log(result.data.message)
            }
            break;
        
            case 'razorpay':
              const resultRazorpay=await axios.post(`${serverurl}/api/order/razorpay`,orderData,{withCredentials:true})
              if(resultRazorpay.data)
              {
                initPay(resultRazorpay.data)
              }
              break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);

      }
    }
  


  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-center flex-col lg:flex-row gap-[30px] sm:gap-[50px] relative px-4 lg:px-0'>
    <div className='w-full lg:w-[50%] flex items-center justify-center mt-[80px] lg:mt-[100px]'>
      <form className='w-full max-w-[600px] lg:w-[70%]' onSubmit={onSubmitHandler}>
        <div className='py-[10px] mb-[20px]'>
          <Tittle  text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        
        <div className='w-[100%] flex flex-col sm:flex-row items-center justify-between gap-[15px] sm:gap-[10px] px-[10px] mb-[15px]'>
            <input type='text' placeholder='First name' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='firstName' value={formData.firstName} required/>
            <input type='text' placeholder='Last name' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='lastName' value={formData.lastName} required/>
        </div>

        <div className='w-[100%] flex items-center justify-between px-[10px] mb-[15px]'>
            <input type='email' placeholder='Enter email' className='w-[100%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='email' value={formData.email} required/>
        </div>

        <div className='w-[100%] flex items-center justify-between px-[10px] mb-[15px]'>
            <input type='text' placeholder='Street' className='w-[100%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='street' value={formData.street} required/>
        </div>
        
        <div className='w-[100%] flex flex-col sm:flex-row items-center justify-between gap-[15px] sm:gap-[10px] px-[10px] mb-[15px]'>
            <input type='text' placeholder='City' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='city' value={formData.city} required/>
            <input type='text' placeholder='State' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' name='state' onChange={onchangeHandle} value={formData.state} required/>
        </div>

        <div className='w-[100%] flex flex-col sm:flex-row items-center justify-between gap-[15px] sm:gap-[10px] px-[10px] mb-[15px]'>
            <input type='text' placeholder='Pincode' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='pincode' value={formData.pincode} required/>
            <input type='text' placeholder='Country' className='w-full sm:w-[48%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='country' value={formData.country} required/>
        </div>
        
        <div className='w-[100%] flex items-center justify-between px-[10px] mb-[20px]'>
            <input type='number' placeholder='Phone' className='w-[100%] h-[45px] sm:h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[16px] sm:text-[18px] px-[15px] sm:px-[20px] shadow-sm shadow-[#343434]' onChange={onchangeHandle} name='phone' value={formData.phone} required/>
        </div>
      </form>
     
    </div>
     <div className='w-full lg:w-[50%] flex items-center justify-center gap-[20px] sm:gap-[30px] mt-[20px] lg:mt-[100px]'>
        <div className='w-full max-w-[600px] lg:w-[70%] flex items-center justify-center gap-[15px] sm:gap-[20px] flex-col px-4 lg:px-0'>
          <CartTotal/>
          <div className='py-[10px] mb-[10px]'>
            <Tittle text1={"PAYMENT"} text2={"METHODS"}/>
          </div>
          <div className='w-[100%] flex items-center justify-center gap-[20px] sm:gap-[30px] lg:gap-[50px] flex-col sm:flex-row'>
             <button onClick={()=>setmethod('razorpay')} className={`w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] rounded-sm transition-all ${method==='razorpay'?'border-[3px] sm:border-[5px] border-blue-700 rounded-sm':'border-2 border-gray-400'}`}>
               <img src={razorpay} className='w-[100%] h-[100%] object-cover rounded-sm' alt="Razorpay"/>
             </button>

             <button onClick={()=>setmethod('cod')} className={`w-[160px] sm:w-[200px] h-[40px] sm:h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[12px] sm:text-[14px] px-[15px] sm:px-[20px] rounded-b-sm text-[#332f6f] font-bold transition-all ${method==='cod'?'border-[3px] sm:border-[5px] border-blue-700 rounded-sm':'border-2 border-gray-400'}`}>
               Cash On Delivery
             </button>
          </div>
          
          <div className='w-full flex justify-center mt-[20px] sm:mt-[30px]'>
            <button type='submit' className='w-full sm:w-auto text-[16px] sm:text-[18px] hover:bg-amber-500 cursor-pointer bg-[#3bcee848] py-[12px] px-[30px] sm:px-[50px] rounded-2xl text-white flex items-center justify-center border-[1px] border-[#80808049] transition-colors'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder