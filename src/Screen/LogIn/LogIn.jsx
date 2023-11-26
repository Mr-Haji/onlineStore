import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import DashBoard from "../../Screen/DashBoard/DashBoard"
import { AUTH } from '../../Utilities/FireBase/FireBase';
import { Navigate, useNavigate } from 'react-router-dom';


const LogIn = () => {

    const Navigate = useNavigate()
    const [AuthData, setAuthData] = useState({})
    const [Error, setError] = useState(false)

    const signUpNavigate = () => {
        Navigate("/")

    }

    console.log(Error)
    const authDataHandeler = (e) => {
        setAuthData(prev => ({
            ...prev, [e.target.id]: e.target.value
        }))
    }

    // console.log(AuthData);





    const logInHandeler = async () => {
        try {
            const signUp = await
                signInWithEmailAndPassword(AUTH, AuthData.Email, AuthData.Password)
            console.log(signUp.user, "Chal GYa")
            // Navigate("/dashBoard")
            Navigate("/products")

        } catch (error) {
            setError(error.code.slice(5))
            // console.log("===>", error.code)
        }




        //   .then((success) => {
        //     console.log("Chal gya babuu",  success.user)

        //   }).catch((err => {
        //     console.log(err)
        //   }))
        // 
    }




    return (

        <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"} >
            <Stack>
                {Error && <div>
                    {Error}
                </div>}
            </Stack>
            <Stack>
                <div>
                    Log In
                </div>
            </Stack>
            <Stack gap={2} sx={{
                border: "1px solid Black",
                padding: "25px",
                borderRadius: "20px",
                boxShadow: "0 0 10px Grey"
            }} >
                <Stack>
                    <TextField onChange={authDataHandeler}
                        id="Email"
                        label="user@gmail.com"
                        placeholder="user@gmail.com"
                        multiline
                    /></Stack>

                <Stack>
                    <TextField onChange={authDataHandeler}
                        id="Password"
                        label="Password"
                        placeholder="Password"
                        multiline
                    /></Stack>

                <Stack>
                    <Button onClick={logInHandeler} variant="contained">Log In</Button>
                </Stack>
                <Stack>
                    <Button onClick={signUpNavigate} >Sign Up</Button>
                </Stack>

            </Stack>
        </Stack>
    )
}
export default LogIn;