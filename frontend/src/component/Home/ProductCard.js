import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import Header from "../layout/Header/Header"

const ProductCard = ({product}) => {
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size: window.innerWidth <600 ? 15 :20,
        
    }
  return (
    <div>
    <Link className='productCard' to={`product/${product._id}`} >
        
        <img src={product.images[0].url} alt={product.name}></img>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span> ({product.numberofReviews}) </span>
        </div>
        <span>{`₹ ${product.price}`}</span>
    </Link>
    </div>
    )
}

export default ProductCard