import React from 'react'
import Tittle from '../components/Tittle'
import about from "../assets/about.jpg"
import NewLetterBox from '../components/NewLetterBox'
function About() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[30px] sm:gap-[50px] pt-[80px] px-4'>
      <Tittle text1={"ABOUT"} text2={"US"}/>
      <div className='w-[100%] max-w-[1200px] flex items-center justify-center flex-col lg:flex-row gap-[30px] lg:gap-[50px]'>
        <div className='w-full lg:w-[50%] flex items-center justify-center'>
          <img src={about} alt='' className='w-[90%] sm:w-[80%] lg:w-[65%] max-w-[400px] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='w-full lg:w-[50%] flex items-start justify-center gap-[15px] sm:gap-[20px] flex-col px-4 lg:px-0'>
          <p className='w-[100%] text-[white] text-[14px] sm:text-[16px] leading-relaxed'>OneCart born for Smart, seamless shopping - created to deliver quality products, trending styles and everyday essentials in one place. With reliable service, fast delivery and great value, OneCart makes your online shopping experience simple, satisfying and stress-free.</p>
          <p className='w-[100%] text-[white] text-[14px] sm:text-[16px] leading-relaxed'>Modern Shoppers style convenience and affordability. Whether it's fashion essentials or trends, we bring everything you need to one trusted platform - a customer-first shopping experience you'll love.</p>
          <p className='w-[100%] text-[16px] sm:text-[18px] lg:text-[20px] text-[white] mt-[10px] font-bold'>
            Our Mission
          </p>
          <p className='w-[100%] text-[white] text-[14px] sm:text-[16px] leading-relaxed'>
            Our Mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless customer-focused experience that saves time, adds value and fits every lifestyle and need.
          </p>
        </div>
      </div>

      <div className='w-[100%] max-w-[1200px] flex items-center justify-center flex-col gap-[20px] sm:gap-[30px]'>
        <Tittle text1={"WHY"} text2={"CHOOSE US"}/>
        <div className='w-[95%] sm:w-[90%] flex items-stretch justify-center gap-4 sm:gap-6 py-[20px] sm:py-[40px] flex-col lg:flex-row'>

          <div className='w-full lg:w-[33%] min-h-[200px] sm:min-h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[15px] sm:gap-[20px] flex-col px-[20px] sm:px-[40px] py-[20px] sm:py-[30px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[18px] sm:text-[20px] font-semibold text-[#bff1f9] text-center'>Quality Assurance</b>
            <p className='text-[14px] sm:text-[16px] text-center leading-relaxed'>We guarantee quality through strict checks, reliable sourcing and a commitment to customer satisfaction always.</p>
          </div>

          <div className='w-full lg:w-[33%] min-h-[200px] sm:min-h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[15px] sm:gap-[20px] flex-col px-[20px] sm:px-[40px] py-[20px] sm:py-[30px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[18px] sm:text-[20px] font-semibold text-[#bff1f9] text-center'>Convenience</b>
            <p className='text-[14px] sm:text-[16px] text-center leading-relaxed'>Shop easily with fast delivery, simple navigation, secure checkout and everything you need in one place.</p>
          </div>

          <div className='w-full lg:w-[33%] min-h-[200px] sm:min-h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[15px] sm:gap-[20px] flex-col px-[20px] sm:px-[40px] py-[20px] sm:py-[30px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[18px] sm:text-[20px] font-semibold text-[#bff1f9] text-center'>Exceptional Customer Service</b>
            <p className='text-[14px] sm:text-[16px] text-center leading-relaxed'>Our dedicated support team ensures quick response, helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>
      <div className='w-full px-4'>
        <NewLetterBox/>
      </div>
    </div>
  )
}

export default About