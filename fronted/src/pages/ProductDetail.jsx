import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import RelatedProduct from '../components/RelatedProduct';

function ProductDetail() {
    const {productId}=useParams()
    const {products,currency,addtoCart}=useContext(shopDataContext);
    const [productData,setproductData]=useState(false)

    const[image,setImage]=useState('')
    const[image1,setImage1]=useState('')
    const[image2,setImage2]=useState('')
    const[image3,setImage3]=useState('')
    const[image4,setImage4]=useState('')
    const[size,setSize]=useState('')

    const fextchProductData=async () => {
        products.map((item)=>{
            if(item._id===productId)
            {
                setproductData(item)
                console.log(productData);
                setImage1(item.image1);
                setImage2(item.image2);
                setImage3(item.image3);
                setImage4(item.image4);
                setImage(item.image1);
                return null;
            }
        })
    }

    useEffect(()=>{
    fextchProductData()
    },[productId,products])

  return productData?(
    <div>
   <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-center flex-col lg:flex-row gap-[20px] px-4 lg:px-0'>
   
   {/* Image Section */}
   <div className='w-full lg:w-[50vw] mt-[70px] flex items-center justify-center gap-[15px] sm:gap-[20px] flex-col-reverse lg:flex-row p-4'>
     {/* Thumbnail Images */}
     <div className='w-full lg:w-[20%] flex items-center justify-center gap-[15px] lg:gap-[20px] lg:flex-col'>
        <div className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] bg-slate-300 border-[1px] border-[#80808049] rounded-md flex-shrink-0'>
          <img src={image1} alt='' className='w-[100%] h-[100%] cursor-pointer rounded-md object-cover hover:opacity-80 transition-opacity' onClick={()=>setImage(image1)}/>
        </div>

        <div className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] bg-slate-300 border-[1px] border-[#80808049] rounded-md flex-shrink-0'>
          <img src={image2} alt='' className='w-[100%] h-[100%] cursor-pointer rounded-md object-cover hover:opacity-80 transition-opacity' onClick={()=>setImage(image2)}/>
        </div>

        <div className='w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] bg-slate-300 border-[1px] border-[#80808049] rounded-md flex-shrink-0'>
          <img src={image4} alt='' className='w-[100%] h-[100%] cursor-pointer rounded-md object-cover hover:opacity-80 transition-opacity' onClick={()=>setImage(image4)}/>
        </div>
     </div>
     
     {/* Main Image */}
     <div className='w-full lg:w-[75%] h-[300px] sm:h-[400px] lg:h-[500px] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
        <img src={image} alt='' className='w-[100%] h-[100%] rounded-md object-cover'/>
     </div>
   </div>

   {/* Product Info Section */}
   <div className='w-full lg:w-[50vw] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[20px] lg:px-[40px] gap-[15px] lg:gap-[20px]'>
    <h1 className='text-[24px] sm:text-[32px] lg:text-[40px] text-white font-semibold text-center lg:text-left'>{productData.name.toUpperCase()}</h1>
    <p className='text-[24px] sm:text-[28px] lg:text-[30px] font-semibold text-white text-center lg:text-left'>{currency}{productData.price}</p>
    <p className='w-[100%] text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-[white] leading-relaxed text-center lg:text-left'>{productData.description} and stylish, Breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable and designed for effortless style.</p>
    
    <div className='flex flex-col gap-[15px] my-[10px] w-full'>
      <p className='text-[20px] sm:text-[22px] lg:text-[25px] font-semibold text-white text-center lg:text-left'>Select Size</p>
      <div className='flex gap-2 flex-wrap justify-center lg:justify-start'>
        {
         productData.sizes.map((item,index)=>(
          <button key={index} className={`border py-2 px-4 bg-slate-300 rounded-md text-black font-medium hover:bg-slate-200 transition-colors ${item===size?'bg-black text-blue-600 text-lg border-blue-600':''}`} onClick={()=>setSize(item)}>{item}</button>
         ))
        }
      </div>
      <button className='w-full sm:w-auto text-[16px] sm:text-[18px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[12px] px-[30px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-black hover:bg-[#5a6b71] transition-colors' onClick={()=>addtoCart(productData._id,size)}>Add to Cart</button>
    </div>
    
    <div className='w-[100%] text-[14px] sm:text-[16px] text-white space-y-1 text-center lg:text-left'>
      <p>✓ 100% original Product.</p>
      <p>✓ Cash on delivery is available on this product</p>
      <p>✓ Easy return is available with exchange policy within 7 days</p>
    </div>
   </div>
   
   </div>
      <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden'>
        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
          <p className='border px-5 py-3 text-sm text-white'>Description</p>
          <p className='border px-5 py-3 text-sm text-white'>Review(124)</p>
        </div>
        <div className='w-[90%] md:[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
          <p className='w-[90%] h-[90%] flex items-center justify-center'>Upgrade your wardrobe with this stylish slim-fit cotton shirt This premium cotton shirt is crafted from 100% pure, breathable cotton that ensures all-day comfort and freshness. Its soft texture and lightweight fabric make it perfect for both casual and formal occasions. Designed with a tailored fit, neat button-down front, and elegant collar, it adds a touch of sophistication to your look. The durable stitching and fine craftsmanship guarantee long-lasting wear, while the easy-care fabric offers minimal shrinkage even after multiple washes. Ideal for every season, this versatile cotton shirt pairs effortlessly with jeans, chinos, or trousers—making it a timeless wardrobe essential for every man.</p>
        </div>
        <RelatedProduct category={productData.category} subcategory={productData.subcategory} currentProductId={productData._id}/>
      </div>
    </div> 
  ):<div className='opacity-0'></div>
}

export default ProductDetail