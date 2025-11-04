import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import google from "../assets/image.png"
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { serverurl } from '../App';
import { auth, provider } from '../utils/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { userDataContext } from '../context/UserCoxtext.jsx';

function Login() {
    const navigate = useNavigate()
    const [show, setshow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, SetPassword] = useState('')

    const {getCurrentUser}=useContext(userDataContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
       try {
         console.log(email, password);
        const user = await axios.post(`${serverurl}/api/auth/login`, {email, password }, { withCredentials: true })
        getCurrentUser();
        console.log(user.data)
        navigate("/")
       } catch (error) {
        console.log(error)
       }
    }



     const handlegoogleauth=async()=>{
        try {
            const result=await signInWithPopup(auth,provider)
          const {displayName,email}=result.user;
          console.log(displayName,email)
          const user=await axios.post(`${serverurl}/api/auth/googleregistration`,{displayName,email},{withCredentials:true})
          console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt='' />
                <h1 className='text-[22px] font-sans' >OneCart</h1>
            </div>
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login Page</span>
                <span className='text-[16px]'>Welcome to onecart,Place your order</span>
            </div>
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center' onSubmit={handleSubmit}>
                <form action="" className='w-[90%] h-[500px] flex flex-col items-center justify-start gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] mt-5 cursor-pointer' onClick={handlegoogleauth}>
                        <img src={google} alt='' className='w-[20px]' />Login with google
                    </div>

                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>

                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

                        <input type="text" placeholder='Enter your email' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' onChange={(e)=>setEmail(e.target.value)} required />



                        <input type={show ? "text" : "password"} placeholder='Enter your password' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' onChange={(e)=>SetPassword(e.target.value)} required />
                        {!show && <FaRegEye className='w-[20px] absolute right-[5%] top-[150px] ' onClick={() => setshow(prev => !prev)} />}
                        {show && <FaRegEyeSlash className='w-[20px] absolute right-[5%] top-[150px]' onClick={() => setshow(prev => !prev)} />}


                        <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                        <p className='flex gap-[10px]'>You no have any account?<span className='text-blue-700 font-bold cursor-pointer' onClick={() => navigate("/signup")}>Create new accpount</span></p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login