import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import FetchCategroyWiseProduct from '../helpers/FetchCategoryWiseProduct';
import DisplayInrCurrency from '../helpers/DisplayCurrency';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddtoCart';
import { useContext } from 'react';
import Context from '../context';
import ScrollTop from "../helpers/ScrollTop"

function CategoryWiseProductDisplay({ category, heading }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    //console.log(category);
    const loadingList = new Array(13).fill(null);

     const {fetchUserAddToCart} = useContext(Context);

     const handleAddToCart = async(e,id)=>{

        await AddToCart(e,id)
       // console.log(fetchUserAddToCart);
        fetchUserAddToCart()
        
     }


    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await FetchCategroyWiseProduct(category);
        setLoading(false);
        setData(categoryProduct.data);
    }
    useEffect(() => {
        fetchData();
    }, [])

  

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center' >

                {

                    loading ? (

                        loadingList.map((product, index) => {
                            return (
                                <div key={index + 1} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>

                                    <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis text-black line-clamp-1 w-full animate-pulse p-4 bg-slate-200 rounded-full'></h2>
                                        <p className='capitalize text-slate-500 bg-slate-200 rounded-full'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 w-full animate-pulse p-2 bg-slate-200 rounded-full'></p>
                                            <p className='text-slate-500 line-through w-full animate-pulse p-2 bg-slate-200 rounded-full'></p>

                                        </div>
                                        <button className=' text-sm p-2 bg-slate-200 text-white px-3 py-3 rounded-full animate-pulse'></button>
                                    </div>

                                </div>
                            )
                        })

                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} key={index + 1} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={ScrollTop}>

                                    <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className=' cursor-pointer h-full object-scale-down hover:scale-105 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis text-black line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600'>{DisplayInrCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{DisplayInrCurrency(product?.price)}</p>

                                        </div>
                                        <button className=' text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-md' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to cart</button>
                                    </div>

                                </Link>
                            )
                        })
                    )


                }
            </div>

        </div>
    )
}

export default CategoryWiseProductDisplay
