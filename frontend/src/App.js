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

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto"],
      },
    });
  },[]);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loader" element={<Loader />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
