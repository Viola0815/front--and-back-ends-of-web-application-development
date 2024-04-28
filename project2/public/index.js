/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller/controller.js":
/*!**************************************!*\
  !*** ./src/Controller/controller.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenerControl: () => (/* binding */ listenerControl)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services */ "./src/services.js");
/* harmony import */ var _View_webPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/webPage */ "./src/View/webPage.js");
/* harmony import */ var _Model_handleError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/handleError */ "./src/Model/handleError.js");
/* harmony import */ var _Model_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/state */ "./src/Model/state.js");




function processLogin(username, state, mainEl, chatEl) {
  (0,_Model_state__WEBPACK_IMPORTED_MODULE_3__.loginPending)();
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
    state: state,
    mainEl: mainEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (users) {
    LoginSuccess(username, users, state, mainEl, chatEl);
  })["catch"](function (err) {
    LoginFailure(err, state, mainEl);
  });
}
function LoginSuccess(username, users, state, mainEl, chatEl) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = "";
  state.users = users;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)().then(function (messages) {
    state.messages = messages;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchRegisteredUsers)()["catch"](function (err) {
      (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)(err.error);
    });
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderChatArea)({
      state: state,
      chatEl: chatEl
    });
  })["catch"](function (err) {
    state.isLoginPending = false;
    (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)(err.error);
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
  });
}
function LoginFailure(err, state, mainEl) {
  state.isLoginPending = false;
  state.isLoggedIn = false;
  state.username = "";
  (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)(err.error);
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
    state: state,
    mainEl: mainEl
  });
}
function performLogout(state, mainEl, chatEl) {
  state.isLoggedIn = false;
  state.username = "";
  state.error = "";
  state.isLoginPending = false;
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
    state: state,
    mainEl: mainEl
  });
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderChatArea)({
    state: state,
    chatEl: chatEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
  })["catch"](function (err) {
    (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)(err.error);
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
  });
}
function sendAndDisplayMessage(message, state, mainEl, chatEl) {
  state.error = "";
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderChatArea)({
    state: state,
    chatEl: chatEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchPostMessage)(message).then(function (messages) {
    state.messages = messages;
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderChatArea)({
      state: state,
      chatEl: chatEl
    });
  })["catch"](function (err) {
    (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)(err.error);
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
      state: state,
      mainEl: mainEl
    });
  });
}
function listenerControl(_ref) {
  var state = _ref.state,
    mainEl = _ref.mainEl,
    chatEl = _ref.chatEl;
  mainEl.addEventListener("submit", function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains("login-form")) {
      var username = mainEl.querySelector(".login-username").value.trim();
      (0,_Model_state__WEBPACK_IMPORTED_MODULE_3__.loginPending)();
      processLogin(username, state, mainEl, chatEl);
    } else if (target.classList.contains("UserLogout")) {
      performLogout(state, mainEl, chatEl);
    } else if (target.classList.contains("chatSending")) {
      var message = mainEl.querySelector(".message").value.trim();
      if (message) {
        sendAndDisplayMessage(message, state, mainEl, chatEl);
      } else {
        (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_2__.showError)('required message');
        (0,_View_webPage__WEBPACK_IMPORTED_MODULE_1__.renderMain)({
          state: state,
          mainEl: mainEl
        });
      }
    }
  });
}

/***/ }),

/***/ "./src/Model/handleError.js":
/*!**********************************!*\
  !*** ./src/Model/handleError.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/Model/state.js");

function showError(errorType) {
  if (!errorType) {
    _state_js__WEBPACK_IMPORTED_MODULE_0__.state.error = '';
    return;
  }
  var errorMessage = 'An unexpected error occurred!';
  if (errorType === 'network error') {
    errorMessage = 'There is a network error';
  } else if (errorType === 'auth insufficient') {
    errorMessage = 'You cannot use dog as a username.';
  } else if (errorType === 'required username') {
    errorMessage = 'Please enter a valid username';
  } else if (errorType === 'required message') {
    errorMessage = 'Please enter something to send';
  }
  _state_js__WEBPACK_IMPORTED_MODULE_0__.state.error = errorMessage;
  _state_js__WEBPACK_IMPORTED_MODULE_0__.state.isLoginPending = false;
}

/***/ }),

/***/ "./src/Model/state.js":
/*!****************************!*\
  !*** ./src/Model/state.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loginPending: () => (/* binding */ loginPending),
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
var state = {
  isLoggedIn: false,
  username: "",
  error: "",
  users: {},
  messages: [],
  registeredUsers: [],
  isLoginPending: false
};
function loginPending() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.users = {};
  state.messages = [];
  state.error = '';
}

/***/ }),

/***/ "./src/View/webPage.js":
/*!*****************************!*\
  !*** ./src/View/webPage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderChatArea: () => (/* binding */ renderChatArea),
/* harmony export */   renderMain: () => (/* binding */ renderMain)
/* harmony export */ });
function renderMain(_ref) {
  var state = _ref.state,
    mainEl = _ref.mainEl;
  var html = "\n        ".concat(logginSite(state), "\n        ").concat(userSendMessageOrLogout(state), "\n     \n    ");
  mainEl.innerHTML = html;
}
function logginSite(state) {
  var displayError = state.error ? "<div class=\"error\">".concat(state.error, "</div>") : "";
  if (state.isLoggedIn) {
    return "";
  }
  return "\n        ".concat(getLoginHtml(state), "\n        <div class=\"header\">\n            <h1>Please login to start our channel!</h1>  \n        </div>\n        <div class=\"login\">\n            <form class=\"login-form\">\n                <label for=\"username\">Enter your username:</label>\n                <input type=\"text\" id=\"username\" class=\"login-username\" name=\"username\" placeholder=\"Type your username here\">\n                <div class=\"error\">").concat(displayError, "</div>\n                <button class=\"login-button\">Submit</button>\n            </form>\n        </div>\n\n    ");
}
function showUserWelcomeMessage(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n        <div class=\"header\">\n            <h1>Welcome to the chatting channel, ".concat(state.username, "!</h1>\n        </div>\n    ");
}
function renderChatArea(_ref2) {
  var state = _ref2.state,
    chatEl = _ref2.chatEl;
  var html = "";
  if (state.isLoggedIn) {
    html = "\n            ".concat(showChatAndUsers(state), "\n        ");
  }
  chatEl.innerHTML = html;
}
function userSendMessageOrLogout(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  var displayError = state.error ? "<div class=\"error\">".concat(state.error, "</div>") : "";
  return "\n        <div class=\"sendMessageOrLogout\">\n            <div class=\"sendMessage\">\n                <form class=\"chatSending\">\n                    <label for=\"messageInput\">Type your new message here:</label>\n                    <input type=\"text\" id=\"messageInput\" class=\"message\" name=\"message\" placeholder=\"Type your new message here\">\n                    <button class=\"send-button\">Send</button>\n                    ".concat(displayError, "\n                </form>\n    </div>\n    \n            <div class=\"logout\">\n                <form class=\"UserLogout\">\n                    <button class=\"logout-button\">Logout</button>\n                </form>\n            </div>\n        </div>\n    ");
}
function showAllMessages(state) {
  if (!state.isLoggedIn || !state.messages) {
    return "";
  }
  var messagesHtml = '<ol class="messages">';
  for (var i = 0; i < state.messages.length; i++) {
    messagesHtml += "\n            <li>\n                <div class=\"message\">\n                    <span class=\"username\">".concat(state.messages[i].sender, "</span>\n                    <p class=\"messageText\">").concat(state.messages[i].text, "</p>\n                </div>\n            </li>\n        ");
  }
  messagesHtml += '</ol>';
  return messagesHtml;
}
function showChatAndUsers(state) {
  var messagesHtml = showAllMessages(state);
  var usersHtml = showUserWelcomeMessage(state);
  var onlineUsersHtml = Object.keys(state.users).map(function (user) {
    return "<li>".concat(user, "</li>");
  }).join('');
  var chattingSession = "\n        <div class=\"online-users\">\n            <h2>Online Users</h2>\n            <ul>".concat(onlineUsersHtml, "</ul>\n        </div>\n        <div class=\"chat-container\">\n            ").concat(usersHtml, "\n            ").concat(messagesHtml, "\n        </div>\n    ");
  return chattingSession;
}
function getLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n        <div class=\"loadingMessage\">Loading user...</div>\n      ";
  }
  return '';
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
/* harmony export */   fetchLoginUsers: () => (/* binding */ fetchLoginUsers),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchPostMessage: () => (/* binding */ fetchPostMessage),
/* harmony export */   fetchRegisteredUsers: () => (/* binding */ fetchRegisteredUsers),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch("/api/session", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchLogin(username) {
  return fetch("/api/session", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchLogout() {
  return fetch("/api/session", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchLoginUsers() {
  return fetch("/api/onlineUsers", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchRegisteredUsers() {
  return fetch("/api/existUsers", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchMessages() {
  return fetch("/api/messages", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
function fetchPostMessage(message) {
  return fetch("/api/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network error"
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
  !*** ./src/Controller/appManager.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _View_webPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View/webPage */ "./src/View/webPage.js");
/* harmony import */ var _Model_handleError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model/handleError */ "./src/Model/handleError.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ "./src/Controller/controller.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services */ "./src/services.js");
/* harmony import */ var _Model_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Model/state */ "./src/Model/state.js");





var mainEl = document.querySelector("#mainArea");
var chatEl = document.querySelector("#chatArea");
(0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
  state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
  mainEl: mainEl
});
(0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderChatArea)({
  state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
  chatEl: chatEl
});
(0,_controller__WEBPACK_IMPORTED_MODULE_2__.listenerControl)({
  state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
  mainEl: mainEl,
  chatEl: chatEl
});
checkLoginStatus();
initialRender();
function checkLoginStatus() {
  (0,_Model_state__WEBPACK_IMPORTED_MODULE_4__.loginPending)();
  (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
    state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
    mainEl: mainEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchSession)().then(function (session) {
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.isLoggedIn = true;
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.username = session.username;
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.error = "";
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.isLoginPending = false;
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
      state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
      mainEl: mainEl
    });
    updateChats();
  })["catch"](function (err) {
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.isLoginPending = false;
    if (err && err.error === 'auth missing') {
      _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.isLoggedIn = false;
      _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.username = "";
      _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.error = "";
      (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
        state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
        mainEl: mainEl
      });
    } else {
      (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_1__.showError)(err && err.error);
      (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
        state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
        mainEl: mainEl
      });
    }
  });
}
function initialRender() {
  updateChats();
  setTimeout(initialRender, 5000);
}
function updateChats() {
  if (!_Model_state__WEBPACK_IMPORTED_MODULE_4__.state.isLoggedIn) {
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchLoginUsers)().then(function (users) {
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.users = users;
    return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessages)();
  }).then(function (messages) {
    _Model_state__WEBPACK_IMPORTED_MODULE_4__.state.messages = messages;
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderChatArea)({
      state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
      chatEl: chatEl
    });
  })["catch"](function (err) {
    (0,_Model_handleError__WEBPACK_IMPORTED_MODULE_1__.showError)(err.error);
    (0,_View_webPage__WEBPACK_IMPORTED_MODULE_0__.renderMain)({
      state: _Model_state__WEBPACK_IMPORTED_MODULE_4__.state,
      mainEl: mainEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map