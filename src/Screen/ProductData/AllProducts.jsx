import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import { useNavigate } from "react-router-dom";
import SingleProductPage from "../../components/Single Product Page/SingleProductPage";
import { Button, Skeleton, Stack } from "@mui/material";
import { DATABASE, AUTH } from "../../Utilities/FireBase/FireBase"
import { ref, onChildAdded, push } from "firebase/database";
import { onAuthStateChanged, signOut, } from "firebase/auth";


const Products = () => {
    const Navigate = useNavigate()
    const [Count, setCount] = useState(0)
    const [productData, setProductData] = useState([]);
    const [loder, setloder] = useState(true);
    const signOut = () => {
        Navigate("/")
    }
    const getData = async () => {
        // Recieved Data 
        const reffer = ref(DATABASE, `Products/`)
        setProductData([])
        onChildAdded(reffer, recievedData => setProductData((prev => [...prev, recievedData.val()])))

    };
    //Cart
    const cartScreen = () => {
        Navigate("/cart")
    }
    const addToCart = (e) => {
        localStorage.setItem("cratItems", JSON.stringify(e))
        setCount(prev => prev + 1)
        const getCardData = localStorage.getItem("cratItems")
        console.log(JSON.parse(getCardData))
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        loder ? (<Stack >
            <Stack flexDirection={"row"}>
                <Button onClick={() => signOut(AUTH)} >Sign Out</Button>
                <Button onClick={cartScreen} >Add To Cart {Count}</Button>

            </Stack>
            <Stack
                sx={{

                    justifyContent: "space-evenly",
                    gap: 2,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}>
                {productData.map((e, i) => <div key={e.productId}>
                    <Card
                        title={e.productTitle}
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
            </Stack>
        </Stack>) : (<Skeleton variant="rectangular" width={500} height={700} />
        )

    );
};

export default Products;