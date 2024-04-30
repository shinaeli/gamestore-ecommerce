import React, { useState, useContext } from 'react'
import './PaymentPage.css';
import { TotalCostContext } from '../../contexts/TotalCostContext'
import { PaystackButton } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';


const PaymentPage = () => {
  // 'details' and 'setDetails' are used to control and keep tracks of the data supplied into each input field 
  const [details, setDetails] = useState({});
  // Extract 'totalCost' value from 'TotalCostContext'
  const { totalCost } = useContext(TotalCostContext);
  const navigate = useNavigate();

  const config = {
    reference: (new Date()).getTime().toString(),
    email: details.email,
    amount: Number(totalCost) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const componentProps = {
    ...config,
    text: "Pay Now".toUpperCase(),
    onSuccess: () => {
      // 'sendDetails' sends the user's data to the server once payment has been made successfully
      sendDetails();
      alert("Thanks for doing business with us! Come back soon!!");
      // User is automatically redirected back to the homepage
      navigate('/');
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  async function sendDetails() {
    // User's data is given an 'id' and stored in a new object called 'detail'
    const detail = {"id": (Math.random() * 4000).toFixed(), ...details};
    try {
      const response = await fetch('https://gamestore-backend-6lan.onrender.com/customersDetails', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });
      if(!response.ok) {
        throw new Error(`${response.status} Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  const handlePayment = e => {
    e.preventDefault();
    // All input fields are emptied-out after every successful submission
    setDetails({...details, fullName: "", phone: "", email: "", address: "", cardNumber: "", expiry: "", cvv: ""});
  };
  
  return (
    <div className="container">
    <h1 className="raleway-bold form-header">MAKE PAYMENT</h1>
    <form className="payment">
        <div className="full-name">
            <label className="raleway-semibold">Full Name:</label>
            <input className="raleway-medium" type="text" value={details["fullName"]} onChange={e => setDetails({...details, fullName: e.target.value})} name="full-name" id="full-name" placeholder="e.g. Jane Appleseed" required />
        </div>
        <div className="phone">
            <label className="raleway-semibold">Phone:</label>
            <input className="raleway-medium" type="text" value={details["phone"]} onChange={e => setDetails({...details, phone: e.target.value})} name="phone" id="phone" placeholder="e.g. 08064192280" required />
        </div>
        <div className="email">
            <label className="raleway-semibold">Email:</label>
            <input className="raleway-medium" type="email" value={details["email"]} onChange={e => setDetails({...details, email: e.target.value})} name="email" id="email" placeholder="e.g. jane_appleseed@gmail.com" required />
        </div>
        <div className="address">
            <label className="raleway-semibold">Address:</label>
            <textarea name="address" id="address" value={details["address"]} onChange={e => setDetails({...details, address: e.target.value})} cols="30" rows="10" required></textarea>
        </div>
        <div className="card-number">
            <label className="raleway-semibold">Card Number:</label>
            <input className="raleway-medium" type="text" value={details["cardNumber"]} onChange={e => setDetails({...details, cardNumber: e.target.value})} name="card-number" id="card-number" placeholder="1245-8904-6641-0038" required />
        </div>
        <div className="cvv-expiry">
          <div className="expiry">
            <label className="raleway-semibold">Expiry Date:</label>
            <input type="text" value={details["expiry"]} onChange={e => setDetails({...details, expiry: e.target.value})} name="expiry" id="expiry" placeholder="06/21" required/>
          </div>
          <div className="cvv">
            <label className="raleway-semibold">CVV:</label>
            <input type="text" value={details["cvv"]} onChange={e => setDetails({...details, cvv: e.target.value})} name="cvv" id="cvv" placeholder="333" required/>
          </div>
        </div>
        <div className="amount">
            <label className="raleway-semibold">Amount(8% Discount's Applied):</label>
            <input className="raleway-medium" type="text" value={Math.ceil(totalCost - (0.08 * totalCost) + 5000)} onChange={() => setDetails({...details, amount: totalCost})} name="amount" id="amount" />
        </div>
    </form>
    <PaystackButton type="submit" onClick={handlePayment} className="paystack-button" {...componentProps} />
    <Footer />
</div>
  )
}

export default PaymentPage