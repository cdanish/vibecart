import React, { useState } from 'react'
import ROLE from "../common/role"
import { IoCloseCircle } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function ChangeUser({
    name,email,role,
    onClose,
    userId,
    callfun
}) {
    const [userRole,setUserRole] = useState(role);

    const handleOnchangeSelect = (e) =>{
        setUserRole(e.target.value);
       // console.log(e.target.value) ;
    }

    const updateUserRole = async () =>{

        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method:SummaryApi.updateUser.method,
            credentials: 'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                userId :userId,
                role:userRole
            })
        })

        const responseData = await fetchResponse.json();

        if(responseData.success){
            toast.success(responseData.message);
            onClose();
            callfun();
        }
        

    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-45'>
            <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

                <button className='block ml-auto' onClick={onClose}>
                    <IoCloseCircle />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnchangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='w-fit mx-auto block px-3 py-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUser
