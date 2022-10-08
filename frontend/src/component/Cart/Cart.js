import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'

const Cart = () => {

  const item={
    product:"productID",
    price:2000,
    name:"Racket"
  }
  return (
    <Fragment>
      <div className='cartPage'>
        <div className='cartHeader'>
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className='cartContainer'>
          <CartItemCard item={item}></CartItemCard>
        </div>
      </div>
    </Fragment>
  )
}

export default Cart