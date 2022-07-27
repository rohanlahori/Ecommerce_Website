import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size: window.innerWidth <600 ? 15 :20,
    
}

const Product = ({product}) => {
  return (
    <Link className='productCard' to={product._id} >
        <img src={"https://cdn.pixabay.com/photo/2022/06/26/14/36/raspberry-7285625_1280.jpg"} alt={product.name}></img>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span> (256 reviews) </span>
        </div>
        <span>{product.price}</span>
    </Link>
    
    )
}

export default Product  