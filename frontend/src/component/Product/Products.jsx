import React, { Fragment, useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Pagination from "react-js-pagination"
import { useState } from "react";
import './Products.css'
import { useParams } from "react-router-dom";
import ProductCard from '../Home/ProductCard'

 
const Products = ({match}) => 
{
  const dispatch=useDispatch();
  const [currentPage,setCurrentPage]=useState(1);  
  console.log(currentPage)
  const {loading,error,products,productsCount,resultsPerPage}= 
    useSelector((state)=>state.products
  );
  const keyword=useParams().keyword;
  const setCurrentPageNo=(e)=>{
    setCurrentPage(e);
  };

  useEffect(()=>{
      dispatch(getProduct(keyword,currentPage));
  },[dispatch,keyword,currentPage]);



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
                products && products.map((product)=>(
                    <ProductCard key={product._id} product={product} />
                ))
            }
            </div>
            <div className="paginationBox">
                {/* <Pagination
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
                
                /> */}
            </div>

        </Fragment>  
    )
    }
        </Fragment>  
  );
}
export default Products