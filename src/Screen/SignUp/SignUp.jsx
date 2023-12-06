import * as React from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from '../../Utilities/FireBase/FireBase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Divider, Radio, Typography, RadioGroup } from '@mui/material';


const SignUp = () => {
  const Navigate = useNavigate()
  const logInNavigate = () => {
    Navigate("/logIn")

  }
  //   const Navigate = useNavigate()
  const [AuthData, setAuthData] = useState({})
  const [Error, setError] = useState(false)

  // console.log(Error)
  const authDataHandeler = (e) => {
    setAuthData(prev => ({
      ...prev, [e.target.id]: e.target.value
    }))
  }

  console.log(AuthData);





  const signUpBtnHandeler = async () => {
    try {
      const signUp = await
        createUserWithEmailAndPassword(AUTH, AuthData.Email, AuthData.Password)
      // console.log(signUp.user, "Chal GYa")
      Navigate("/productAdd")

    } catch (error) {
      setError(error.code.slice(5))
      // console.log("===>", error.code)
    }
  }




  return (

    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}
      sx={{
        bgcolor: "orange"
      }} >

      <Stack gap={2} sx={{
        bgcolor: "white",
        minHeight: "350px",
        minWidth: "250px",
        border: "1px solid Black",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 0 10px Grey"
      }} >
        <Stack>
          <Typography variant="h4"
            sx={{
              fontFamily: "serif",
              color: "Black",
              textAlign: "center",
            }}>
            Sign Up
          </Typography>
        </Stack>
        <Stack>
          <TextField onChange={authDataHandeler}
            required
            id="Email"
            label="user@gmail.com"
            placeholder="user@gmail.com"
            multiline
          /></Stack>

        <Stack>
          <TextField onChange={authDataHandeler}
            required
            type='Password'
            id="Password"
            label="Password"
            placeholder="Password"

          /></Stack>



        <Stack>
          <Button onClick={signUpBtnHandeler} variant="contained">Sign Up</Button>
        </Stack>
        <Stack>
          {Error && <Typography variant="h6" color="Red" textAlign="center">
            {Error}
          </Typography>}

        </Stack>
        <Divider sx={{
          padding: "10px",
        }} />
        <Stack        >
          <Typography sx={{
            marginTop: "50px",
            fontSize: "15px",

          }}> Are You Already Have An Account?</Typography>
          <Button onClick={logInNavigate} >Log In</Button>
        </Stack>

      </Stack>

      <Stack >

      </Stack>
    </Stack>
  )
}

export default SignUp;
