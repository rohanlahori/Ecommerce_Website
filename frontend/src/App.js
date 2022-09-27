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
import Navigate from "./component/Header/navigation_bar"
import store from "./store"
import { loadUser } from './actions/userAction';

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto"],
      },
    });
    // store.dispatch(loadUser())
  },[]);
 
  return (
    <BrowserRouter>
        <Navigate/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/navigationbar" element={<Navigate/>} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/login" element={<LoginSignUp/>}></Route>
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
