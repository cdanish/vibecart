import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

function CategoryList() {

    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const [categroyProduct, setCategroyProduct] = useState([]);

    const fetchCategroyProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategroyProduct(dataResponse.data);

        //  console.log(categroyProduct);
    }

    useEffect(() => {
        fetchCategroyProduct();
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-3 justify-between overflow-scroll scrollbar-none'>
                {

                    loading ? (

                        categoryLoading.map((el, index) => {
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-spin' key={index+1}></div>
                        })


                    ) : (


                        categroyProduct.map((product, index) => {
                            return (
                                <Link key={index + 1} to={"/product-categroy?category=" + product?.category} className='cursor-pointer'>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={product?.productImage[0]} alt={index + 1} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>
                                    <p className='capitalize text-center text-sm md:text-base'>{product?.category}</p>
                                </Link>
                            )
                        })

                    )

                }
            </div>
        </div>
    )
}

export default CategoryList
