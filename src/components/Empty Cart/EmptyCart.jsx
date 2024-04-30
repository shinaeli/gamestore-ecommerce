import React from 'react'
import './EmptyCart.css'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="container">
        <h1 className='raleway-bold empty-cart-header'>Your Cart Is Empty.</h1>
        <div className="empty-cart-image">
            <img src="/Images/empty-cart.jpg" alt="empty cart cartoon photo" />
        </div>
        <Link className="raleway-semibold back-home" to="/">Go To Home</Link>
    </div>
  )
}

export default EmptyCart