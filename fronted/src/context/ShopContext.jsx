import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { serverurl } from '../App';
import { userDataContext } from './UserCoxtext';

export const shopDataContext=createContext()
function ShopContext({children}) {
    const [products,setProducts]=useState([]);
    const[search,setSearch]=useState('')
    const[showSearch,setShowSearch]=useState(false)
    const[cartItem,setCartItem]=useState({})
    const{userData}=useContext(userDataContext)
    let currency='₹';
    let delivery_fee=40;


       const getProducts=async () => {
        try {
          const result=await axios.get(`${serverurl}/api/product/list`)
          console.log(result.data);
          setProducts(result.data);

        } catch (error) {
          console.log(error)
        }
       }



       const addtoCart=async (itemId,size) => {
        if(!size)
        {
          console.log("Select Product Size")
          return;
        }
        let cartData=structuredClone(cartItem)//clone product
        if(cartData[itemId])
        {
          if(cartData[itemId][size])
          {
            cartData[itemId][size]+=1;
          }
          else{
            cartData[itemId][size]=1;
          }
        }
        else{
          cartData[itemId]={}
          cartData[itemId][size]=1;
        }
        setCartItem(cartData)

        if(userData)
        {

          try {
            const result=await axios.post(`${serverurl}/api/cart/add`,{itemId,size},{withCredentials:true})
            console.log(result.data)
          } catch (error) {
            console.log(error)
          }
        }
       }




       const getUsercart=async () => {
        try {
          const result=await axios.post(`${serverurl}/api/cart/get`,{},{withCredentials:true})
          setCartItem(result.data)
        } catch (error) {
          console.log(error)
        }
       }



       const updateQuantity=async (itemId,size,quantity) => {
        let cartData=structuredClone(cartItem)
        cartData[itemId][size]=quantity;
        setCartItem(cartData);
        if(userData)
        {
          try {
            await axios.post(`${serverurl}/api/cart/update`,{itemId,size,quantity},{withCredentials:true})
          } catch (error) {
            console.log(error)
          }
        }
        
       }

       const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItem)
        {
          for(const item in cartItem[items])
          {
            try {
              if(cartItem[items][item]>0)
              {
                totalCount+=cartItem[items][item]
              }
            } catch (error) {
              
            }
          }
        }
        return totalCount
       }



       const getCartAmount= () => {
        let totalAmount=0;
        for(const items in cartItem)
        {
          let itemInfo=products.find((product)=>product._id==items);
          for(const item in cartItem[items])
          {
            try {
              if(cartItem[items][item]>0)
              {
                totalAmount+=itemInfo.price*cartItem[items][item];
              }
            } catch (error) {
              console.log(error)
            }
          }
        }
        return totalAmount
       }
useEffect(()=>{
getProducts()

},[])

useEffect(()=>{
   getUsercart()
},[])


    let value={
     products,currency,delivery_fee,getProducts,search,setSearch,showSearch,setShowSearch,cartItem,addtoCart,getCartCount,setCartItem,updateQuantity,getCartAmount

    }
  return (
    <div>
        <shopDataContext.Provider value={value}>
                  {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext