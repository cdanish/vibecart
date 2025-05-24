import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

function AdminPanel() {

    const user = useSelector(state => state?.user?.user);

    const navigate = useNavigate();

    useEffect(()=>{

        if(user?.role !== ROLE.ADMIN){
            navigate("/");
        }

    },[])

    return (
        <div className='min-h-[calc(100vh-120px)] hidden md:flex'>

            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
               
                <div className='h-32 flex-col flex justify-center items-center'>
                    <div className='text-5xl flex justify-center relative cursor-pointer'>
                        {
                            user?.profiePic ? (
                                <img className='w-20 h-20 rounded-full' src={user?.profiePic} alt={user?.name} />
                            ) : (
                                <FaUserCircle />
                            )
                        }

                    </div>

                    <p className='capitalize text-lg font-bold'>{user?.name}</p>
                    <p className='text-sm text-gray-500'>{user?.role}</p>

                </div>
                        {/* navigation */}
                <div>
                        <nav className='grid p-4'>
                            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>Product</Link>
                        </nav>
                </div>

            </aside>
            <main className='w-full h-full p-2'>
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel
