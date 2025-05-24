import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import { useEffect } from 'react';
import AdminProductCard from '../components/AdminProductCard';

function AllProducts() {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const[allproduct,setAllProduct] = useState([]);

  const fetchAllProduct = async()=>{
    const respose = await fetch(SummaryApi.allprodcut.url);
    const dataResponse = await respose.json();

    setAllProduct(dataResponse?.data || []);

  }

  useEffect(()=>{
fetchAllProduct();
  },[])

  return (
    <div>

      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg capitalize'>all products</h2>
        <button
          className='capitalize py-2 px-4 rounded-full border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all'
          onClick={() => setOpenUploadProduct(true)}>
          Upload product
        </button>
      </div>


      {/* all products */}

      <div className='flex items-center flex-wrap gap-5 py-5 h-[calc(100vh-200px)] overflow-y-scroll'>
        {
          allproduct.map((product,index)=>{
           return(
             <AdminProductCard fetchdata={fetchAllProduct} data={product} key={index+"allproduct"}/>
           )
          })
        }
      </div>


      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false) } fetchdata={fetchAllProduct} />
        )
      }



    </div>
  )
}

export default AllProducts
