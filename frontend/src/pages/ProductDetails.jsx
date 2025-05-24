import React, { useCallback, useContext } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import SummaryApi from '../common';
import { useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import DisplayInrCurrency from '../helpers/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import AddToCart from '../helpers/AddtoCart';
import Context from '../context';

function ProductDetails() {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  //console.log(params);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const productImageisLoading = new Array(4).fill(null);
  const [activeImage, setActiveImag] = useState(null);

  const { fetchUserAddToCart } = useContext(Context);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)


  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse.data);
    setActiveImag(dataResponse?.data?.productImage[0]);
    //console.log(data);

  }



  useEffect(() => {

    fetchProductDetails();


  }, [params?.id]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImag(imageUrl);
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    //  console.log(left, top, width, height);

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x, y
    })


  }, [zoomImageCoordinate])

  const handlLeaveImageZoom = () => {
    setZoomImage(false);
    //console.log("leaved");
  }

  const handleAddToCart = async (e, id) => {

    await AddToCart(e, id)

    fetchUserAddToCart();

  }

  const handleBuyProduct = async (e, id) => {

    await AddToCart(e, id)

    fetchUserAddToCart();
    navigate("/cart")
  }


  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col md:flex-row gap-4 flex-wrap'>
        {/* product image */}
        {/* old classes h-96 flex flex-col lg:flex-row-reverse gap-4 */}
        <div className='w-full md:w-1/2 flex flex-col lg:flex-row-reverse gap-4'>
          {/* Main Product Image old css h-[300px] md:w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2*/}
          <div className='h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-2 flex-shrink-0'>
            <img src={activeImage} alt="image1" className='cursor-crosshair h-full w-full object-scale-down mix-blend-multiply z-20' onMouseMove={handleZoomImage} onMouseLeave={handlLeaveImageZoom} />

            {/* product zoom old css hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 rounded-md p-1 -right-[510px] top-0*/}
            {
              zoomImage && (
                <div className='hidden xl:block absolute w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[400px] overflow-hidden bg-slate-200 rounded-md p-1 -right-[310px] 2xl:-right-[510px] top-0'>
                  {/* old css min-h-[400px] min-w-[500px]*/}
                  <div className='w-full h-full  mix-blend-multiply scale-125 rounded-md' style={{

                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                    backgroundRepeat: `no-repeat`,


                  }}>

                  </div>
                </div>
              )
            }



          </div>

          {/* thubnails */}


          <div className='h-full'>
            {
              loading ? (

                // old css =flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full
                <div className='flex gap-2 lg:flex-col overflow-x-auto md:overflow-y-auto scrollbar-none h-full'>
                  {
                    productImageisLoading.map((el, index) => {
                      return (
                        <div key={index + 1} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>

                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                //old css = flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full
                <div className='flex gap-2 lg:flex-col overflow-x-auto md:overflow-y-auto scrollbar-none h-full'>
                  {
                    data?.productImage.map((imageurl, index) => {
                      return (
                        <div key={index + 1} className='h-20 w-20 bg-slate-200 rounded-md'>
                          <img src={imageurl} alt="" className='cursor-pointer w-full h-full object-scale-down mix-blend-multiply' onClick={() => handleMouseEnterProduct(imageurl)} />

                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
          

        </div>
        {/* product details */}
        {
          loading ? (
            <div className='grid gap-1'>
              <p className='bg-slate-200 inline-block h-4 w-full animate-pulse rounded-full '></p>
              <h2 className='text-2xl md:text-4xl font-medium h-6 bg-slate-200 rounded-full animate-pulse'></h2>
              <p className='capitalize text-slate-500 h-4 bg-slate-200 min-w-[100px] rounded-full animate-pulse'></p>
              <div className="flex bg-slate-200 animate-pulse h-6  items-center gap-1">


              </div>

              <div className='flex items-center gap-2 text-2xl h-6 bg-slate-200 animate-pulse lg:text-3xl font-medium my-2'>
                <p className='text-red-600 bg-slate-200'></p>
                <p className='text-slate-400 line-through bg-slate-200'></p>
              </div>

              <div className='flex h-8 bg-slate-200 animate-pulse rounded-full items-center gap-3'>

              </div>

              <div className='h-16 bg-slate-200 rounded-full animate-pulse'>
                <p className='text-slate-600 font-medium my-1'></p>
                <p></p>
              </div>

            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl md:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-500'>{data?.category}</p>
              <div className="text-yellow-500 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2'>
                <p className='text-red-600'>{DisplayInrCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{DisplayInrCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3'>
                <button className='border-2 border-white rounded-md bg-green-600 text-white px-3 hover:bg-white hover:border-black hover:text-black py-1 min-w-[100px] font-medium' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                <button className='border-2 border-red-600 rounded-md bg-red-600 hover:bg-white hover:text-red-600 text-white px-3 py-1 min-w-[100px] font-medium' onClick={(e) => handleAddToCart(e, data._id)}>Add to Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description</p>
                <p>{data?.description}</p>
              </div>

            </div>
          )
        }




      </div>


      {
        data.category && (
          <CategoryWiseProductDisplay heading="Recommended Product" category={data.category} />
        )
      }







    </div>
  )
}

export default ProductDetails
