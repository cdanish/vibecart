import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import FetchCategroyWiseProduct from '../helpers/FetchCategoryWiseProduct';
import DisplayInrCurrency from '../helpers/DisplayCurrency';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddtoCart';
import { useContext } from 'react';
import Context from '../context';

function HorizontalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {

    await AddToCart(e, id)
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

  const scrollRight = () => {
    scrollElement.current.scrollLeft -= 300;
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft += 300;
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
      <div className='flex items-center gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white p-1 shadow-md rounded-full absolute left-0 text-lg hidden md:block z-20' onClick={scrollRight}><FaAngleDoubleLeft /></button>
        <button className='bg-white p-1 shadow-md rounded-full absolute right-0 text-lg  hidden md:block z-20' onClick={scrollLeft}><FaAngleDoubleRight /></button>
        {
          loading ? (
            loadingList.map((product, index) => {
              return (
                <div key={index + 1} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>

                  <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                  </div>
                  <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis text-black line-clamp-1 bg-slate-200 animate-pulse p-1 rounded' ></h2>
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <div className='flex gap-3 w-full'>
                      <p className='text-red-600 p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                      <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>

                    </div>
                    <button className=' text-sm text-white px-3 py-0.5 rounded-md w-full bg-slate-200'></button>
                  </div>

                </div>
              )
            })
          ) : (
            data.map((product, index) => {
              return (
                <Link to={"/product/" + product?._id} key={index + 1} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>

                  <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                    <img src={product.productImage[0]} className=' cursor-pointer h-full object-scale-down hover:scale-125 transition-all' />
                  </div>
                  <div className='p-4 grid'>
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

export default HorizontalCardProduct
