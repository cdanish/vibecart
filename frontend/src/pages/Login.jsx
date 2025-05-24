import React, { useContext, useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const generalContent = useContext(Context);
    //console.log("generalContent",generalContent.fetchUserDetails());

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(
            (prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            }
        )
    }


    //console.log("data login",data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate("/");
            generalContent.fetchUserDetails();
            generalContent.fetchUserAddToCart();

        }
        if (dataApi.error) {
            toast.error(dataApi.message)

        }


    }

    return (
        <section id='login'>
            <div className='container mx-auto p-4'>

                <div className=' min-h-[calc(100vh-120px)]'>
                    <div className='p-5 bg-white w-full max-w-md mx-auto rounded'>
                        <div className='w-20 h-20 mx-auto'>
                            <img src={LoginIcon} alt="login-icon" />
                        </div>

                        <form className='pt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
                            <div className='grid '>
                                <label>Email:</label>
                                <div className='bg-slate-100 p-2 '>
                                    <input onChange={handleChange} name='email' value={data.email} type="email" placeholder='enter email' className='w-full h-full outline-none bg-transparent' />
                                </div>
                            </div>

                            <div>
                                <label>Password:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input onChange={handleChange} name='password' value={data.password} type={showPassword ? "text" : "password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                        <span>
                                            {showPassword ? (<IoMdEye />) : (<FaEyeSlash />)}
                                        </span>
                                    </div>
                                </div>
                                <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600 my-2 text-gray-500'>Forgot password ?</Link>
                            </div>

                            <button className='bg-red-600 hover:bg-red-800 text-white px-6 py-2 w-full max-w-[150px] rounded-md hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                        </form>

                        <p className='text-center mt-4'>Don't Have an Account ? <Link to={"/sign-up"} className='hover:text-red-700 hover:underline text-red-500'>Sign Up</Link></p>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Login
