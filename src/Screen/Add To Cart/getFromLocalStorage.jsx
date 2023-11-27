import React from 'react'
import { useState } from 'react'
import Card from '../../components/Cards/Card'
import { useEffect } from 'react'
import { useNavigate, } from "react-router-dom";
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
    return (<>
        <button onClick={() => signOut()}>Sign Out</button>
        {cartData.map((e, i) => <div key={e.productId}>
            <Card
                title={e.productTitile}
                category={e.productCategory}
                description={e.productDescription}
                image={e.productImage}
                price={e.productPrice}
                // rating={e.rating.count}
                lastButton={"Add To Cart"}
                clickOnCartBtn={() => addToCart(e)}
            // onClick = {}
            />

        </div>
        )
        }
    </>
    )
}

export default GetFromLocalStorage