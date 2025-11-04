import React, { useEffect, useState } from 'react'
import Background from '../components/Background';
import Hero from '../components/Hero';
import Products from './Products';
import OurPolicy from '../components/OurPolicy';
import NewLetterBox from '../components/NewLetterBox';
import Footer from '../components/Footer';

function Home() {
  const heroData = [
    { text1: "30% Off Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore our Best Collection", text2: "Shop Now" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
    <div className="w-[100vw] lg:h-[100vh]  md:h-[50vh] sm:h-[30vh] flex bg-gradient-to-l from-[#141414] to-[#0c2025]">

     {/* Right side = Hero */}
      <div className="w-[40%] h-full">
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>


      {/* Left side = Background */}
      <div className="w-[60%] h-full">
        <Background heroCount={heroCount} />
      </div>

      
    </div>
    <Products/>
   <OurPolicy/>
   <NewLetterBox/>
   <Footer/>
    </div>
  );
}

export default Home;
