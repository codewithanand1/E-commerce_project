import axios from 'axios';
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { serverurl } from '../App';
import { linkWithCredential } from 'firebase/auth';
export const  userDataContext=createContext(); 
function UserCoxtext({children}) {
    const[userData,Setuserdata]=useState()

const getCurrentUser=async () => {
    try {
      let result=await axios.get(`${serverurl}/api/auth/getcurrentuser`,{withCredentials:true});
      Setuserdata(result.data) 
      console.log(result.data) 
    } catch (error) {
        Setuserdata(null)
        console.log(error)
    }
}

useEffect(()=>{
getCurrentUser()
},[])

let value={
userData,Setuserdata,
getCurrentUser
}
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserCoxtext