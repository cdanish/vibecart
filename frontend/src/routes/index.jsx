import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SingUp from "../pages/SingUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
    {
        path :"/",
        element: <App/>,
        children:[
            {
                path :"",
                element: <Home/>
            },
            {
                path:"login",
                element :<Login/>
            },
            {
                path:"/forgot-password",
                element :<ForgetPassword/>
            },
            {
                path:"/sign-up",
                element :<SingUp/>
            },
            {
                path:"/admin-panel",
                element: <AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<AllUsers/>
                    },
                    {
                        path:"all-products",
                        element:<AllProducts/>
                    }
                ]
            },
            {
                path:"/product-categroy",
                element :<CategoryProduct/>
            },
            {
                path:"/product/:id",
                element :<ProductDetails/>
            },
            {
                path:"cart",
                element :<Cart/>
            },
            {
                path:"search",
                element :<SearchProduct/>
            },
        ]
    }
])

export default router