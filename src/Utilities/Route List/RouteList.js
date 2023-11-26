import DashBoard from "../../Screen/DashBoard/DashBoard"
import LogIn from "../../Screen/LogIn/LogIn";
import SignUp from "../../Screen/SignUp/SignUp";
import ProductAdd from "../../Screen/Product Upload/Admin/ProductAdd";
import AllProducts from "../../Screen/ProductData/AllProducts"

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

];
