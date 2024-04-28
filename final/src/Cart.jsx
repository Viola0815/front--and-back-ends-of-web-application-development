import React from 'react';

function Cart({ cartItems }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}: {item.quantity} x ${item.price}</span>
        </div>
      ))}
      <h3>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
}

export default Cart;
