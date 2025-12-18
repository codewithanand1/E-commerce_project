import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate=useNavigate()
    return (
        <div className='w-[60px] sm:w-[80px] lg:w-[25%] min-h-[100vh] border-[1px] border-gray-600 py-[60px] fixed left-0 top-0 bg-[#0c2025] z-10'>
            <div className='flex flex-col gap-3 sm:gap-4 pt-[40px] px-[10px] lg:pl-[20%] text-[14px] sm:text-[15px]'>
                <div className='flex items-center justify-center lg:justify-start gap-2 sm:gap-3 border border-gray-200 border-r-0 px-2 sm:px-3 py-2 cursor-pointer hover:bg-[#2c7b89] transition-colors rounded-l-md' onClick={()=>navigate("/add")}>
                    <IoIosAddCircleOutline className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex-shrink-0'/>
                    <p className='hidden lg:block whitespace-nowrap'>Add Items</p>
                </div>

                <div className='flex items-center justify-center lg:justify-start gap-2 sm:gap-3 border border-gray-200 border-r-0 px-2 sm:px-3 py-2 cursor-pointer hover:bg-[#2c7b89] transition-colors rounded-l-md' onClick={()=>navigate("/lists")}>
                    <FaRegListAlt className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex-shrink-0'/>
                    <p className='hidden lg:block whitespace-nowrap'>List Items</p>
                </div>

                <div className='flex items-center justify-center lg:justify-start gap-2 sm:gap-3 border border-gray-200 border-r-0 px-2 sm:px-3 py-2 cursor-pointer hover:bg-[#2c7b89] transition-colors rounded-l-md' onClick={()=>navigate("/orders")}>
                    <SiTicktick className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex-shrink-0' />
                    <p className='hidden lg:block whitespace-nowrap'>View Orders</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar