import React, { useContext, useRef } from 'react'
import "./CartCheckout.css"
import { TotalCostContext } from '../../contexts/TotalCostContext'
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../Empty Cart/EmptyCart';
import Footer from '../Footer/Footer';

const CartCheckout = () => {
    // Extrect 'totalCost' variable from 'TotalCostContext'
  const { totalCost } = useContext(TotalCostContext);
    // Extrect 'cartItem' variable from 'CartContext'
  const { cartItem } = useContext(CartContext);
  const navigate = useNavigate();
//   Create a reference for each checkbox
  const emailsRef = useRef(null), futureRef = useRef(null);

  const handleProceed = e => {
    e.preventDefault();
    // Checks if both checkboxes are clicked(checked)
    if((emailsRef.current.checked === true) && (futureRef.current.checked === true)) {
        // If true, the user is taken back to the home page
        navigate('/payment');
    }
  }

  console.log(cartItem);
  return (
    <div className="container">
    {cartItem.length === 0 ? <EmptyCart /> : <table>
        <caption className='raleway-bold'>Your Shopping Cart</caption>
        <thead>
            <tr className='raleway-bold'>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {cartItem.map(item => {
                const { id, product, price, noOfProduct } = item;
                return (
                    <tr className='raleway-medium' key={id}>
                        <td className="left-texted">{product}</td>
                        <td>#{price}</td>
                        <td>{noOfProduct}</td>
                        <td>#{price * noOfProduct}</td>
                    </tr>
                )
            })}
            <tr className="raleway-medium">
                <td className="left-texted" colSpan={3}>Shipping</td>
                <td>#5000</td>
            </tr>
            <tr className="raleway-bold total">
                <td className="left-texted" colSpan={3}>Total</td>
                <td>#{totalCost + 5000}</td>
            </tr>
        </tbody>
    </table>}
        {(totalCost > 0) && (<section className="order-summary">
            <h2 className="raleway-bold">Order Summary</h2>
            <p className="raleway-medium">Subtotal: <span className="raleway-bold">#{totalCost}</span></p>
            <p className="raleway-medium">Shipping: <span className="raleway-bold">#5000</span></p>
            <p className="raleway-medium">Total: <span className="raleway-bold">#{totalCost + 5000}</span></p>
        </section>)}
        {(totalCost > 0) && (<section className="order-confirmation">
            <h2 className='raleway-bold'>Order Confirmation</h2>
            <form>
                <h3 className='raleway-semibold'>By clicking "Place Order", you agree to our Terms & Conditions and Privacy Policy.</h3>
                <div className="flex-terms">
                    <input ref={emailsRef} defaultChecked={false} type="checkbox" name="emails" id="emails" required />
                    <label className='raleway-regular' htmlFor="emails">I want to receive promotional emails.</label>
                </div>
                <div className="flex-terms">
                    <input ref={futureRef} defaultChecked={false} type="checkbox" name="future-payment" id="future-payment" required />
                    <label className='raleway-regular' htmlFor="future-payment">Save my payment information for faster checkout in the future.</label>
                </div>
                <button type="button" className="place-order-btn" onClick={handleProceed}>Place Order</button>
            </form>
        </section>)}
        <Footer />
    </div>
  )
}

export default CartCheckout