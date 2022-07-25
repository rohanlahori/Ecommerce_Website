import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from './Product.js'
import MetaData from "../layout/MetaData";
// import ProductCard from "./ProductCard.js";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const product={
    name:"Racket",
    images: [{url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MibONNsvce82gFxePW7awRMJHsxZ5cWE4g&usqp=CAU'}],
    price: 'Rs:5000',
    _id:"rohan",
}
const Home = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProduct());
    },[dispatch])
  return (
    <Fragment>
        <MetaData title="Badminton Store"/>
        <div className="banner">
            <p>Welcome to Eccommerce</p>
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