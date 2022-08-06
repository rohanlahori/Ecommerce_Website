import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import ProductCard from './ProductCard'
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";

const Home = () => {

    const dispatch=useDispatch();
    const {loading,error,products,productsCount}= 
    useSelector((state)=>state.products
    );
    useEffect(()=>{
        dispatch(getProduct());
    },[dispatch]);
  return (
    <Fragment>
    {loading ? (
        <Loader/>
    ):
    (
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
            {
                products && products.map((product,index)=>(
                    <ProductCard product={product}key={index}/>
                ))
            }
            </div>
        </Fragment>  
    )
    }
        </Fragment>  
  );
};
export default Home;