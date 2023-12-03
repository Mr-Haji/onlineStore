import React from 'react'
import { useState } from 'react'
import Card from '../../components/Cards/Card'
import { useEffect } from 'react'
import { useNavigate, } from "react-router-dom";
import { Stack, Button, } from '@mui/material';
const GetFromLocalStorage = () => {
    const Navigate = useNavigate()
    const [cartData, setcartData] = useState([])
    const addToCart = () => {
        const getCardData = localStorage.getItem("cratItems")
        setcartData([JSON.parse(getCardData)])


    }
    const signOut = () => {
        Navigate("/")
    }
    useEffect(() => addToCart(), [])
    console.log(cartData)
    return (<Stack sx={{
        height: "100vh",
        bgcolor: "orange",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <Button onClick={() => signOut()}>Sign Out</Button>
        {cartData.map((e, i) => <div key={e.productId}>
            <Card
                title={e.productTitile}
                category={e.productCategory}
                description={e.productDescription}
                image={e.productImage}
                price={e.productPrice}
                // rating={e.rating.count}
                lastButton={"Confirm Your Order"}
            // onClick = {}
            />

        </div>
        )
        }
    </Stack>

    )
}

export default GetFromLocalStorage