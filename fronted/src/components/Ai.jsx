import React, { useContext, useState, useRef, useEffect } from 'react'
import ai from "../assets/ai.jpg"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/a.wav"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Gemini AI initialize
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

function Ai() {
    const [activeai, setActiveAi] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [messages, setMessages] = useState([
        { role: "ai", text: "Hi! Main OneCart ka AI assistant hun. Koi bhi product ke baare me puchho ya suggestions lo! 🛍️" }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    let { showSearch, setShowSearch, products } = useContext(shopDataContext)
    let navigate = useNavigate()
    let audio = new Audio(open)

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    function speak(message) {
        let utterence = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)
    }

    // Gemini AI se response lo
    const askGemini = async (userMessage) => {
        try {
            setLoading(true)

            // Products ki info Gemini ko do
            const productList = products?.slice(0, 10).map(p =>
                `${p.name} - Category: ${p.category} - Price: ₹${p.price} - SubCategory: ${p.subCategory}`
            ).join("\n")

            const prompt = `
Tu OneCart e-commerce website ka helpful AI assistant hai.
Tujhe Hindi aur English dono me jawab dena hai.
Products ke baare me suggest karo, compare karo, aur help karo.

Available Products:
${productList}

User ka sawaal: ${userMessage}

Short aur helpful jawab do. Agar product suggest karo to price bhi batao.
`
            const result = await model.generateContent(prompt)
            const response = result.response.text()
            return response
        } catch (error) {
            console.log(error)
            return "Sorry, kuch error aa gaya. Dobara try karo!"
        } finally {
            setLoading(false)
        }
    }

    // Message send karo
    const sendMessage = async () => {
        if (!input.trim()) return

        const userMsg = input.trim()
        setInput("")

        // User message add karo
        setMessages(prev => [...prev, { role: "user", text: userMsg }])

        // Gemini se jawab lo
        const aiResponse = await askGemini(userMsg)

        // AI response add karo
        setMessages(prev => [...prev, { role: "ai", text: aiResponse }])
    }

    // Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    // Voice recognition
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new speechRecognition()

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim()
        if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
            speak("opening search"); setShowSearch(true); navigate("/collections")
        } else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("product")) {
            speak("opening collection page"); navigate("/collections")
        } else if (transcript.toLowerCase().includes("about")) {
            speak("opening about page"); navigate("/about")
        } else if (transcript.toLowerCase().includes("home")) {
            speak("opening home page"); navigate("/")
        } else if (transcript.toLowerCase().includes("cart")) {
            speak("opening cart page"); navigate("/cart")
        } else if (transcript.toLowerCase().includes("contact")) {
            speak("opening contact page"); navigate("/contact")
        } else if (transcript.toLowerCase().includes("order")) {
            speak("opening your order page"); navigate("/order")
        } else {
            // Voice input ko Gemini ko bhejo
            setShowChat(true)
            setMessages(prev => [...prev, { role: "user", text: transcript }])
            askGemini(transcript).then(response => {
                setMessages(prev => [...prev, { role: "ai", text: response }])
                speak(response.slice(0, 100))
            })
        }
    }

    recognition.onend = () => setActiveAi(false)

    return (
        <>
            {/* Chat Window */}
            {showChat && (
                <div className='fixed bottom-[120px] left-[10px] sm:left-[20px] w-[320px] sm:w-[380px] h-[450px] bg-[#0c2025] border border-[#35c2e1] rounded-2xl shadow-2xl flex flex-col z-50'>

                    {/* Header */}
                    <div className='w-full h-[55px] bg-[#1a3a45] rounded-t-2xl flex items-center justify-between px-4'>
                        <div className='flex items-center gap-2'>
                            <img src={ai} alt='' className='w-[35px] h-[35px] rounded-full' />
                            <div>
                                <p className='text-white text-[14px] font-semibold'>OneCart AI</p>
                                <p className='text-[#35c2e1] text-[11px]'>Powered by Gemini</p>
                            </div>
                        </div>
                        <button
                            className='text-white text-[20px] hover:text-red-400 transition-colors'
                            onClick={() => setShowChat(false)}
                        >×</button>
                    </div>

                    {/* Messages */}
                    <div className='flex-1 overflow-y-auto p-3 flex flex-col gap-3'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-relaxed ${msg.role === "user"
                                    ? "bg-[#35c2e1] text-black rounded-br-none"
                                    : "bg-[#1a3a45] text-white rounded-bl-none border border-[#35c2e150]"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className='flex justify-start'>
                                <div className='bg-[#1a3a45] text-white px-3 py-2 rounded-xl text-[13px] border border-[#35c2e150]'>
                                    Typing...⏳
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className='w-full h-[55px] border-t border-[#35c2e130] flex items-center gap-2 px-3'>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Product ke baare me puchho..."
                            className='flex-1 h-[35px] bg-[#1a3a45] text-white text-[13px] rounded-lg px-3 placeholder:text-gray-400 outline-none border border-[#35c2e130] focus:border-[#35c2e1]'
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className='w-[35px] h-[35px] bg-[#35c2e1] rounded-lg flex items-center justify-center text-black font-bold hover:bg-[#25b2d1] transition-colors disabled:opacity-50'
                        >➤</button>
                    </div>
                </div>
            )}

            {/* AI Button */}
            <div
                className='fixed lg:bottom-[20px] md:bottom-[4px] bottom-[80px] left-[20%] flex flex-col items-center gap-1 cursor-pointer z-50'
            >
                {/* Chat toggle button */}
                <button
                    className='w-[40px] h-[20px] bg-[#35c2e1] rounded-full text-[9px] text-black font-bold hover:bg-[#25b2d1] transition-colors'
                    onClick={() => setShowChat(prev => !prev)}
                >
                    CHAT
                </button>

                {/* Voice button */}
                <img
                    src={ai}
                    alt=''
                    className={`w-[100px] rounded-full transition-all ${activeai ? 'ring-4 ring-[#35c2e1] animate-pulse' : ''}`}
                    onClick={() => { recognition.start(); setActiveAi(true); audio.play() }}
                />
            </div>
        </>
    )
}

export default Ai
