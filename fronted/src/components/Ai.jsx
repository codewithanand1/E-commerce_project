import React, { useContext, useState } from 'react'
import ai from "../assets/ai.jpg"

import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/a.wav"
function Ai() {
    const [activeai,setActiveAi]=useState(false)
    let {showSearch,setShowSearch}=useContext(shopDataContext)
    let navigate=useNavigate()
    let audio=new Audio(open)
     
    function speak(message)
    {
        let utterence=new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterence)
    }

    const speechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition
    const recoginition=new speechRecognition()
    if(!recoginition)
    {
        console.log("not supported");

    }

    recoginition.onresult=(e)=>{
        const transcript=e.results[0][0].transcript.trim();
        if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open")&&!showSearch)
        {
            speak("opening search");
            setShowSearch(true);
            navigate("/collection")
        }
        else if(transcript.toLowerCase().includes("search")&&transcript.toLowerCase().includes("close") &&showSearch)
        {
            speak("closing Search");
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("collection")||transcript.toLowerCase().includes("collections")||transcript.toLowerCase().includes("product")||transcript.toLowerCase().includes("products"))
        {
            speak("opening collection page");
            navigate("/collections")
        }


         else if(transcript.toLowerCase().includes("about")||transcript.toLowerCase().includes("aboutpage"))
        {
            speak("opening about page");
            navigate("/about")
            setShowSearch(false)
        }


         else if(transcript.toLowerCase().includes("home")||transcript.toLowerCase().includes("homepage"))
        {
            speak("opening home page");
            navigate("/")
            setShowSearch(false)
        }
         else if(transcript.toLowerCase().includes("cart")||transcript.toLowerCase().includes("kart"))
        {
            speak("opening cart page");
            navigate("/cart")
            setShowSearch(false)
        }
   
         else if(transcript.toLowerCase().includes("contact")||transcript.toLowerCase().includes("cantact"))
        {
            speak("opening contact page");
            navigate("/contact")
            setShowSearch(false)
        }
        

          else if(transcript.toLowerCase().includes("order")||transcript.toLowerCase().includes("myorder")||transcript.toLowerCase().includes("orders")||transcript.toLowerCase().includes("my orders"))
        {
            speak("opening your order page");
            navigate("/order")
            setShowSearch(false)
        }
        else{
            toast.error("Try agian");
            
        }




    }
    recoginition.onend=()=>{
     setActiveAi(false)
    }
  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[4px] bottom-[80px] left-[20%]' onClick={()=>{recoginition.start();setActiveAi(true);audio.play()}}>
    <img src={ai} alt='' className='w-[100px] cursor-pointer rounded-full'/>
    </div>
  )
}

export default Ai