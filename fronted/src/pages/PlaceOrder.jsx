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
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex item-center justify-center flex-col md:flex-row gap-[50px] relative'>
    <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center lg:mt-[0px]  mt-[90px]'>
      <form className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]' onSubmit={onSubmitHandler}>
        <div className='py-[10px]'>
          <Tittle  text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='Fisrt name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='firstName' value={formData.firstName} required/>


            <input type='text' placeholder='Last name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='lastName' value={formData.lastName} required/>
            

        </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='email' placeholder='Enter email' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='email' value={formData.email} required/>
  
        </div>


         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='street' value={formData.street}required/>
        
        </div>
         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='city' value={formData.city}required/>


            <input type='text' placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' name='state' onChange={onchangeHandle} value={formData.state}required/>
            

        </div>



        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='text' placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] '  onChange={onchangeHandle} name='pincode' value={formData.pincode}required/>


            <input type='text' placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='country' value={formData.country}required/>
            

        </div>
         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
            <input type='number' placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] ' onChange={onchangeHandle} name='phone' value={formData.phone}required/>
        
        </div>

        <div>
          <button type='submit' className='text-[18px] active:bg-amber-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[2%] right-[35%] border-[1px] border-[#80808049] ml-[20px] mt-[20px]'>Place Order</button>
        </div>
      </form>
     
    </div>
     <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
          <CartTotal/>
          <div className='py-[10px]'>
            <Tittle text1={"PAYMENT"} text2={"METHODS"}/>
          </div>
          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>
             <button onClick={()=>setmethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm ${method==='razorpay'?'border-[5px] border-blue-700 rounded-sm':''}
             `}><img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm' alt=""/></button>

             <button onClick={()=>setmethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-b-sm text-[#332f6f] font-bold ${method==='cod'?'border-[5px] border-blue-700 rounded-sm':''}`}>Cash OnDelivery</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder