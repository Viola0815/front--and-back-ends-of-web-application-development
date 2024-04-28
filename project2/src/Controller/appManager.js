import { renderChatArea, renderMain } from "../View/webPage";
import { showError } from '../Model/handleError';
import { listenerControl } from "./controller";
import { fetchSession, fetchLoginUsers, fetchMessages } from "../services";
import { state, loginPending } from "../Model/state";

const mainEl = document.querySelector("#mainArea");
const chatEl = document.querySelector("#chatArea");

renderMain({ state, mainEl });
renderChatArea({ state, chatEl });
listenerControl({ state, mainEl, chatEl });

checkLoginStatus();
initialRender();

function checkLoginStatus() {
    loginPending()
    renderMain({ state, mainEl });
    fetchSession()
        .then((session) => {
            state.isLoggedIn = true;
            state.username = session.username;
            state.error = "";
            state.isLoginPending = false; 
            renderMain({ state, mainEl });
            updateChats();
        })
        .catch((err) => {
            state.isLoginPending = false; 
            if (err && err.error === 'auth missing') {
                state.isLoggedIn = false;
                state.username = "";
                state.error = "";
                
                renderMain({ state, mainEl });
            } else {
                showError(err && err.error); 
                renderMain({ state, mainEl });
            }
        });
}

function initialRender() {
    updateChats();
    setTimeout(initialRender, 5000); 
}

function updateChats() {
    if (!state.isLoggedIn) {
        return; 
    }
    fetchLoginUsers()
        .then((users) => {
            state.users = users
            return fetchMessages();
        })
        .then((messages) => {
            state.messages = messages;
            renderChatArea({ state, chatEl });
        })
        .catch((err) => {

            showError(err.error);
            renderMain({ state, mainEl });
        });
}

