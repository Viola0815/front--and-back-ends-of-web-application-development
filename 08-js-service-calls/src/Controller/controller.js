import { fetchLogin, fetchUserStatus, fetchUserData, fetchWordChange, fetchLogout } from '../services';
import render from '../View/webPage';
import {updateUserData,clearUserData} from '../Model/state';


const rootEl = document.querySelector('#root');
const errorEl = document.querySelector('.error');

function getUserData() {
    fetchUserData()
        .then(response => {
            if (response && !response.error) {
                updateUserData(response);
                render(rootEl);
            
            }
        })
        .catch(err => {
            if (errorEl) {
                errorEl.textContent = err.error ? `Error: ${err.error}` : "Unexpected error occurred!";
            }
        });    
}

function checkLoginStatus() {
    fetchUserStatus()
        .then(response => {
            if (response && !response.error) {
                getUserData();
            } else {
                render(rootEl); 
            }
        })
        .catch(err => {
            if (errorEl) {
                errorEl.textContent = err.error ? `Error: ${err.error}` : "unexpected error occurred!";
            }
            render(rootEl);
        });
}


function userLogin() {
    const inputEl = document.querySelector('.username');
    const username = inputEl.value.trim();
    const errorEl = document.querySelector('.error'); 
    fetchLogin(username)
        .then(response => {
            if (response && !response.error) {
                getUserData();
            } else {
                errorEl.textContent = `Error: ${response.error}`;
            }
        })
        .catch(err => {
            if (errorEl) {
                errorEl.textContent = err.error ? `Error: ${err.error}` : "unexpected error occurred!";
            }
        });
  }
  


function userChangeWord() {
    const inputEl = document.querySelector('.word');
    const newWord = inputEl.value.trim(); 
    const errorEl = document.querySelector('.error');

    fetchWordChange(newWord)
        .then(response => {
            if (response && !response.error) {
                updateUserData(response);
                render(rootEl);
            } else {
                errorEl.textContent = `Error: ${response.error}`;
            }
        })
        .catch(err => {
            if (errorEl) {
                errorEl.textContent = err.error ? `Error: ${err.error}` : "unexpected error occurred!";
            }
        });
  }

function userLogOut() {
    fetchLogout()
        .then(() => {
            clearUserData();
            render(rootEl); 
            errorEl.textContent = ''; 
        })
        .catch(err => {
            if (errorEl) {
                errorEl.textContent = err.error ? `Error: ${err.error}` : "unexpected error occurred!";
            }
        });
  }

rootEl.addEventListener('click', e => {
    if (e.target.classList.contains('login-button')) {
        userLogin();
    } else if (e.target.classList.contains('word-change-button')) {
        userChangeWord();
    } else if (e.target.classList.contains('logout-button')) {
        userLogOut();
    }
});

checkLoginStatus();
