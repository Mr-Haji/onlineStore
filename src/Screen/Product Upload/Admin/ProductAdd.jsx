import React, { useEffect, useId, useState } from 'react'
import { AUTH, DATABASE, STORAGE } from '../../../Utilities/FireBase/FireBase'
import { Button, Stack, TextField } from '@mui/material'
import { push, ref, set, } from "firebase/database"
import { onAuthStateChanged } from 'firebase/auth'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate, } from "react-router-dom";


const ProductAdd = () => {

    const checkUser = () => {
        //user Check 
        onAuthStateChanged(AUTH, (user) => {
            setIsUser(user.uid)

        })
    }
    useEffect(() => { checkUser() }, [])
    const [inputData, setinputData] = useState({})
    const [Product, setProduct] = useState(true)
    const [isUser, setIsUser] = useState("")
    const [isPic, setIsPic] = useState("")
    const [img, setImg] = useState("")
    const [isKey, setIsKey] = useState("")
    const [picPreview, setpicPreview] = useState(false)
    const Navigate = useNavigate()
    // get image from input 
    const showImg = (e) => {
        console.log(e.target.files[0], "Call")
        const imageUrl = e.target.files[0]
        setImg(imageUrl);
        const localImgURL = URL.createObjectURL(e.target.files[0]);
        e && setpicPreview(localImgURL)
    }
    const inputDataHandeler = (e) => {
        // all input data get
        setinputData(prev => ({
            ...prev, [e.target.id]: e.target.value
        }))
    }
    // console.log(inputData);
    const snedDatahandeler = (e) => {
        // key for Id
        const keyRef = ref(DATABASE)
        const key = push(keyRef).key
        setIsKey(key)
        //send data
        const sendData = () => {

            const productAddData = {
                productId: isKey,
                customerUid: isUser,
                productTitle: inputData.productTitle,
                productCategory: inputData.productCategory,
                productPrice: inputData.productPrice,
                productDescription: inputData.productDescription,
                productImage: isPic,
            }
            console.log("send Data");
            console.log(productAddData);
            const reffer = ref(DATABASE, `Products/` + productAddData.productId)
            set(reffer, productAddData)
        }
        //send image to storage and get link
        const sendImage = (e) => {
            const sendImageRef = storageRef(STORAGE, `Images/${isKey}`)
            uploadBytes(sendImageRef, img).then((success) => {
                getDownloadURL(success.ref).then(function (imageURL) {
                    console.log("Pic jo ai hy ", imageURL);

                    setIsPic(imageURL)


                    // console.log("image ur =>", isPic);
                }).catch(function (error) {
                    console.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })
        }
        sendImage()
        sendData()
        setinputData([])

    }

    const signOut = () => {
        Navigate("/")
    }
    return (<Stack gap={1} height={"100vh"} justifyContent={"center"} alignItems={"center"} >

        <Stack>
            <Button onClick={signOut} >Sign out</Button>
        </Stack>
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
            <TextField type='file' onChange={showImg} id='productImage' />
        </Stack>
        <Stack>
            <Button onClick={snedDatahandeler}>Add Me</Button>
        </Stack>
        <Stack>
            <img src={picPreview} onChange={showImg} alt="pic" width={100} />
        </Stack>
    </Stack >
    )
}


export default ProductAdd