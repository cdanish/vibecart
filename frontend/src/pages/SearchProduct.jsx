import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

function SearchProduct() {

    const query = useLocation();

    const [data,setData]  = useState([]);
    const [loading,setLoading] = useState(false);


   // console.log(query.search);

   const fetchProduct = async() =>{
    setLoading(true);
    const response = await fetch(SummaryApi.SearchProduct.url+query.search);

    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse?.data);

    //console.log(dataResponse);

   }

   useEffect(()=>{
    fetchProduct();
   },[query])

  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>loading...</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Result :{data.length}</p>
        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center'>No Data Found....</p>
            )
        }

        {
            data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data}/>
            )
        }
     
    </div>
  )
}

export default SearchProduct
