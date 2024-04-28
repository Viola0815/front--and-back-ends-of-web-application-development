import shoppingContainer, { pageRender } from '../Model/shoppingCartStore.js';


function render(shoppingState, rootElement) {
  rootElement.innerHTML = shoppingContainer.page === pageRender.productList ? showProductsListing(shoppingState) : showProductsListingAndShoppingCart(shoppingState);
}

function showProductsListing(shoppingState) {
  let productsListingHtml='';
  for (let index = 0; index < shoppingState.products.length; index++) {
    const product = shoppingState.products[index];
    const productHtml = `
        <li class="product" data-index="${index}">
            <img src="${product.img}" alt="${product.name}"/>
            <div class="product-name-and-price">
                <span>Name:${product.name}</span>
                <span>Price:${product.price.toFixed(2)}</span>
            </div>
            <button class="add-to-cart" data-index="${index}">Add to Cart</button>
        </li>
    `;
    productsListingHtml += productHtml;
  }
  const viewCartButton = shoppingState.page === pageRender.productList ? `<button class="view-cart">View cart</button>` : "";
  const viewOfTotalQuantity = shoppingState.page === pageRender.productList ? `<span class="total-quantity">${shoppingState.shoppingCart.totalQuantity}</span>` : "";
  return `
    <div class="cats-lists">
      <h1>&#128568 Meow Meow Sale Listing &#128071</h1> 
    </div> 
    <ul class="products-Listing">${productsListingHtml}</ul>
    <div class="view-cart-container">
      ${viewCartButton}
      ${viewOfTotalQuantity}
    </div>

  `;
}

function showShoppingCartItem(item, index) {
  const totalPrice = (item.price * item.quantity).toFixed(2);
  return `
    <li class="cart-item">
      <div class="cat-info">
        <img src="${item.img}" alt="${item.name}"/>    
      </div>
      <div class="products-name-and-total-price">
          <span>Name:${item.name}</span>
          <span class="total-price">Price:${totalPrice}</span> 
          <span>Quantity:${item.quantity}</span>
      </div> 
        <div class="action-button-for-decrease-and-increase">
          <button data-index="${index}" class="decrease">-</button>        
          <span>${item.quantity}</span> 
          <button data-index="${index}" class="increase">+</button>            
        </div>
          <div class="action-button-for-delete-item">
            <button data-index="${index}" class="delete-item">delete</button>  
          </div>  
    </li>
  `;
}
function showProductsListingAndShoppingCart(shoppingState) {
  const productsListingHtml = showProductsListing(shoppingState);
  let cartContentHtml='';
  if (shoppingState.shoppingCart.items.length === 0) {
      cartContentHtml = `
      <p class="empty-cart-message">Nothing in the cart</p>
      <div class="action-button-for-hide-cart">
        <button class="hide-cart">Hide Cart</button>
      </div>
      `;
  } else {
    let cartItemsHtml='';
    for (let index = 0; index < shoppingState.shoppingCart.items.length; index++) {
        const cartItemIndex =shoppingState.shoppingCart.items[index];
        cartItemsHtml += showShoppingCartItem(cartItemIndex,index);
    } 
    const totalCost = shoppingState.shoppingCart.totalPrice.toFixed(2);
    cartContentHtml = `
        <ul class="carts">${cartItemsHtml}</ul>
        <div class="total-cost">Total Cost: ${totalCost}</div>
        <div class="action-buttons-for-checkout-and-hide-cart">
            <button class="checkout">Checkout</button>
            <button class="hide-cart">Hide Cart</button>
        </div>
    `;
  }
  return `
      ${productsListingHtml} 
      <div class="cart-container">
          <div class="center-container">
              <h1>Shopping Cart &#128071</h1>  
          </div>
          ${cartContentHtml} 
      </div>
  `;
}



export default render;