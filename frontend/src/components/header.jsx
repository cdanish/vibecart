import React, { useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from "react-toastify"
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import { useContext } from 'react';
import Context from '../context';

function header() {

    const user = useSelector(state => state?.user?.user);
    // console.log(user)



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuDisplay, setMenuDisplay] = useState(false);

    const context = useContext(Context);
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q")

    //console.log(searchInput?.search.split("=")[1]);

    const initialSearch = searchInput?.search?.split("=")[1] || '';
    const [search, setSearch] = useState(searchQuery);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'

        });

        const data = await fetchData.json();
        console.log(data);
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");

        }
        if (data.error) {
            toast.error(data.message);
        }
    }

    //console.log("header Section", context);

    const handleSearch = (e) => {
        const { value } = e.target;

        setSearch(value);


        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/")
        }

    }

    return (
        <header>
            <div className="shadow-sm h-16 bg-white fixed w-full z-40">
                <div className='h-full container flex items-center justify-between p-4 mx-auto'>

                    <div className=''>
                        <Link to={"/"}>
                            <Logo w={90} h={50} />
                        </Link>
                    </div>

                    <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
                        <input value={search} onChange={handleSearch} type="text" placeholder='Search product here...' className='w-full outline-none ' />
                        <div className='text-lg min-w-[50px] h-8 flex justify-center items-center text-white bg-red-600 rounded-r-full'>
                            <FaSearch />
                        </div>
                    </div>

                    <div className='flex items-center gap-7'>

                        <div className='relative flex justify-center' >

                            {
                                user?._id && (

                                    <div className='text-3xl flex justify-center relative cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                                        {
                                            user?.profiePic ? (
                                                <img className='w-10 h-10 rounded-full' src={user?.profiePic} alt={user?.name} />
                                            ) : (
                                                <FaUserCircle />
                                            )
                                        }

                                    </div>

                                )
                            }


                            {
                                menuDisplay && (


                                    
                                        user?.role === ROLE.ADMIN && (

                                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-md rounded'>
                                            <nav>
                                                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>

                                            </nav>
                                        </div>

                                    )
                                    





                            )
                            }


                        </div>


                        {
                            user?._id && (
                                <Link to={"/cart"} className='cursor-pointer'>
                                    <div className='text-2xl relative'>
                                        <span><FaShoppingCart /></span>
                                        <div className=' bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
                                            <p className='text-sm'>{context?.cartProductCount}</p>
                                        </div>


                                    </div>
                                </Link>
                            )
                        }



                        <div>

                            {
                                user?._id ? (
                                    <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 '>Logout</button>
                                ) : (
                                    <Link className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 ' to={"/login"}>Login</Link>
                                )
                            }




                        </div>




                    </div>

                </div>
            </div>
        </header>
    )
}

export default header
