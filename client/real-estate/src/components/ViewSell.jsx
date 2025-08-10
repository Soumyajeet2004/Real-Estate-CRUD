import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Styles/Viewsell.css';
const Propertylist = ({properties,fetchproperties,setSeletedproperty}) => {
 const deleteproperty = async(id)=> {
  await axios.delete(`http://localhost:6005/api/properties/${id}`);
  fetchproperties();
 }
 const [amount, setAmount] = useState(100);
    const navigate = useNavigate();

    // Function to handle payment
    const handlePayment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5600/api/payment/create-order', { amount });
            const { orderId, currency } = data;

            const options = {
                key: 'your_razorpay_key_id', // from .env
                amount: amount * 100,
                currency,
                name: "REAL ESTATE CRUD",
                description: "Service Payment",
                order_id: orderId,
                handler: async function (response) {
                    await axios.post('http://localhost:5600/api/payment/save-payment', {   // localhost api URL will be replaced with backend 
                        orderId,
                        paymentId: response.razorpay_payment_id,
                        amount,
                        currency,
                        status: 'success'
                    });
                    alert("Payment Successful!");
                    navigate('/dashboard'); // Redirect to dashboard after payment
                },
                prefill: {
                    name: "User",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error", error);
        }
    };
  return <>
 <div className="container mt-4">
      <h2 className="mb-4">Property List</h2>
      {properties.map((x) => (
    <div className="property-card" key={x._id}>
      <div className="property-left">
        
      </div>
      <div className="property-middle">
        <h5 className="property-title">{x.title}</h5>
        <div className="property-details">
          <p><strong>SUPER AREA:</strong> {x.superarea || '—'} sqft</p>
          <p><strong>TRANSACTION:</strong> {x.transaction || 'Resale'}</p>
          <p><strong>FURNISHING:</strong> {x.furnishing || 'Unfurnished'}</p>
          <p><strong>BATHROOM:</strong> {x.bathroom || '—'}</p>
          <p><strong>OWNER:</strong> {x.owner || '—'}</p>
          <p><strong>CONTACT NO.:</strong> {x.contact || '—'}</p>
        </div>
      </div>
      <div className="property-right">
        <div className="price">₹{x.price/1000} Lac</div>

        <button className='btn btn-dark' onClick={()=>setSeletedproperty(x)}>Edit</button>
        <button className='btn btn-danger' onClick={()=>deleteproperty(x._id)}>Delete</button>
      </div>
    </div>
  ))}
</div>
  <div className="empty-state">
    {properties.length === 0 && <p>No properties available. Please add a property.</p>}   
  </div>
  </>
}

export default Propertylist;