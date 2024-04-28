import React, { useState } from 'react';
import './styles/ShoppingCart.css';
function ShoppingCart({ cartItems, onCheckout, productsInfo, onUpdateCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productIds = Object.keys(cartItems);
  let totalQuantity = 0;
  productIds.forEach(productId => {
    totalQuantity += cartItems[productId];
  });


  const totalPrice = Object.keys(cartItems).reduce((total, productId) => {
  const productPrice = productsInfo[productId]?.price || 0;
      return total + (cartItems[productId] * productPrice);
  }, 0);
  

  const handleIncrease = (productId) => {
    onUpdateCart(productId, 1); 
  };

  const handleDecrease = (productId) => {
    onUpdateCart(productId, -1); 
  };

  return (
    <div className="shopping-cart-container">
      <h2>
        <button onClick={() => setIsCartOpen(!isCartOpen)}>
          {isCartOpen ? 'Close Cart' : `View My Cart (${totalQuantity})`}
        </button>
      </h2>
      {isCartOpen && (
        <>
          {Object.keys(cartItems).length === 0 ? (
            <p className='empty-cart-reminder-message'>Your shopping cart is empty.</p>
          ) : (
            <ul>
              {Object.keys(cartItems).map(productId => (
                <li key={productId} >
                  <img src={productsInfo[productId]?.imageUrl} alt={productsInfo[productId]?.name}/>
                  {productsInfo[productId]?.name} 
                  <button onClick={() => handleDecrease(productId)}>-</button>
                  {cartItems[productId]}
                  <button onClick={() => handleIncrease(productId)}>+</button>
                </li>
              ))}
              <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
              <button className="checkout-button" onClick={onCheckout}>Checkout</button>
            </ul>
          )}
        </>
      )}
    </div>
  );
}
export default ShoppingCart