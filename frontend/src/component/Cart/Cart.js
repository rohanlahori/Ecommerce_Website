import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import './Cart.css'
import CartItemCard from './CartItemCard'

export const Cart = () => {

  const item={
    product:"productID",
    price:2000,
    name:"Racket"
  }

  const {cart}=useSelector(state=>state.cart.cartItems)
  console.log(cart);
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