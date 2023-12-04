import DashBoard from "../../Screen/DashBoard/DashBoard"
import LogIn from "../../Screen/LogIn/LogIn";
import SignUp from "../../Screen/SignUp/SignUp";
import ProductAdd from "../../Screen/Product Upload/Admin/ProductAdd";
import AllProducts from "../../Screen/ProductData/AllProducts"
import ErrorPage from "../../Screen/Error/ErrorPage"
import GetFromLocalStorage from "../../Screen/Add To Cart/getFromLocalStorage"

export const RouteList = [{

    path: "/dashBoard",
    element: <DashBoard />
}, {
    path: "/logIn",
    element: <LogIn />
},
{
    path: "/",
    element: <SignUp />
},
{
    path: "/productAdd",
    element: <ProductAdd />
},
{
    path: "/products",
    element: <AllProducts />
},
{
    path: "/cart",
    element: <GetFromLocalStorage />
},
{
    path: "*",
    element: <ErrorPage />
},

];
