import './App.css';
import AppRouter from "./Utilities/App Router/AppRouter"
import LogIn from '../src/Screen/LogIn/LogIn';
import SignUp from '../src/Screen/SignUp/SignUp';
import AllProducts from './Screen/ProductData/AllProducts';
import { Stack } from '@mui/material';
function App() {
  return (<Stack bgcolor={"orange"} >
    <AppRouter />
  </Stack>
  );
}

export default App;
