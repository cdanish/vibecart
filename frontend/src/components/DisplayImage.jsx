import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

function DisplayImage({
    imgUrl,
    onClose
}) {
    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <IoMdCloseCircle />
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt="" className='w-full h-full' />
                </div>
            </div>

        </div>
    )
}

export default DisplayImage
