import Carousel from "react-material-ui-carousel"
import './ProductDetails.css'
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({req}) => 
{
  const dispatch=useDispatch();
  let id=useParams().id;
  const {product,loading,error}= 
    useSelector((state)=>state.productdetails
  );
  useEffect(()=>{
      dispatch(getProductDetails(id));
  },[dispatch,id]);
  const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600 ? 20 :25,
    value:product.ratings,
    isHalf:true,
  }
  return (
    <Fragment>
    {loading ?(
      <Loader/>
    ):
    (
      <Fragment>
        <div className='ProductDetails'>
          <div>
            <Carousel>
              {
                product.images && product.images.map((item,i)=>(
                  <img 
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                  />
                ))
              }
            </Carousel>
          </div>
          <div>
           <div className="detailsblock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
            </div> 
            <div className="detailsblock-2">
              <ReactStars {...options}></ReactStars>
              <span>({product.numOfReviews} Reviews)</span>
            </div> 
            <div className="detailsblock-3">
              <h1>{`Rs ${product.price}`}</h1>
              <div className="detailsblock-3-1">
              <div className="detailsblock-3-1-1">
                <button>-</button>
                <input value="1" type="number"/>
                <button>+</button>
              </div>{" "}
              <button>Add to Cart</button>
              </div>
              <p>
                Status:{" "}
                <b className={product.Stock <1 ? "redColor" : "greenColor"}>
                  {product.stock<1 ? "Out of Stock" : "In stock"}
                </b>
              </p>
            </div>
          </div>
         <div className="detailsBlock-4">
          Description : <p>{product.description}</p>
          </div> 
          <button className="submitReview">Submit Review</button>
        </div>
      </Fragment>
    )}
    </Fragment>
  );
}

export default ProductDetails;