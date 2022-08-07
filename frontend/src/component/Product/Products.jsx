import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import ProductCard from '../Home/ProductCard.js'
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination"
import { useState } from "react";
import './Products.css'
// import ProductCard from './ProductCard'

 
const Products = () => {
  const dispatch=useDispatch();
//   const keyword=match.params.keyword
  const [currentPage,setCurrentPage]=useState(1);
  
  const {loading,error,products,productsCount,resultsPerPage}= 
  useSelector((state)=>state.products
  );


  const setCurrentPageNo=(e)=>{
    setCurrentPage(e);
  };
//   const setCurrentPageNo=setCurrentPageNo=(e)=>{
//     setCurrentPage(e)
//   }

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
            <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo} 
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                
                />
            </div>

        </Fragment>  
    )
    }
        </Fragment>  
  );
}
export default Products