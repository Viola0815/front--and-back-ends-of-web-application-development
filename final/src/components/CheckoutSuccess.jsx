import React from 'react';
import './styles/CheckoutSuccess.css'; 
function CheckoutSuccess({onContinueShopping, onLogout}) {
  return (
    <div className="checkout-success">
      <h2>Congratulations, checkout success!</h2>
      <button onClick={onContinueShopping}>Continue Shopping</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default CheckoutSuccess;
