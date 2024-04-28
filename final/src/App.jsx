import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Message from './components/Message';
import ActiveShopper from './components/ActiveShopper';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutSuccess from './components/CheckoutSuccess';
import ChatBox from './components/ChatBox';  
import Loading from './components/Loading';
import { fetchCart, fetchProducts } from './services';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [currentPage, setCurrentPage] = useState('shop');
  const [productsInfo, setProductsInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart().then(response => {
        setCartItems(response.cart || {});
      })
      .catch(err => {
        setError(error);
      });
     
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProducts().then(products => {
      const productsInfoObj = products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
      setProductsInfo(productsInfoObj);
    })
    .catch(err => {
      setError(error);
    });
  }, []); 

  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
    setIsLoading(true);
    setTimeout(() => {
      setUsername(username);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000); 
  }

  function onMessageReceived(message) {
    setMessages(message);
  }

  function onLogout() {
    setUsername('');
    setIsLoggedIn(false);
    setCurrentPage('shop');
  }

  function handleAddToCart(productId, quantity) {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  }

  function handleUpdateCart(productId, change) {
    setCartItems(prev => {
      const newQuantity = (prev[productId] || 0) + change;
      if (newQuantity <= 0) {
        const {[productId]: _, ...rest} = prev;
        return rest;
      } else {
        return { ...prev, [productId]: newQuantity };
      }
    });
  }

  function handleCheckoutSuccess() {
    setCartItems({});
    setCurrentPage('checkoutSuccess');
  }

  function displayContent() {
    if (isLoading) {
      return <Loading />; 
    }
    switch (currentPage) {
      case 'shop':
        return (
          <>
            <ActiveShopper username={username} onLogout={onLogout} />
            <ProductList onAddToCart={handleAddToCart} />
            <ShoppingCart cartItems={cartItems} onCheckout={handleCheckoutSuccess} productsInfo={productsInfo} onUpdateCart={handleUpdateCart} />
            <button onClick={() => setCurrentPage('faq')}>Common Questions You May Have</button>
            <Message messages={messages} />
          </>
        );
      case 'faq':
        return <ChatBox onClose={() => setCurrentPage('shop')} />;
      case 'checkoutSuccess':
        return <CheckoutSuccess onContinueShopping={() => setCurrentPage('shop')} onLogout={onLogout} />;
      default:
        return <div>Page not found</div>;
    }
  }

  return (
    <div className="app-container">
      <Header />
      {isLoggedIn ? displayContent() : (
        <>
          <Login onLogin={onLogin} updateMessage={onMessageReceived} />
          <Message messages={messages} />
        </>
      )}
    </div>
  );
}

export default App;
