import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services';
import './styles/ProductList.css';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts()
      .then(products => {
        setProducts(products)})
      .catch(err => {
        setError(error);
      });
  }, []);

  return (
    <div className="product-list-container">
      <h2>Products Listing</h2>
      {error && <div className="error-message">{error}</div>}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.imageUrl}  className="product-image"  alt={product.name}/>
            <div className="product-details">
              <span>{product.name}</span> &#128176;<span>${product.price}</span>
            </div>
            <button className="add-to-cart-button"onClick={() => onAddToCart(product.id, 1)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
