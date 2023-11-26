import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import { useNavigate, useParams } from "react-router-dom";
import SingleProductPage from "../../components/Single Product Page/SingleProductPage";
import { Skeleton, Stack } from "@mui/material";
import { DATABASE, AUTH } from "../../Utilities/FireBase/FireBase"
import { ref, onChildAdded } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";


const Products = () => {

    const [productData, setProductData] = useState([]);
    const [loder, setloder] = useState(true);
    console.log(loder);



    const getData = async () => {
        // Recieved Data 
        onAuthStateChanged(AUTH, (user) => {
            console.log(user.uid);
            const reffer = ref(DATABASE, `Products/`)
            onChildAdded(reffer, recievedData => {
                console.log(recievedData.val().productImage);
                setProductData((prev => [...prev, recievedData.val()]))
            })
        })
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(productData)
    return (
        loder ? (<>
            <button>Home</button>
            <h1>This Is Products Page</h1>
            {productData.map((e, i) => <div key={i}>
                <Card
                    title={e.productTitile}
                    category={e.productCategory}
                    description={e.productDescription}
                    image={e.productImage}
                    price={e.productPrice}
                    // rating={e.rating.count}
                    lastButton={"Add To Cart"}
                // onClick = {}
                />

            </div>
            )
            }
        </>) : (<Skeleton variant="rectangular" width={500} height={700} />
        )

    );
};

export default Products;