// import state, { PAGES,cartControl } from './state';
// import render from './render';

// const rootEl = document.querySelector('#shopping-system');


// function addToCart (rootEl) {
//   rootEl.addEventListener('click', (e) => {
//     const index = e.target.dataset.index;
//     if (e.target.classList.contains('add-to-cart')) {
//       cartControl.addProduct(index);
//     }

//     render(state, rootEl);
//   })
// }



// function changeQuantity (rootEl) {
//   rootEl.addEventListener('click', (e) => {
//     const index = e.target.dataset.index;
//     if (e.target.classList.contains('decrease')) {
//       cartControl.decreaseQuantity(index);
//     }

//     if (e.target.classList.contains('increase')) {
//       cartControl.increaseQuantity(index);
//     }

//     render(state, rootEl);
//   })
// }



// function changePage (rootEl) {
//   rootEl.addEventListener('click', (e) => {
//     if (e.target.classList.contains('view-cart')) {
//       state.page = PAGES.CART;
//     }

//     if (e.target.classList.contains('hide-cart')) {
//       state.page = PAGES.PRODUCTS;
//     }

//     render(state, rootEl);
//   });
// }


// function checkout (rootEl) {
//   rootEl.addEventListener('click', (e) => {
//     if (e.target.classList.contains('checkout')) {
//       cartControl.clearCart();
//     }
//     render(state, rootEl);
//   });
// }


// render(state, rootEl);
// addToCart(rootEl);
// changeQuantity(rootEl);
// changePage(rootEl);
// checkout(rootEl);