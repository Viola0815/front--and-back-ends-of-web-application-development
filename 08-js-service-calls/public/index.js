/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Model/state.js":
/*!****************************!*\
  !*** ./src/Model/state.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearUserData: () => (/* binding */ clearUserData),
/* harmony export */   getUserData: () => (/* binding */ getUserData),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   updateUserData: () => (/* binding */ updateUserData)
/* harmony export */ });
var state = {
  userData: {}
};
function updateUserData(newUserInfo) {
  state.userData = newUserInfo;
}
function clearUserData() {
  state.userData = {};
}
function getUserData() {
  var username, storedWord, error;
  if (state.userData) {
    username = state.userData.username;
    storedWord = state.userData.storedWord;
    error = state.userData.error;
  } else {
    username = '';
    storedWord = '';
    error = '';
  }
  return {
    username: username,
    storedWord: storedWord,
    error: error
  };
}


/***/ }),

/***/ "./src/View/webPage.js":
/*!*****************************!*\
  !*** ./src/View/webPage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _Model_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/state */ "./src/Model/state.js");

function render(rootEl) {
  var _getUserData = (0,_Model_state__WEBPACK_IMPORTED_MODULE_0__.getUserData)(),
    username = _getUserData.username,
    storedWord = _getUserData.storedWord,
    error = _getUserData.error;
  var displayError = error ? "<div class=\"error\">".concat(error, "</div>") : '';
  var displayInfo = storedWord ? storedWord : "<span class='no-word-set'> no word set yet</span>";
  function loginPage() {
    return "\n            <div class=\"header\">\n                <h1>Please Login</h1>  \n            </div>\n            <div class=\"login-site\">\n                <label for=\"username\">Enter Your Username:</label>\n                <input type=\"text\" class=\"username\" id=\"username\" placeholder=\"Type your username here\">\n                <div class=\"error\">".concat(displayError, "</div> \n                <button class=\"login-button\">Login</button>\n            </div>\n        ");
  }
  function userInfoPage(username, displayInfo) {
    return "\n            <div class=\"header\">\n                <h1>Welcome, ".concat(username, "</h1>  \n            </div>\n            <div class=\"all-info\">\n                <div class=\"username-and-word\">\n                    <p>Username: <span>").concat(username, "</span></p>\n                    <p>Word: <span>").concat(displayInfo, "</span></p> \n                </div>  \n                <div class=\"word-change\">\n                    <label for=\"word\">Change Your Word:</label>\n                    <input type=\"text\" class=\"word\" id=\"word\" placeholder=\"Type your new word here\">\n                    <div class=\"error\">").concat(displayError, "</div> \n                    <button class=\"word-change-button\">Change</button>\n                </div> \n                <div class=\"logout\">       \n                    <button class=\"logout-button\">Logout</button>     \n                </div>             \n            </div>\n        ");
  }
  if (!username) {
    rootEl.innerHTML = loginPage();
  } else {
    rootEl.innerHTML = userInfoPage(username, displayInfo);
  }
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchUserData: () => (/* binding */ fetchUserData),
/* harmony export */   fetchUserStatus: () => (/* binding */ fetchUserStatus),
/* harmony export */   fetchWordChange: () => (/* binding */ fetchWordChange)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        if (err.error === 'required-username') {
          return Promise.reject({
            error: 'You need to input a valid username'
          });
        } else if (err.error === 'auth-insufficient') {
          return Promise.reject({
            error: 'You can not use dog as an username'
          });
        } else {
          return Promise.reject(err);
        }
      });
    }
    return response.json();
  });
}
function fetchUserStatus() {
  return fetch('/api/session', {
    method: 'GET',
    headers: {}
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        if (err.error === 'auth-missing') {
          return Promise.reject({
            error: 'You are not logged in !'
          });
        }
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchUserData() {
  return fetch('/api/word', {
    method: 'GET',
    headers: {}
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        if (err.error === 'auth-missing') {
          return Promise.reject({
            error: 'You are not logged in !'
          });
        } else {
          return Promise.reject(err);
        }
      });
    }
    return response.json();
  });
}
function fetchWordChange(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        if (err.error === 'auth-missing') {
          return Promise.reject({
            error: 'You are not logged in !'
          });
        } else if (err.error === 'required-word') {
          return Promise.reject({
            error: 'You need to input a valid word'
          });
        } else if (err.error === 'invalid-word') {
          return Promise.reject({
            error: 'That is an invalid word'
          });
        } else {
          return Promise.reject(err);
        }
      });
    }
    return response.json();
  });
}

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
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services */ "./src/services.js");
/* harmony import */ var _View_webPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/webPage */ "./src/View/webPage.js");
/* harmony import */ var _Model_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/state */ "./src/Model/state.js");



var rootEl = document.querySelector('#root');
var errorEl = document.querySelector('.error');
function getUserData() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUserData)().then(function (response) {
    if (response && !response.error) {
      (0,_Model_state__WEBPACK_IMPORTED_MODULE_2__.updateUserData)(response);
      (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__["default"])(rootEl);
    }
  })["catch"](function (err) {
    if (errorEl) {
      errorEl.textContent = err.error ? "Error: ".concat(err.error) : "Unexpected error occurred!";
    }
  });
}
function checkLoginStatus() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUserStatus)().then(function (response) {
    if (response && !response.error) {
      getUserData();
    } else {
      (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__["default"])(rootEl);
    }
  })["catch"](function (err) {
    if (errorEl) {
      errorEl.textContent = err.error ? "Error: ".concat(err.error) : "unexpected error occurred!";
    }
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__["default"])(rootEl);
  });
}
function userLogin() {
  var inputEl = document.querySelector('.username');
  var username = inputEl.value.trim();
  var errorEl = document.querySelector('.error');
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
    if (response && !response.error) {
      getUserData();
    } else {
      errorEl.textContent = "Error: ".concat(response.error);
    }
  })["catch"](function (err) {
    if (errorEl) {
      errorEl.textContent = err.error ? "Error: ".concat(err.error) : "unexpected error occurred!";
    }
  });
}
function userChangeWord() {
  var inputEl = document.querySelector('.word');
  var newWord = inputEl.value.trim();
  var errorEl = document.querySelector('.error');
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchWordChange)(newWord).then(function (response) {
    if (response && !response.error) {
      (0,_Model_state__WEBPACK_IMPORTED_MODULE_2__.updateUserData)(response);
      (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__["default"])(rootEl);
    } else {
      errorEl.textContent = "Error: ".concat(response.error);
    }
  })["catch"](function (err) {
    if (errorEl) {
      errorEl.textContent = err.error ? "Error: ".concat(err.error) : "unexpected error occurred!";
    }
  });
}
function userLogOut() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    (0,_Model_state__WEBPACK_IMPORTED_MODULE_2__.clearUserData)();
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__["default"])(rootEl);
    errorEl.textContent = '';
  })["catch"](function (err) {
    if (errorEl) {
      errorEl.textContent = err.error ? "Error: ".concat(err.error) : "unexpected error occurred!";
    }
  });
}
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login-button')) {
    userLogin();
  } else if (e.target.classList.contains('word-change-button')) {
    userChangeWord();
  } else if (e.target.classList.contains('logout-button')) {
    userLogOut();
  }
});
checkLoginStatus();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map