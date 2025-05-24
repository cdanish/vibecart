import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUser from '../components/ChangeUser';

function AllUsers() {

    const [allUser, setAllUser] = useState([]);

    const[openUpdateRole,setOpenUpdateRole] = useState(false);
    
    const[updateUserDetails,setUpdateUserDetails] = useState({
        name:"",
        email:"",
        role:"",
        userId:""
    })

    const fetchAllUser = async () => {
        const fetchData = await fetch(SummaryApi.alluser.url, {
            method: SummaryApi.alluser.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json();
       // console.log(dataResponse);
        if (dataResponse.success) {
            setAllUser(dataResponse.data)
           // console.log(allUser);
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    }

    useEffect(() => {

        fetchAllUser();
        //console.log(allUser);
    }, []);

    return (
        <div className='pb-4 bg-white'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>

                    {
                        allUser.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                        
                                        onClick={()=>{
                                            setUpdateUserDetails(el),
                                            setOpenUpdateRole(true)
                                        }}
                                        
                                        >
                                            <MdEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

{
    openUpdateRole && (
        <ChangeUser 
        userId={updateUserDetails._id}
        name={updateUserDetails.name} 
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        callfun={fetchAllUser}
        onClose={()=>setOpenUpdateRole(false)}/>
    )
}
           
        </div>
    )
}

export default AllUsers
