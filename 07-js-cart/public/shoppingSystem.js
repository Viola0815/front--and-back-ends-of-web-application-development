/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Model/shoppingCartStore.js":
/*!****************************************!*\
  !*** ./src/Model/shoppingCartStore.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cartControl: () => (/* binding */ cartControl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   pageRender: () => (/* binding */ pageRender)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var pageRender = {
  productList: 'shoppingList',
  cartPage: 'shoppingCart'
};
var shoppingContainer = {
  products: [{
    name: 'Amit',
    img: 'http://placekitten.com/100/100?image=1',
    price: 0.99
  }, {
    name: 'Bao',
    img: 'http://placekitten.com/100/100?image=2',
    price: 3.14
  }, {
    name: 'Mango',
    img: 'http://placekitten.com/100/100?image=3',
    price: 2.73
  }],
  shoppingCart: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0
  },
  page: pageRender.productList
};
var cartControl = {
  addProductToShoppingCart: function addProductToShoppingCart(productIndex) {
    var product = shoppingContainer.products[productIndex];
    var alreadyInCart = false;
    var _iterator = _createForOfIteratorHelper(shoppingContainer.shoppingCart.items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (item.name === product.name) {
          alreadyInCart = true;
          item.quantity++;
          shoppingContainer.shoppingCart.totalPrice += product.price;
          shoppingContainer.shoppingCart.totalQuantity += 1;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
  reduceAmountFromShoppingCart: function reduceAmountFromShoppingCart(productIndex) {
    var item = shoppingContainer.shoppingCart.items[productIndex];
    if (item.quantity > 1) {
      item.quantity--;
      shoppingContainer.shoppingCart.totalPrice -= item.price;
      shoppingContainer.shoppingCart.totalQuantity -= 1;
    } else if (item.quantity === 1) {
      shoppingContainer.shoppingCart.totalPrice -= item.price;
      shoppingContainer.shoppingCart.totalQuantity -= 1;
      shoppingContainer.shoppingCart.items.splice(productIndex, 1);
    }
  },
  increaseAmountFromShoppingCart: function increaseAmountFromShoppingCart(productIndex) {
    var item = shoppingContainer.shoppingCart.items[productIndex];
    item.quantity++;
    shoppingContainer.shoppingCart.totalPrice += item.price;
    shoppingContainer.shoppingCart.totalQuantity += 1;
  },
  removeWholeItemFromShoppingCart: function removeWholeItemFromShoppingCart(productIndex) {
    if (productIndex >= 0 && productIndex < shoppingContainer.shoppingCart.items.length) {
      var item = shoppingContainer.shoppingCart.items[productIndex];
      shoppingContainer.shoppingCart.totalPrice -= item.price * item.quantity;
      shoppingContainer.shoppingCart.totalQuantity -= item.quantity;
      shoppingContainer.shoppingCart.items.splice(productIndex, 1);
    }
  },
  checkOut: function checkOut() {
    shoppingContainer.shoppingCart.items = [];
    shoppingContainer.shoppingCart.totalPrice = 0;
    shoppingContainer.shoppingCart.totalQuantity = 0;
    shoppingContainer.page = pageRender.productList;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shoppingContainer);


/***/ }),

/***/ "./src/View/webPage.js":
/*!*****************************!*\
  !*** ./src/View/webPage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/shoppingCartStore.js */ "./src/Model/shoppingCartStore.js");

function render(shoppingState, rootElement) {
  rootElement.innerHTML = _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__["default"].page === _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.pageRender.productList ? showProductsListing(shoppingState) : showProductsListingAndShoppingCart(shoppingState);
}
function showProductsListing(shoppingState) {
  var productsListingHtml = '';
  for (var index = 0; index < shoppingState.products.length; index++) {
    var product = shoppingState.products[index];
    var productHtml = "\n        <li class=\"product\" data-index=\"".concat(index, "\">\n            <img src=\"").concat(product.img, "\" alt=\"").concat(product.name, "\"/>\n            <div class=\"product-name-and-price\">\n                <span>Name:").concat(product.name, "</span>\n                <span>Price:").concat(product.price.toFixed(2), "</span>\n            </div>\n            <button class=\"add-to-cart\" data-index=\"").concat(index, "\">Add to Cart</button>\n        </li>\n    ");
    productsListingHtml += productHtml;
  }
  var viewCartButton = shoppingState.page === _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.pageRender.productList ? "<button class=\"view-cart\">View cart</button>" : "";
  var viewOfTotalQuantity = shoppingState.page === _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.pageRender.productList ? "<span class=\"total-quantity\">".concat(shoppingState.shoppingCart.totalQuantity, "</span>") : "";
  return "\n    <div class=\"cats-lists\">\n      <h1>&#128568 Meow Meow Sale Listing &#128071</h1> \n    </div> \n    <ul class=\"products-Listing\">".concat(productsListingHtml, "</ul>\n    <div class=\"view-cart-container\">\n      ").concat(viewCartButton, "\n      ").concat(viewOfTotalQuantity, "\n    </div>\n\n  ");
}
function showShoppingCartItem(item, index) {
  var totalPrice = (item.price * item.quantity).toFixed(2);
  return "\n    <li class=\"cart-item\">\n      <div class=\"cat-info\">\n        <img src=\"".concat(item.img, "\" alt=\"").concat(item.name, "\"/>    \n      </div>\n      <div class=\"products-name-and-total-price\">\n          <span>Name:").concat(item.name, "</span>\n          <span class=\"total-price\">Price:").concat(totalPrice, "</span> \n          <span>Quantity:").concat(item.quantity, "</span>\n      </div> \n        <div class=\"action-button-for-decrease-and-increase\">\n          <button data-index=\"").concat(index, "\" class=\"decrease\">-</button>        \n          <span>").concat(item.quantity, "</span> \n          <button data-index=\"").concat(index, "\" class=\"increase\">+</button>            \n        </div>\n          <div class=\"action-button-for-delete-item\">\n            <button data-index=\"").concat(index, "\" class=\"delete-item\">delete</button>  \n          </div>  \n    </li>\n  ");
}
function showProductsListingAndShoppingCart(shoppingState) {
  var productsListingHtml = showProductsListing(shoppingState);
  var cartContentHtml = '';
  if (shoppingState.shoppingCart.items.length === 0) {
    cartContentHtml = "\n      <p class=\"empty-cart-message\">Nothing in the cart</p>\n      <div class=\"action-button-for-hide-cart\">\n        <button class=\"hide-cart\">Hide Cart</button>\n      </div>\n      ";
  } else {
    var cartItemsHtml = '';
    for (var index = 0; index < shoppingState.shoppingCart.items.length; index++) {
      var cartItemIndex = shoppingState.shoppingCart.items[index];
      cartItemsHtml += showShoppingCartItem(cartItemIndex, index);
    }
    var totalCost = shoppingState.shoppingCart.totalPrice.toFixed(2);
    cartContentHtml = "\n        <ul class=\"carts\">".concat(cartItemsHtml, "</ul>\n        <div class=\"total-cost\">Total Cost: ").concat(totalCost, "</div>\n        <div class=\"action-buttons-for-checkout-and-hide-cart\">\n            <button class=\"checkout\">Checkout</button>\n            <button class=\"hide-cart\">Hide Cart</button>\n        </div>\n    ");
  }
  return "\n      ".concat(productsListingHtml, " \n      <div class=\"cart-container\">\n          <div class=\"center-container\">\n              <h1>Shopping Cart &#128071</h1>  \n          </div>\n          ").concat(cartContentHtml, " \n      </div>\n  ");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/Controller/controller.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/shoppingCartStore.js */ "./src/Model/shoppingCartStore.js");
/* harmony import */ var _View_webPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/webPage.js */ "./src/View/webPage.js");


function controlClickEvents(rootElements) {
  rootElements.addEventListener('click', function (e) {
    var index = e.target.dataset.index;
    if (e.target.classList.contains('add-to-cart')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.cartControl.addProductToShoppingCart(index);
    } else if (e.target.classList.contains('decrease')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.cartControl.reduceAmountFromShoppingCart(index);
    } else if (e.target.classList.contains('increase')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.cartControl.increaseAmountFromShoppingCart(index);
    } else if (e.target.classList.contains('delete-item')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.cartControl.removeWholeItemFromShoppingCart(index);
    } else if (e.target.classList.contains('view-cart')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__["default"].page = _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.pageRender.cartPage;
    } else if (e.target.classList.contains('hide-cart')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__["default"].page = _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.pageRender.productList;
    } else if (e.target.classList.contains('checkout')) {
      _Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__.cartControl.checkOut();
    }
    (0,_View_webPage_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__["default"], rootElements);
  });
}
var shoppingAppContainer = document.querySelector('#shopping-system');
function firstRender() {
  (0,_View_webPage_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Model_shoppingCartStore_js__WEBPACK_IMPORTED_MODULE_0__["default"], shoppingAppContainer);
  controlClickEvents(shoppingAppContainer);
}
firstRender();
})();

/******/ })()
;
//# sourceMappingURL=shoppingSystem.js.map