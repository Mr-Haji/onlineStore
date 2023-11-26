import React, { useEffect, useId, useState } from 'react'
import { AUTH, DATABASE, STORAGE } from '../../../Utilities/FireBase/FireBase'
import { Button, Stack, TextField } from '@mui/material'
import { push, ref, set, } from "firebase/database"
import { onAuthStateChanged } from 'firebase/auth'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'


const ProductAdd = () => {

    useEffect(() => { checkUser() }, [])
    const [inputData, setinputData] = useState({})
    const [Product, setProduct] = useState(true)
    const [isUser, setIsUser] = useState()
    const [isPic, setIsPic] = useState()

    console.log(isUser);
    console.log(Product)

    const checkUser = () => {
        onAuthStateChanged(AUTH, (user) => {
            setIsUser(user.uid)
            console.log("runnn");

        })
    }
    const inputDataHandeler = (e) => {
        setinputData(prev => ({
            ...prev, [e.target.id]: e.target.value
        }))
        console.log(e.target.id,)

    }

    const snedDatahandeler = (e) => {
        const sendImage = (e) => {
            const sendImageRef = storageRef(STORAGE, `Images/${inputData.productImage}`)
            uploadBytes(sendImageRef, isPic).then((success) => {
                getDownloadURL(success.ref).then(function (imageURL) {
                    console.log("Pic jo ai hy ", imageURL);
                    setIsPic(imageURL)

                    console.log("image ur =>", isPic);
                }).catch(function (error) {
                    console.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })
        }

        const productAddData = {
            productId: Math.floor(Math.random() * 1000000000000),
            customerUid: isUser,
            productTitle: inputData.productTitle,
            productCategory: inputData.productCategory,
            productPrice: inputData.productPrice,
            productDescription: inputData.productDescription,
            productImage: isPic,
        }
        sendImage()

        const reffer = ref(DATABASE, `Products/` + productAddData.productId)
        set(reffer, productAddData)
        console.log("send Data");
        console.log(productAddData);

    }

    console.log(isPic);




    return (<Stack gap={1} height={"100vh"} justifyContent={"center"} alignItems={"center"} >
        <Stack>
            <TextField onChange={inputDataHandeler} label={"Product Title"} id="productTitle" />
        </Stack>
        <Stack>
            <TextField onChange={inputDataHandeler} label={"Product Category"} id='productCategory' />
        </Stack>
        <Stack>
            <TextField label={"Product Price"} onChange={inputDataHandeler} id='productPrice' />
        </Stack>
        <Stack>
            <TextField onChange={inputDataHandeler} label={"Product Description"} id='productDescription' />
        </Stack>
        <Stack>
            <TextField type='file' onChange={inputDataHandeler} id='productImage' />
        </Stack>
        <Stack>
            <Button onClick={snedDatahandeler}>Add Me</Button>
        </Stack>
        <Stack>
            <img src={isPic} alt="pic" />
        </Stack>
    </Stack >
    )
}


export default ProductAdd