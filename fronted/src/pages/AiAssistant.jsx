import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { shopDataContext } from '../context/ShopContext'
import aiImg from '../assets/ai.jpg'
import open from '../assets/a.wav'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Quick suggestion chips
const QUICK_SUGGESTIONS = [
  "Best selling products dikhao",
  "₹500 se kam products suggest karo",
  "Men ke liye best outfit kya hai?",
  "Women fashion suggestions do",
  "Kids ke liye kya hai?",
  "Trending products kya hain?",
]

function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste! 👋 Main OneCart AI hun. Aapko best products suggest karne ke liye yahan hun.\n\nAap mujhse puch sakte ho:\n• Kisi bhi category ke products\n• Budget ke hisaab se suggestions\n• Product comparison\n• Fashion advice",
      products: []
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const { products, currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Parse product names from AI response and find matching products
  const findSuggestedProducts = (text) => {
    if (!products?.length) return []
    return products.filter(p =>
      text.toLowerCase().includes(p.name?.toLowerCase()) ||
      text.toLowerCase().includes(p.category?.toLowerCase())
    ).slice(0, 4)
  }

  const askGemini = async (userMessage) => {
    try {
      setLoading(true)
      const productList = products?.slice(0, 20).map(p =>
        `Name: ${p.name} | Category: ${p.category} | SubCategory: ${p.subCategory} | Price: ₹${p.price}`
      ).join("\n")

      const prompt = `Tu OneCart e-commerce website ka expert AI shopping assistant hai.
Tujhe Hindi/Hinglish me friendly jawab dena hai.
Products suggest karo, compare karo, fashion advice do.

Store ke Available Products:
${productList}

User: ${userMessage}

Instructions:
- Short aur helpful jawab do (max 4-5 lines)
- Agar product suggest karo to exact product name use karo jo list me hai
- Price mention karo
- Friendly tone rakho
- Emojis use karo thoda`

      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      console.log(error)
      return "Sorry, abhi kuch technical issue hai. Thodi der baad try karo! 🙏"
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (text) => {
    const userMsg = (text || input).trim()
    if (!userMsg) return
    setInput("")

    setMessages(prev => [...prev, { role: "user", text: userMsg, products: [] }])

    const aiResponse = await askGemini(userMsg)
    const suggestedProducts = findSuggestedProducts(aiResponse)

    setMessages(prev => [...prev, { role: "ai", text: aiResponse, products: suggestedProducts }])
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Voice input
  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return alert("Voice supported nahi hai is browser me")
    const recognition = new SR()
    recognition.lang = "hi-IN"
    recognition.start()
    setListening(true)
    new Audio(open).play().catch(() => {})
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
      inputRef.current?.focus()
    }
    recognition.onend = () => setListening(false)
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#0c2025] to-[#141414] flex flex-col'>

      {/* Header */}
      <div className='w-full bg-[#0c2025] border-b border-[#35c2e130] px-4 sm:px-8 py-4 flex items-center gap-4 mt-[60px]'>
        <img src={aiImg} alt="AI" className='w-[45px] h-[45px] rounded-full border-2 border-[#35c2e1]' />
        <div>
          <h1 className='text-white text-[18px] font-bold'>OneCart AI Assistant</h1>
          <p className='text-[#35c2e1] text-[12px]'>Powered by Gemini • Products suggest karta hun 🛍️</p>
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
          <span className='text-green-400 text-[12px]'>Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-5 max-w-[900px] w-full mx-auto'>

        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

            {/* AI Avatar */}
            {msg.role === "ai" && (
              <img src={aiImg} alt="AI" className='w-[35px] h-[35px] rounded-full border border-[#35c2e1] self-start mt-1 flex-shrink-0' />
            )}

            <div className={`flex flex-col gap-3 max-w-[85%] sm:max-w-[75%]`}>
              {/* Message bubble */}
              <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-[#35c2e1] text-black rounded-br-none"
                  : "bg-[#1a3a45] text-white rounded-bl-none border border-[#35c2e120]"
              }`}>
                {msg.text}
              </div>

              {/* Product Cards */}
              {msg.products?.length > 0 && (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3'>
                  {msg.products.map((product) => (
                    <div
                      key={product._id}
                      className='bg-[#1a3a45] border border-[#35c2e130] rounded-xl overflow-hidden hover:border-[#35c2e1] transition-all cursor-pointer group'
                      onClick={() => navigate(`/productdetail/${product._id}`)}
                    >
                      <div className='w-full h-[120px] overflow-hidden'>
                        <img
                          src={product.image?.[0]}
                          alt={product.name}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                        />
                      </div>
                      <div className='p-2'>
                        <p className='text-white text-[11px] font-medium line-clamp-2 leading-tight'>{product.name}</p>
                        <p className='text-[#35c2e1] text-[12px] font-bold mt-1'>{currency}{product.price}</p>
                        <button className='w-full mt-2 bg-[#35c2e1] text-black text-[10px] font-bold py-1 rounded-lg hover:bg-[#25b2d1] transition-colors'>
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className='w-[35px] h-[35px] rounded-full bg-[#35c2e1] flex items-center justify-center text-black font-bold text-[14px] self-start mt-1 flex-shrink-0'>
                U
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className='flex gap-3 justify-start'>
            <img src={aiImg} alt="AI" className='w-[35px] h-[35px] rounded-full border border-[#35c2e1] self-start flex-shrink-0' />
            <div className='bg-[#1a3a45] border border-[#35c2e120] px-4 py-3 rounded-2xl rounded-bl-none'>
              <div className='flex gap-1 items-center'>
                <span className='w-2 h-2 bg-[#35c2e1] rounded-full animate-bounce' style={{animationDelay:'0ms'}}></span>
                <span className='w-2 h-2 bg-[#35c2e1] rounded-full animate-bounce' style={{animationDelay:'150ms'}}></span>
                <span className='w-2 h-2 bg-[#35c2e1] rounded-full animate-bounce' style={{animationDelay:'300ms'}}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className='px-4 sm:px-8 pb-3 max-w-[900px] w-full mx-auto'>
        <div className='flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
          {QUICK_SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              disabled={loading}
              className='flex-shrink-0 bg-[#1a3a45] text-[#35c2e1] text-[12px] px-3 py-2 rounded-full border border-[#35c2e140] hover:border-[#35c2e1] hover:bg-[#35c2e115] transition-all disabled:opacity-50'
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className='w-full bg-[#0c2025] border-t border-[#35c2e130] px-4 sm:px-8 py-4'>
        <div className='max-w-[900px] mx-auto flex gap-3 items-center'>
          {/* Voice Button */}
          <button
            onClick={startVoice}
            className={`w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              listening
                ? 'bg-red-500 animate-pulse'
                : 'bg-[#1a3a45] border border-[#35c2e140] hover:border-[#35c2e1] text-[#35c2e1]'
            }`}
          >
            🎤
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Koi bhi product ke baare me puchho..."
            className='flex-1 h-[44px] bg-[#1a3a45] text-white text-[14px] rounded-xl px-4 placeholder:text-gray-500 outline-none border border-[#35c2e130] focus:border-[#35c2e1] transition-colors'
          />

          {/* Send Button */}
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className='w-[44px] h-[44px] bg-[#35c2e1] rounded-xl flex items-center justify-center text-black font-bold hover:bg-[#25b2d1] transition-colors disabled:opacity-40 flex-shrink-0 text-[18px]'
          >
            ➤
          </button>
        </div>
      </div>

    </div>
  )
}

export default AiAssistant
