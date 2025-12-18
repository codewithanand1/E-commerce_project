import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import google from "../assets/image.png"
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { serverurl } from '../App';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from "../utils/firebase.js"
import { userDataContext } from '../context/UserCoxtext.jsx';
function Registration() {
    const navigate = useNavigate()
    const [show,setshow]=useState(false)
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,SetPassword]=useState('');
    const {getCurrentUser}=useContext(userDataContext)


    const handleSubmit=async(e)=>{
        e.preventDefault()
       try {
         console.log(name,email,password);
    const user=await axios.post(`${serverurl}/api/auth/registration`,{name,email,password},{withCredentials:true})
    console.log(user.data)
    getCurrentUser();
    navigate("/")
    }
     catch (error) {
        console.log(error)
       }
    }



    const handlegoogleauth=async()=>{
        try {
            const result=await signInWithPopup(auth,provider)
          const {displayName,email}=result.user;
          let name=displayName;
          console.log(displayName,email)
          const user=await axios.post(`${serverurl}/api/auth/googleregistration`,{name,email},{withCredentials:true})
          console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start px-4'>
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[15px] sm:px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
            <img className='w-[30px] sm:w-[40px]' src={Logo} alt='' />
            <h1 className='text-[18px] sm:text-[22px] font-sans' >OneCart</h1>
            </div>
            <div className='w-[100%] h-[80px] sm:h-[100px] flex items-center justify-center flex-col gap-[5px] sm:gap-[10px]'>
                 <span className='text-[20px] sm:text-[25px] font-semibold'>Registration Page</span>
                 <span className='text-[14px] sm:text-[16px] text-center px-4'>Welcome to onecart, Place your order</span>
            </div>
            <div className='max-w-[600px] w-[95%] sm:w-[90%] min-h-[550px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center p-4'>
               <form action="" className='w-[90%] min-h-[550px] flex flex-col items-center justify-start gap-[15px] sm:gap-[20px]' onSubmit={handleSubmit}>
                <div className='w-[90%] h-[45px] sm:h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[15px] sm:py-[20px] mt-3 sm:mt-5 cursor-pointer text-[14px] sm:text-[16px]' onClick={handlegoogleauth}>
                    <img src={google} alt='' className='w-[18px] sm:w-[20px]'/>Registration with google
                </div>

                <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] text-[14px] sm:text-[16px]'>
                    <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                </div>

                <div className='w-[90%] flex flex-col items-center justify-center gap-[12px] sm:gap-[15px] relative'>
                 <input type="text" placeholder='Enter your name' className='w-[100%] h-[45px] sm:h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[15px] sm:px-[20px] font-semibold text-[14px] sm:text-[16px]' onChange={(e)=>setName(e.target.value)} required/>

                  <input type="text" placeholder='Enter your email' className='w-[100%] h-[45px] sm:h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[15px] sm:px-[20px] font-semibold text-[14px] sm:text-[16px]' onChange={(e)=>setEmail(e.target.value)} required/>
             
                   <input type={show?"text":"password"} placeholder='Enter your password' className='w-[100%] h-[45px] sm:h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[15px] sm:px-[20px] font-semibold text-[14px] sm:text-[16px]' onChange={(e)=>SetPassword(e.target.value)} required/>
                   {!show &&<FaRegEye className='w-[18px] sm:w-[20px] absolute right-[5%] top-[125px] sm:top-[130px] cursor-pointer' onClick={()=>setshow(prev=>!prev)}/>}
                   {show &&<FaRegEyeSlash className='w-[18px] sm:w-[20px] absolute right-[5%] top-[125px] sm:top-[130px] cursor-pointer' onClick={()=>setshow(prev=>!prev)} />}

                     <button className='w-[100%] h-[45px] sm:h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[15px] sm:mt-[20px] text-[15px] sm:text-[17px] font-semibold hover:bg-[#5050e5] transition-colors'>Create Account</button>
                     <p className='flex gap-[5px] sm:gap-[10px] text-[12px] sm:text-[14px] text-center flex-wrap'>You have an account?<span className='text-blue-700 font-bold cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
                </div>
              
               </form>
            </div>
        </div>
    )
}

export default Registration