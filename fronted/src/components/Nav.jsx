import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { IoSearchCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { userDataContext } from '../context/UserCoxtext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../App';
import { FaHome } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { IoIosContact } from "react-icons/io";
import Collections from '../pages/Collections';
import { shopDataContext } from '../context/ShopContext';


function Nav() {
  const {getCurrentUser,userData}=useContext(userDataContext)
  const{showSearch,setShowSearch,search,setSearch,getCartCount}=useContext(shopDataContext)
  const[showProfile,setshowProfile]=useState(false)
  const navigate=useNavigate()

  const handleLogout=async()=>{
  try {
    const result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
    console.log(result.data)
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black '>

        <div className='w-[30%] flex items-center justify-start gap-[10px]'>
        <img src={Logo} alt='' className='w-[30px]'/>
        <h1 className='text-[25px] text-[black]  font-sans'>OneCart</h1>
        </div>

     <div className='w-[40%] hidden md:flex'>
     <ul className='flex items-center justify-center  gap-[19px] text-white'>
      <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={()=>navigate("/")}>Home</li>
      <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={()=>navigate("/collections")}>Collection</li>
      <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={()=>navigate("/about")}>About</li>
      <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl ' onClick={()=>navigate("/contact")}>Contact</li>
     </ul>
     </div>


<div className='w-[30%] flex items-center justify-end gap-[20px]'>
  <IoSearchCircle className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={()=>{setShowSearch(prev=>!prev);navigate("/collections")}} />
  {!userData && <CgProfile className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={()=>setshowProfile(prev=>!prev)}/>}

   {userData&&<div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center' onClick={()=>setshowProfile(prev=>!prev)}>{userData?.name.slice(0,1)}</div>}
  <FaShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block' onClick={()=>navigate("/cart")}/>
 <p className='absolute w-[18px] h-[18px] items-center  justify-center bg-black px-[5px] py-[2px] text-white  rounded-full text-[9px] top-[10px] right-[23px] hidden md:block' >{getCartCount()}</p>
</div>


{!showSearch&&<div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center '>
<input type="text" className='w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]' placeholder='Search here' onChange={(e)=>setSearch(e.target.value)} value={search}/>
</div>}


{showProfile&&<div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10'>
 <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] '>
  {!userData&&<li  className='w-[100%] hover:[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' onClick={()=>{navigate("/login");setshowProfile(false)}}>Login</li>}
 { userData&&<li className='w-[100%] hover:[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' onClick={handleLogout}>Logout</li>}
  <li className='w-[100%] hover:[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' onClick={()=>navigate("/order")}>Orders</li>
  <li className='w-[100%] hover:[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' onClick={()=>navigate("/about")}>About</li>
 </ul>
</div>}
<div className='w-[100vw] h-[90px] flex items-center justify-between  px-[20px] text-[10px]  fixed bottom-0 left-0 bg-[#191818] md:hidden '>
<button className='text-white flex items-center justify-center flex-col gap-[2px]'><FaHome  className='w-[20px] h-[20px] text-[white] md:hidden ' onClick={()=>navigate("/")}/>
Home</button>



<button className='text-white flex items-center justify-center flex-col gap-[2px]'><HiOutlineCollection  className='w-[20px] h-[20px] text-[white] md:hidden 'onClick={()=>navigate("/collection")}/>
Collection</button>



<button className='text-white flex items-center justify-center flex-col gap-[2px]'><IoIosContact  className='w-[20px] h-[20px] text-[white] md:hidden ' onClick={()=>navigate("/contact")}/>
Contact</button>




<button className='text-white flex items-center justify-center flex-col gap-[2px]'><FaShoppingCart  className='w-[20px] h-[20px] text-[white] md:hidden 'onClick={()=>navigate("/cart")}/>
Cart</button>
<p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>{getCartCount()}</p>

</div>
    </div>
  )
}

export default Nav