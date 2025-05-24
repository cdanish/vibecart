import React, { useContext } from 'react'
import DisplayInrCurrency from '../helpers/DisplayCurrency';
import scrollTop from '../helpers/ScrollTop';
import Context from '../context';
import AddToCart from '../helpers/AddtoCart';
import { Link } from 'react-router-dom';

function VerticalCard({loading,data=[]}) {

    const loadingList = new Array(13).fill(null);

    //add to cart
    const {fetchUserAddToCart} = useContext(Context);
    const handleAddToCart = async(e,id)=>{

        await AddToCart(e,id)
       // console.log(fetchUserAddToCart);
        fetchUserAddToCart()
        
     }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-2 overflow-x-scroll scrollbar-none transition-all' >

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
                                <Link to={"/product/"+product?._id} key={index + 1} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>

                                    <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product?.productImage[0]} className=' cursor-pointer h-full object-scale-down hover:scale-105 transition-all mix-blend-multiply' />
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
  )
}

export default VerticalCard
