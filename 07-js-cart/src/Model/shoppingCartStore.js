const pageRender = {
  productList: 'shoppingList',  
  cartPage: 'shoppingCart',  
};
const shoppingContainer = {
  products: [
    { name: 'Amit', 
      img: 'http://placekitten.com/100/100?image=1',
      price: 0.99
    },
    { name: 'Bao',
      img: 'http://placekitten.com/100/100?image=2',
      price: 3.14
    },
    { name: 'Mango',
      img: 'http://placekitten.com/100/100?image=3',
      price: 2.73
    }
  ],
  shoppingCart: {
    items:[],
    totalPrice: 0,
    totalQuantity: 0,
  },

  page: pageRender.productList
  };
  
const cartControl={
  addProductToShoppingCart(productIndex) {
    const product = shoppingContainer.products[productIndex]; 
    let alreadyInCart = false;
  
    for (const item of shoppingContainer.shoppingCart.items) {
      if (item.name === product.name) {
        alreadyInCart = true;
        item.quantity++;
        shoppingContainer.shoppingCart.totalPrice += product.price; 
        shoppingContainer.shoppingCart.totalQuantity += 1
        break;
      }
    }
  
    if (!alreadyInCart) {
      shoppingContainer.shoppingCart.items.push({
        name: product.name,
        quantity: 1,
        price: product.price,
        img: product.img
      });
      shoppingContainer.shoppingCart.totalPrice += product.price;
      shoppingContainer.shoppingCart.totalQuantity += 1;
    }
  },
  
  reduceAmountFromShoppingCart(productIndex) {
    const item = shoppingContainer.shoppingCart.items[productIndex];
    if (item.quantity > 1) {
        item.quantity--;
        shoppingContainer.shoppingCart.totalPrice -= item.price;
        shoppingContainer.shoppingCart.totalQuantity -= 1;
    } 
    else if (item.quantity === 1) {
        shoppingContainer.shoppingCart.totalPrice -= item.price; 
        shoppingContainer.shoppingCart.totalQuantity -= 1; 
        shoppingContainer.shoppingCart.items.splice(productIndex, 1); 
    }
},


  increaseAmountFromShoppingCart(productIndex) {
    const item = shoppingContainer.shoppingCart.items[productIndex];
    item.quantity++;
    shoppingContainer.shoppingCart.totalPrice += item.price;
    shoppingContainer.shoppingCart.totalQuantity+= 1;
  },

  removeWholeItemFromShoppingCart(productIndex){
    if (productIndex >= 0 && productIndex < shoppingContainer.shoppingCart.items.length) { 
      const item = shoppingContainer.shoppingCart.items[productIndex]; 
      shoppingContainer.shoppingCart.totalPrice -= item.price * item.quantity; 
      shoppingContainer.shoppingCart.totalQuantity -= item.quantity; 
      shoppingContainer.shoppingCart.items.splice(productIndex, 1); 
  } 
  },

  checkOut() {
    shoppingContainer.shoppingCart.items = [];
    shoppingContainer.shoppingCart.totalPrice = 0;
    shoppingContainer.shoppingCart.totalQuantity = 0;
    shoppingContainer.page =pageRender.productList;
  }
  
};  
  
export default shoppingContainer;
export { pageRender, cartControl };