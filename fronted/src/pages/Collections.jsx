import React, { useContext, useEffect, useState } from "react";
import Tittle from "../components/Tittle";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products ,search,showSearch} = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // ---- Category Toggle ----
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ---- SubCategory Toggle ----
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ---- Apply Filter ----
  const applyFilter = () => {
    let productCopy = products.slice();
    if(showSearch&&search)
    {
      productCopy=productCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productCopy);
  };



  const sortProducts=(e)=>{
   let fbCopy=filterProduct.slice()

   switch (sortType) {
    case 'low-high':
      setFilterProduct(fbCopy.sort((a,b)=>a.price-b.price))
      break;
   case 'high-low':
    setFilterProduct(fbCopy.sort((a,b)=>a.price-b.price))
    default:
      applyFilter()
      break;
   }
  }


  useEffect(()=>{
    sortProducts()
  },[sortType])

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch]);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden z-[2]">
      {/* FILTER BUTTON - visible only on mobile */}
      <div className="w-full md:hidden flex justify-start px-5 mb-4">
        <button
          className="bg-[#0f2f3f] text-white px-5 py-2 rounded-md text-[18px] font-semibold border border-[#35c2e1]"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* FILTER SIDEBAR */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] p-[20px] border-r border-gray-500 text-[#aaf5fa] bg-[#0c2025] transition-all duration-300 ease-in-out
        ${showFilter ? "block" : "hidden"} md:block`}
      >
        <p className="text-[25px] font-semibold flex gap-[5px] items-center justify-start mb-4">
          FILTERS
        </p>

        {/* CATEGORIES */}
        <div className="border border-[#dedcdc] p-4 mt-4 rounded-md bg-slate-700">
          <p className="text-[18px] text-[#f8fafa] mb-2 font-medium">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-[8px]">
            {["Men", "Women", "Kids"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-[10px] text-[16px] font-light"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#46d1f7]"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUB-CATEGORIES */}
        <div className="border border-[#dedcdc] p-4 mt-4 rounded-md bg-slate-700">
          <p className="text-[18px] text-[#f8fafa] mb-2 font-medium">
            SUB-CATEGORIES
          </p>
          <div className="flex flex-col gap-[8px]">
            {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-[10px] text-[16px] font-light"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#46d1f7]"
                  value={sub}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="flex-1 w-full lg:ml-[20vw] md:ml-[30vw] p-[20px] lg:px-[50px] flex flex-col gap-6">
        {/* Title + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-slate-700 text-white mt-3 md:mt-0 w-[100%] md:w-[220px] h-[50px] px-[10px] rounded-lg border-2 border-[#35c2e1] focus:outline-none"
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="w-full flex flex-wrap justify-center gap-[25px]">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white text-[18px] mt-10">No Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
