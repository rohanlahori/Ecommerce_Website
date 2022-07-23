import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from './Produ ct.js'
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const product={
    name:"tshirt",
    price:5000,
    _id:"rohan",
}
const Home = () => {
//   const alert = useAlert();
//   const dispatch = useDispatch();
//   const { loading, error, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     dispatch(getProduct());
//   }, [dispatch, error, alert]);

  return (
    <Fragment>
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
        <div className="container" id="container"></div>
        <Product Product={product}/>
    </Fragment>
  );
};

export default Home;