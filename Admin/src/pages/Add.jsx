import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from "../components/Nav"
import upload from "../assets/image.png"
import axios from 'axios'
import { serverurl } from '../main'
import { toast } from 'react-toastify'
function Add() {
  const [image1, setimage1] = useState(null)
  const [image2, setimage2] = useState(null)
  const [image3, setimage3] = useState(null)
  const [image4, setimage4] = useState(null)
  const [name, SetName] = useState('');
  const [description, setDescription] = useState('');
  const [category, SetCategory] = useState('Men');
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])


  const handleAddProduct = async (e) => {

    e.preventDefault();
    try {

      if (!image1 || !image2 || !image3 || !image4) {
        alert("Please upload all 4 images");
        return;
      }
      console.log("Images selected:", image1, image2, image3, image4);


      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(`${serverurl}/api/product/addproduct`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      console.log(result.data)
      toast.success("Add Product Successfuly")
      if (result.data) {
        SetName("")
        setDescription("");
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        setPrice("")
        SetCategory("Men")
        setSubCategory("TopWear")
      }
    } catch (error) {
      console.log(error)
      toast.error("Add Product Failed")
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav />
      <Sidebar />
      <div className='w-full lg:w-[75%] flex items-center justify-start overflow-x-hidden lg:absolute lg:right-0 mt-[70px] lg:mt-0'>
        <form className='w-full h-[100%] mt-[20px] lg:mt-[70px] flex flex-col gap-[20px] sm:gap-[30px] py-[40px] sm:py-[60px] px-[20px] sm:px-[30px] lg:px-[60px]' onSubmit={handleAddProduct}>

          <div className='w-full text-[20px] sm:text-[25px] lg:text-[40px] text-white mb-[20px]'>Add Product Page</div>

          <div className='w-full flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Upload Images</p>
          </div>
          
          <div className='w-full flex items-center justify-start gap-[10px] sm:gap-[15px] flex-wrap'>
            <label htmlFor='image1' className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] cursor-pointer hover:border-[#46d1f7] flex-shrink-0'>
              <img src={!image1 ? upload : URL.createObjectURL(image1)} alt='' className='w-[100%] h-[100%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] object-cover' />
              <input type='file' id='image1' name='image1' hidden onChange={(e) => setimage1(e.target.files[0])} />
            </label>

            <label htmlFor='image2' className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] cursor-pointer hover:border-[#46d1f7] flex-shrink-0'>
              <img src={!image2 ? upload : URL.createObjectURL(image2)} alt='' className='w-[100%] h-[100%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] object-cover' />
              <input type='file' id='image2' name='image2' hidden onChange={(e) => setimage2(e.target.files[0])} />
            </label>

            <label htmlFor='image3' className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] cursor-pointer hover:border-[#46d1f7] flex-shrink-0'>
              <img src={!image3 ? upload : URL.createObjectURL(image3)} alt='' className='w-[100%] h-[100%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] object-cover' />
              <input type='file' id='image3' name='image3' hidden onChange={(e) => setimage3(e.target.files[0])} />
            </label>

            <label htmlFor='image4' className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] cursor-pointer hover:border-[#46d1f7] flex-shrink-0'>
              <img src={!image4 ? upload : URL.createObjectURL(image4)} alt='' className='w-[100%] h-[100%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] object-cover' />
              <input type='file' id='image4' name='image4' hidden onChange={(e) => setimage4(e.target.files[0])} />
            </label>
          </div>

          <div className='w-full flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Product Name</p>
            <input type='text' placeholder='Enter Here' className='w-full max-w-[600px] h-[40px] sm:h-[45px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[15px] sm:px-[20px] text-[16px] sm:text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => SetName(e.target.value)} value={name} required />
          </div>

          <div className='w-full flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Product Description</p>
            <textarea type='text' placeholder='Type Here' className='w-full max-w-[600px] py-[10px] h-[80px] sm:h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[15px] sm:px-[20px] text-[16px] sm:text-[18px] placeholder:text-[#ffffffc2] resize-none' onChange={(e) => setDescription(e.target.value)} value={description} required />
          </div>



          <div className='w-full flex items-center gap-[20px] flex-wrap'>
            <div className='w-full sm:w-[45%] lg:w-[30%] flex items-start justify-start flex-col gap-[10px]'>
              <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Product Category</p>
              <select name='' id='' className='bg-slate-600 w-full sm:w-[80%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] text-[16px] sm:text-[18px]' onChange={(e) => SetCategory(e.target.value)} value={category} required>
                <option value="Men" >Men</option>
                <option value='Women'>Women</option>
                <option value='Kids'>Kids</option>
              </select>
            </div>

            <div className='w-full sm:w-[45%] lg:w-[30%] flex items-start justify-start flex-col gap-[10px]'>
              <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Sub Category</p>
              <select name='' id='' className='bg-slate-600 w-full sm:w-[80%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] text-[16px] sm:text-[18px]' onChange={(e) => setSubCategory(e.target.value)} value={subCategory} required>
                <option value="TopWear" >TopWear</option>
                <option value='BottomWear'>BottomWear</option>
                <option value='WinterWear'>WinterWear</option>
              </select>
            </div>
          </div>

          <div className='w-full flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Product Price</p>
            <input type='number' placeholder='Enter Price' className='w-full max-w-[600px] h-[40px] sm:h-[45px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[15px] sm:px-[20px] text-[16px] sm:text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => setPrice(e.target.value)} value={price} required />
          </div>





          <div className='w-full flex items-start justify-center flex-col gap-[10px] py-[10px]'>
            <p className='text-[18px] sm:text-[20px] lg:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center justify-start gap-[10px] sm:gap-[15px] flex-wrap'>
              <div className={`px-[15px] sm:px-[20px] py-[7px] rounded-lg bg-slate-600 text-[16px] sm:text-[18px] hover:border-[#461f17] border-[2px] cursor-pointer transition-colors ${sizes.includes("S") ? "bg-green-600 text-black border-[#46d1f7]" : ""}`} onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>S</div>

              <div className={`px-[15px] sm:px-[20px] py-[7px] rounded-lg bg-slate-600 text-[16px] sm:text-[18px] hover:border-[#461f17] border-[2px] cursor-pointer transition-colors ${sizes.includes("M") ? "bg-green-600 text-black border-[#46d1f7]" : ""}`} onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>M</div>

              <div className={`px-[15px] sm:px-[20px] py-[7px] rounded-lg bg-slate-600 text-[16px] sm:text-[18px] hover:border-[#461f17] border-[2px] cursor-pointer transition-colors ${sizes.includes("L") ? "bg-green-600 text-black border-[#46d1f7]" : ""}`} onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} >L</div>

              <div className={`px-[15px] sm:px-[20px] py-[7px] rounded-lg bg-slate-600 text-[16px] sm:text-[18px] hover:border-[#461f17] border-[2px] cursor-pointer transition-colors ${sizes.includes("XL") ? "bg-green-600 text-black border-[#46d1f7]" : ""} `} onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>XL</div>

              <div className={`px-[15px] sm:px-[20px] py-[7px] rounded-lg bg-slate-600 text-[16px] sm:text-[18px] hover:border-[#461f17] border-[2px] cursor-pointer transition-colors ${sizes.includes("XXL") ? "bg-green-600 text-black border-[#46d1f7]" : ""}`} onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>XXL</div>
            </div>
          </div>
          
          <div className='w-full flex items-center justify-start gap-[10px] mt-[20px]'>
            <input type="checkbox" id='checkbox' className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] cursor-pointer' onChange={() => setBestSeller(prev => !prev)} />
            <label htmlFor='checkbox' className='text-[16px] sm:text-[18px] lg:text-[22px] font-semibold cursor-pointer'>
              Add to BestSeller
            </label>
          </div>

          <button className='w-full sm:w-[200px] px-[20px] py-[15px] sm:py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black font-semibold hover:bg-[#55c8e7] active:bg-slate-700 active:text-white active:border-[2px] border-white cursor-pointer transition-colors text-[16px] sm:text-[18px]'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Add