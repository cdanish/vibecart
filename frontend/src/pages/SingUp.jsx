import React, { useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import imageToBase64 from '../helpers/ImageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function SingUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profiePic: ""
    })

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

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0];

        const imagePic = await imageToBase64(file);
        setData((prev)=>{
            return{
                ...prev,
                profiePic:imagePic
            }
        })
      //  console.log(imagePic);
    }


    //console.log("data login", data);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method:SummaryApi.signUp.method,
                headers:{
                    "content-type":"application/json"
                },
                body : JSON.stringify(data)
            })
    
            const datApi = await dataResponse.json();

            if(datApi.success){
                toast.success(datApi.message);
                navigate("/login");
            }
            
            if(datApi.error){
                toast.error(datApi.message);
            }
            

           // console.log(datApi);
        }else{
          //  console.log("please check confirm password & password")
        }

        

        //console.log(data)
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-4'>

                <div className='bg-white p-5 w-full max-w-md mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>

                        <div>
                            <img src={data.profiePic || LoginIcon} alt="login-icon" />
                        </div>

                        <form>

                            <label>
                            <div className='text-xs bg-slate-200 pb-5 pt-2 text-center absolute cursor-pointer bottom-0 w-full bg-opacity-75'>
                                Upload Photo
                            </div>
                                <input type="file" className='hidden' onChange={handleUploadPic}/>
                            </label>
                            
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
                        <div className='grid '>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2 '>
                                <input required onChange={handleChange} name='name' value={data.name} type="text" placeholder='enter Name' className=' w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='grid '>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2 '>
                                <input required onChange={handleChange} name='email' value={data.email} type="email" placeholder='enter email' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input required onChange={handleChange} name='password' value={data.password} type={showPassword ? "text" : "password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {showPassword ? (<IoMdEye />) : (<FaEyeSlash />)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confim Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input required onChange={handleChange} name='confirmPassword' value={data.confirmPassword} type={showConfirmPassword ? "text" : "password"} placeholder='enter Confirm password' className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    <span>
                                        {showConfirmPassword ? (<IoMdEye />) : (<FaEyeSlash />)}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <button className='bg-red-600 hover:bg-red-800 text-white px-6 py-2 w-full max-w-[150px] rounded-md hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                    </form>

                    <p className='text-center mt-4'>Already Have an Account ? <Link to={"/login"} className='hover:text-red-700 hover:underline text-red-500'>Login</Link></p>

                </div>

            </div>
        </section>
    )
}

export default SingUp
