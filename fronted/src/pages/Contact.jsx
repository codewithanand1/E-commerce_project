import React from 'react'
import Tittle from '../components/Tittle'
import contact from "../assets/contact.png"
import NewLetterBox from '../components/NewLetterBox'
function Contact() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[30px] sm:gap-[50px] pt-[80px] px-4'>
      <Tittle text1={"CONTACT"} text2={"US"}/>
        <div className='w-[100%] max-w-[1200px] flex items-center justify-center flex-col lg:flex-row gap-[30px] lg:gap-[50px]'>
          <div className='w-full lg:w-[50%] flex items-center justify-center'>
            <img src={contact} alt='' className='w-[90%] sm:w-[80%] lg:w-[70%] max-w-[400px] shadow-md shadow-black rounded-sm'/>
          </div>
          <div className='w-full lg:w-[50%] flex items-start justify-center gap-[15px] sm:gap-[20px] flex-col px-4 lg:px-0'>
          <p className='w-[100%] text-[white] font-bold text-[16px] sm:text-[18px] lg:text-[20px]'>Our Store</p>
          <div className='w-[100%] text-[white] text-[14px] sm:text-[16px] space-y-1'>
            <p>12345 Random Station</p>
            <p>Random city, state, India</p>
          </div>

          <div className='w-[100%] text-[white] text-[14px] sm:text-[16px] space-y-1'>
            <p>Tel: +91-89697856789</p>
            <p>Email: admin@onecart.com</p>
          </div>
          <p className='w-[100%] text-[16px] sm:text-[18px] lg:text-[20px] text-[white] mt-[10px] font-bold'>Careers at OneCart</p>
          <p className='w-[100%] text-[white] text-[14px] sm:text-[16px]'>Learn more about our teams and job openings</p>
          <button className='px-[25px] sm:px-[30px] py-[15px] sm:py-[20px] flex items-center justify-center text-[white] bg-transparent border border-white hover:bg-slate-600 rounded-md transition-colors text-[14px] sm:text-[16px]'>Explore Jobs</button>
          </div>
        </div>
        <div className='w-full px-4'>
          <NewLetterBox/>
        </div>
    </div>
  )
}

export default Contact