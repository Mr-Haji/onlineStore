import * as React from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from '../../Utilities/FireBase/FireBase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';


const SignUp = () => {
  const Navigate = useNavigate()
  const logInNavigate = () => {
    Navigate("/logIn")

  }
  //   const Navigate = useNavigate()
  const [AuthData, setAuthData] = useState({})
  const [Error, setError] = useState(false)

  console.log(Error)
  const authDataHandeler = (e) => {
    setAuthData(prev => ({
      ...prev, [e.target.id]: e.target.value
    }))
  }

  // console.log(AuthData);





  const signUpBtnHandeler = async () => {
    try {
      const signUp = await
        createUserWithEmailAndPassword(AUTH, AuthData.Email, AuthData.Password)
      console.log(signUp.user, "Chal GYa")
      Navigate("/products")

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
      <Stack>
        {Error && <div>
          {Error}
        </div>}
      </Stack>
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
          <Button onClick={signUpBtnHandeler} variant="contained">Sign Up</Button>
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
    </Stack>
  )
}

export default SignUp;
