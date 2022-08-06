import React from 'react'
import ReactStars from 'react-rating-stars-component'
import reactStars from 'react-rating-stars-component'
const ReviewCard = ({review }) => {
    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600 ? 20 :25,
        value:review.rating,
        isHalf:true,
      }
  return (
    <div className='ReviewCard'>
        <img height="100%" width="50%" src="https://static7.depositphotos.com/1037473/741/i/600/depositphotos_7417129-stock-photo-badminton.jpg"></img>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.Comment}</span>
    </div>
  )
}

export default ReviewCard