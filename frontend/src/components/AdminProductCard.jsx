import React from 'react'
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from '../pages/AdminEditProduct';
import { useState } from 'react';
import DisplayInrCurrency from '../helpers/DisplayCurrency';
function AdminProductCard({
    data,
    fetchdata
}) {

    // console.log(data);
    const [editProduct, setEditProduct] = useState(false);
    return (

        <div className='bg-white rounded p-2'>
            <div className='w-40 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                     <img src={data?.productImage[0]} width={120} height={120} className=' mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
                <div>
                    <div>
                        <p className='font-semibold'>
                            {
                             DisplayInrCurrency(data?.sellingPrice)
                            }
                        </p>
                        
                    </div>
                    <div className='w-fit ml-auto p-2 cursor-pointer bg-green-200 hover:bg-green-600 hover:text-white rounded-full' onClick={() => setEditProduct(true)}>
                        <FaEdit />
                    </div>
                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct fetchdata={fetchdata} productdata={data} onClose={() => setEditProduct(false)} />
                )
            }


        </div>
    )
}

export default AdminProductCard
