import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from './Product.js'
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
const product={
    name:"Racket",
    images: [{url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MibONNsvce82gFxePW7awRMJHsxZ5cWE4g&usqp=CAU'}],
    price: 'Rs:5000',
    _id:"rohan",
}

// console.log(getProduct)
const Home = () => {
    
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProduct());
    },[dispatch])

  return (
    <Fragment>
        <MetaData title="Badminton Store"/>
        <div className="banner">
            <p>Welcome to E-commerce</p>
            <h1>Find Amazing Products below</h1>
            <a href="#container">
               <button>
                Scroll<FaMouse/>
                </button> 
            </a>
        </div>
        <h2 className="homeHeading">Featured Product</h2>
        <div className="container" id="container">
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>
    </Fragment>
  );
};

export default Home;