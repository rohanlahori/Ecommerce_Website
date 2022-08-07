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
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}


const Products = ({match}) => 
{
    const [price, setPrice] = useState([0,2000]);
    const handleChange = (price, newPrice) => {
    setPrice(newPrice);
};
const categories=[
    "Laptop",
    "Phone",
    "Racket",
    "Shuttle",
    "Shoes",
    "Socks"
];
const dispatch=useDispatch();
const [currentPage,setCurrentPage]=useState(1);  
const [category,setCategory]=useState("")
console.log(currentPage)
const {loading,error,products,productsCount,resultsPerPage}= 
useSelector((state)=>state.products
);
const keyword=useParams().keyword;
const setCurrentPageNo=(e)=>{
setCurrentPage(e);
};

  useEffect(()=>{
      dispatch(getProduct(keyword,currentPage,price,category));
  },[dispatch,keyword,currentPage,price,category]);



  return (
    <Fragment>
    {loading ? (
        <Loader/>
    ):
    (
            <Fragment>
                
            <h2 className="homeHeading">All Products</h2>
            <div className="products" id="container">  
            {
                products && products.map((product)=>(
                    <ProductCard key={product._id} product={product} />
                ))
            }

            </div>
            
            <div className="filterBox">
                <h3>Filter On Price</h3><br></br>
                <Box sx={{ width: "80%" }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={10000}
                    step={10}
                />
                </Box>
                <h3>Categories</h3>
                <ul className="categoryBox">
                    {categories.map((category)=>(
                        <li
                        className="category-link"
                        key={category}
                        onClick={()=>setCategory(category)}
                        >
                        {category}
                        </li>
                        
                    ))}
                </ul>
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