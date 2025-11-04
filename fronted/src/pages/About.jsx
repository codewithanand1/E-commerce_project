import React from 'react'
import Tittle from '../components/Tittle'
import about from "../assets/about.jpg"
import NewLetterBox from '../components/NewLetterBox'
function About() {
  return (
    <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[8px] '>
      <Tittle text1={"ABOUT"} text2={"US"}/>
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center '>
          <img src={about} alt='' className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>OneCart born for Smart ,seamless shoping-created to deliver quality products  treding styles and everydays essentials in one place .With reliable service Fast delivery and great value Onecart Makes your online shopping experience simple ,satisfying and stress-free</p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>Modern Shoppers style convenience and affordability .Wheather it's fashion essentials or trends ,we bring everything you needs to one trusted platform customers-first shopping experience you'will love.</p>
          <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>
            Our Mission
          </p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            Our Mission is to redefine online shopping by delivering quality , affordability ,and convennience .OneCart connects customers  with trusted products and brands ,offering a seamless customers-focused experience that saves time ,adds value and fits every lifestyle and need.
          </p>
        </div>
      </div>

      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Tittle text1={"WHY"} text2={"CHOOSE US"}/>
        <div className='w-[80%] flex items-center justify-center gap-4 py-[40px]'>

          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>

            <p>We  guarantee qualify through strict checks, reliable souring and a commitment to customer satisfaction always.</p>
          </div>


 <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convnience</b>

            <p>Shop easily with fast delivery ,simple navigation secure checkout and everything you need everything you need in one place</p>
          </div>

           <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100  flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Exceptional Customer Service</b>

            <p>Our dedicated support team ensures quick response ,helpful solutions ,and a smooth shopping experince every time.</p>
          </div>


          

        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About