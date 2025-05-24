import React, { useEffect, useState } from 'react';
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

function BannerProduct() {

    const [currentImage,setCurentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    const nextImage = () =>{

        if(desktopImages.length-1 >currentImage){
            setCurentImage(preve => preve+1)
        }
        
    }

    const preveImage = () =>{

        if(currentImage != 0 ){
            setCurentImage(preve => preve-1)
        }
        
    }

    useEffect(()=>{

        const interval = setInterval(() => {
            if(desktopImages.length-1 >currentImage){
                nextImage();
            }else(
              setCurentImage(0)  
            )
        }, 3000);

        return ()=>clearInterval(interval)

    },[currentImage]);

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-64 md:h-72 w-full bg-slate-200 rounded relative '>
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white p-1 shadow-md rounded-full'><FaAngleDoubleLeft /></button>
                        <button onClick={nextImage} className='bg-white p-1 shadow-md rounded-full'><FaAngleDoubleRight /></button>
                    </div>
                    
                </div>

                {/* desktop & tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>

                    {
                        desktopImages.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl + index} style={{transform:`translateX(-${currentImage *100}%)`}}>
                                    <img src={imageUrl} alt="image1" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                    {/* mobile verison */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>

                    {
                        mobileImages.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl + index} style={{transform:`translateX(-${currentImage *100}%)`}}>
                                    <img src={imageUrl} alt="image1" className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
