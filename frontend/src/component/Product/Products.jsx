import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import ProductCard from '../Home/ProductCard.js'
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import ProductCard from './ProductCard'

 
const Products = () => {
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
            <h2 className="homeHeading">All Products</h2>
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
}
export default Products