import { Outlet } from 'react-router-dom'
import './App.css';
import Headers from "./components/header";
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useState } from 'react';

function App() {

  const dispatch = useDispatch();

  const [cartProductCount,setCartProductCount] = useState(0);


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json();
   // console.log(dataApi);

   if(dataApi.success){
    dispatch(setUserDetails(dataApi.data));
   }

  }

  const fetchUserAddToCart = async() =>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json();
   // console.log(dataApi);

   //console.log(dataApi?.data?.count);
   setCartProductCount(dataApi?.data?.count)

  }

  useEffect(() => {

    /*****************user details */
    fetchUserDetails();

    // userCart
    fetchUserAddToCart();

  }, []);

  return (
    <>

      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount, //current user add to cart count
        fetchUserAddToCart //update count 
      }}>
        <ToastContainer
        position='top-center'
        />
        <Headers />
        <main className='min-h-[100vh] pt-16'>
          <Outlet />
        </main>

        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
