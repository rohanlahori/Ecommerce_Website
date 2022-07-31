import Carousel from "react-material-ui-carousel"
import './ProductDetails.css'
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';

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

  return (
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
          aaaa
        </div>
      </div>
    </Fragment>
  );
}

export default ProductDetails;