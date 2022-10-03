import './App.css';
import Header from './component/layout/Header/Header.jsx'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";import WebFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home.js'
import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/Product/ProductDetails.jsx';
import Products from './component/Product/Products.jsx';
import Search from './component/Product/Search.jsx'
import LoginSignUp from './component/User/LoginSignUp';
import Navigate from "./component/Navigation/navigation_bar"
import store from "./store"
import { loadUser, login } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelect } from '@mui/base';
import {useSelector} from "react-redux"


function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto"],
      },
    });
    store.dispatch(loadUser())
  },[]);
  const {isAuthenticated,user}=useSelector(state=>state.user)
  console.log(user);
  return (
    <BrowserRouter>
    {/* <Header/>    */}
        <Navigate/>
        {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/navigationbar" element={<Navigate/>} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/login" element={<LoginSignUp/>}></Route>
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
  );
}

export default App;
