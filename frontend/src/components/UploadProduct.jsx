import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import ProductCategory from '../helpers/ProductCategrory';
import { IoMdCloudUpload } from "react-icons/io";
import UploadImage from '../helpers/UploadImage';
import DisplayImage from './DisplayImage';
import { MdOutlineDeleteForever } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from "react-toastify"

function UploadProduct(
  { onClose,fetchdata }
) {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description:"",
    price: "",
    sellingPrice: "",


  });

  //const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {

    const {name,value} = e.target;

     setData((prev) => {
      return {
        ...prev,
        [name] :value
      }
    });


  }

  const handleUploadProduct = async (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    // setUploadProductImageInput(file.name)
    //console.log(file.name);

    const uploadImageCloudinary = await UploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }
    });

    // console.log("uploadimage", uploadImageCloudinary.url);


  }

  const handleDeletProductImage= async(index)=>{
    
    console.log(index);
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage]
      }
    });

  }



  // handlesumbit upload product
  const handleSubmit = async(e) =>{
    e.preventDefault();

    //console.log(data);

    const respose = await fetch(SummaryApi.uploadProduct.url,{
      method:SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
  
    const responseData = await respose.json();

    if(responseData.success){
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }

  }

  return (
    <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg '>Upload product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoMdCloseCircle />
          </div>
        </div>

        <form className='grid p-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>product Name:</label>
          <input
            required
            type="text"
            id='productName'
            placeholder='enter product name'
            name='productName'
            value={data.productName}
            className='p-2 capitalize bg-slate-100 border rounded outline-none'
            onChange={handleOnChange} />
          <label htmlFor='brandName' className='capitalize mt-3'>brand Name:</label>
          <input
            type="text"
            required
            id='brandName'
            name='brandName'
            placeholder='enter brand name'
            value={data.brandName}
            className='p-2 capitalize bg-slate-100 border rounded outline-none'
            onChange={handleOnChange} />
          <label htmlFor='category' className='capitalize mt-3'>category:</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 capitalize bg-slate-100 border rounded outline-none'>
             <option value={""}>Select Category</option>
            {
              ProductCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                )
              })
            }
          </select>
          <label htmlFor='productImage' className='capitalize mt-3'>product Image:</label>

          <label htmlFor="uploadImageInput">
            <div className='p-2 cursor-pointer bg-slate-100 border rounded h-32 w-full flex justify-center items-center mb-2'>

              <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>

                <span className='text-5xl'><IoMdCloudUpload /></span>
                <p className='text-sm capitalize'>upload product image</p>
                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>


            </div>
          </label>

          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data.productImage.map((el, index) => {
                      return (
                        <div key={index} className='relative group'>
                          <img
                            
                            src={el}
                            alt={el}
                            width={80}
                            height={80}
                            className='bg-slate-100 mix-blend-multiply cursor-pointer'
                            onClick={() => {
                              setFullScreenImage(el),
                                setOpenFullScreenImage(true)
                            }} />
                          <div className='absolute bottom-0 right-0 bg-red-600 rounded-full text-white hidden group-hover:block cursor-pointer' onClick={()=>handleDeletProductImage(index)}>
                            <MdOutlineDeleteForever />
                          </div>
                        </div>

                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-500 text-x'>* please upload product image</p>
              )
            }

          </div>


          <label htmlFor='price' className='capitalize mt-3'>price :</label>
            <input
            type="number"
            required
            id='price'
            placeholder='enter price number'
            name='price'
            value={data.price}
            className='p-2 capitalize bg-slate-100 border rounded outline-none'
            onChange={handleOnChange} />

            <label htmlFor='sellingPrice' className='capitalize mt-3'>selling Price :</label>
            <input
            type="number"
            required
            id='sellingPrice'
            placeholder='enter selling Price number'
            name='sellingPrice'
            value={data.sellingPrice}
            className='p-2 capitalize bg-slate-100 border rounded outline-none'
            onChange={handleOnChange} />


            <label htmlFor='description' className='capitalize mt-3'>Descritpion :</label>
            <textarea 
            id='description' 
            onChange={handleOnChange}  
            value={data.description} 
            name='description' 
            className='h-28 bg-slate-100 border rounded outline-none p-2' 
            placeholder='enter product description' 
            rows={3}>

            </textarea>

          <button className='px-3 my-5 bg-red-600 text-white py-2 hover:bg-red-700 transition-all'>Upload Product</button>
        </form>



      </div>


      {/* display image full Screen */}

      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }



    </div>
  )
}

export default UploadProduct
