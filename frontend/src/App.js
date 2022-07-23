import './App.css';
import Header from './component/layout/Header/Header.jsx'
import {BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer'
// import Home from './component/Home/Home.js'

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto"],
      },
    });
  },[]);
  return (
     <Router> 
      <Header/>
      {/* <Router extract path="/" component={Home}/> */}
      <Footer/>
    </Router>
  );
}

export default App;
