import { fetchLogin, fetchLogout, fetchMessages, fetchPostMessage,fetchRegisteredUsers } from "../services";
import { renderMain, renderChatArea } from "../View/webPage";
import { showError } from '../Model/handleError';
import { loginPending } from "../Model/state";

function processLogin(username, state, mainEl, chatEl) {
    loginPending();
    renderMain({ state, mainEl }); 
    fetchLogin(username)
        .then(users => {
            LoginSuccess(username, users, state, mainEl, chatEl);
        })
        .catch(err => {
            LoginFailure(err, state, mainEl);
        });
}

function LoginSuccess(username, users, state, mainEl, chatEl) {
    state.isLoggedIn = true;
    state.username = username;
    state.error = ""; 
    state.users = users;
    fetchMessages()
        .then(messages => {
            state.messages = messages;
            fetchRegisteredUsers()
                .catch(err => {
                    showError(err.error);
                });
            renderMain({ state, mainEl });
            renderChatArea({ state, chatEl });
        })
        .catch(err => {
             state.isLoginPending = false;
            showError(err.error);
            renderMain({ state, mainEl }); 
        });
}

function LoginFailure(err, state, mainEl) {
    state.isLoginPending = false;
    state.isLoggedIn = false;
    state.username = "";
    showError(err.error);
    renderMain({ state, mainEl });
}

function performLogout(state, mainEl, chatEl) {
    state.isLoggedIn = false;
    state.username = "";
    state.error = "";
    state.isLoginPending = false;
    renderMain({ state, mainEl });
    renderChatArea({ state, chatEl });

    fetchLogout()
        .then(() => {
            renderMain({ state, mainEl });
        })
        .catch((err) => {
            showError(err.error);
            renderMain({ state, mainEl });
        });
}

function sendAndDisplayMessage(message, state, mainEl, chatEl) {
    state.error = "";
    renderChatArea({ state, chatEl }); 
    fetchPostMessage(message)
        .then((messages) => {
            state.messages = messages;
            renderMain({ state, mainEl });
            renderChatArea({ state, chatEl });
        })
        .catch((err) => {
            showError(err.error);
            renderMain({ state, mainEl });
        });
}

export function listenerControl({ state, mainEl, chatEl }) {
    mainEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains("login-form")) {
            const username = mainEl.querySelector(".login-username").value.trim();
            loginPending();
            processLogin(username, state, mainEl, chatEl);
        } else if (target.classList.contains("UserLogout")) {
            performLogout(state, mainEl, chatEl);
        } else if (target.classList.contains("chatSending")) {
            const message = mainEl.querySelector(".message").value.trim();
            if (message) {
                sendAndDisplayMessage(message, state, mainEl, chatEl);
            } else {
                showError('required message');
                renderMain({ state, mainEl });
            }
        }
    });
}
