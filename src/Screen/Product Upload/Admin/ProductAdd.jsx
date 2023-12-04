import React, { useEffect, useState } from 'react'
import { AUTH, DATABASE, STORAGE } from '../../../Utilities/FireBase/FireBase'
import { Button, Stack, TextField } from '@mui/material'
import { push, ref, set, } from "firebase/database"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Await, useNavigate, } from "react-router-dom";


const ProductAdd = () => {
    const [inputData, setinputData] = useState({});
    const [isUser, setIsUser] = useState(false);
    const [Img, setImg] = useState();
    const [picPreview, setpicPreview] = useState(false);
    const Navigate = useNavigate();
    // User Check
    const checkUser = () => {
        onAuthStateChanged(AUTH, (user) => {
            if (user) {

                setIsUser(user.uid)
            } else {
                Navigate("/")
            }

        })
    }
    console.log(isUser)
    useEffect(() => { checkUser() }, [])
    if (isUser) {

        // all input data get
        const inputDataHandeler = e => setinputData(prev => ({ ...prev, [e.target.id]: e.target.value }))
        const snedDatahandeler = () => {
            const productAddData = {
                customerUid: isUser,
                productTitle: inputData.productTitle,
                productCategory: inputData.productCategory,
                productPrice: inputData.productPrice,
                productDescription: inputData.productDescription,
            }
            //key for product Id
            const keyRef = ref(DATABASE)
            const key = push(keyRef).key;
            productAddData.productId = key;
            // Image Send to local storage
            const sendImageRef = storageRef(STORAGE, `Images/${key}`)
            uploadBytes(sendImageRef, Img).then((success) => {
                //get Link  from local Storage
                getDownloadURL(success.ref).then(function (imageURL) {
                    productAddData.productImage = imageURL;
                    console.log(productAddData)
                    const reffer = ref(DATABASE, `Products/` + productAddData.productId)
                    set(reffer, productAddData)
                }).catch(function (error) {
                    console.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })


            // get image from input 



        }
        const showImg = (e) => {
            setImg(e.target.files[0]);
            const localImgURL = URL.createObjectURL(e.target.files[0]);
            e && setpicPreview(localImgURL)
        }
        // const signOut = () => {
        //     return Navigate("/")
        // }

        return (<Stack height={"100vh"} justifyContent={"center"} alignItems={"center"} >
            <Stack sx={{
                gap: "10px",
                bgcolor: "white",
                minHeight: "350px",
                minWidth: "250px",
                border: "1px solid Black",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 0 10px Grey"
            }}>


                <Stack>
                    <Button onClick={()=>signOut(AUTH)} >Sign out</Button>
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
                    <Button variant="contained" onClick={snedDatahandeler}>Add Me</Button>
                </Stack>
                <Stack alignItems={"center"}>
                    {picPreview ? <img src={picPreview} onChange={showImg} alt="pic" width={100} /> : <div></div>}
                </Stack>
            </Stack>
        </Stack >
        )
    }
    else {
        Navigate("/logIn")
    }
}
export default ProductAdd;
