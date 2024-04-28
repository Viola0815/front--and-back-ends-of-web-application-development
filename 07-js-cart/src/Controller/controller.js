import shoppingContainer, { pageRender, cartControl} from '../Model/shoppingCartStore.js';
import render from '../View/webPage.js';

function controlClickEvents(rootElements) {
    rootElements.addEventListener('click', (e) => {
     
        const index = e.target.dataset.index;
        if (e.target.classList.contains('add-to-cart')) {
            cartControl.addProductToShoppingCart(index);
        } else if (e.target.classList.contains('decrease')) {
            cartControl.reduceAmountFromShoppingCart(index);
        } else if (e.target.classList.contains('increase')) {
            cartControl. increaseAmountFromShoppingCart(index);
        } else if(e.target.classList.contains('delete-item')){
            cartControl.removeWholeItemFromShoppingCart(index);
        } else if (e.target.classList.contains('view-cart')) {
            shoppingContainer.page = pageRender.cartPage;
        } else if (e.target.classList.contains('hide-cart')) {
            shoppingContainer.page = pageRender.productList;
        } else if (e.target.classList.contains('checkout')) {
            cartControl.checkOut();
        }

        render(shoppingContainer, rootElements);
    });
}


const shoppingAppContainer = document.querySelector('#shopping-system');
function firstRender() {
    render(shoppingContainer, shoppingAppContainer); 
    controlClickEvents(shoppingAppContainer); 
}

firstRender();