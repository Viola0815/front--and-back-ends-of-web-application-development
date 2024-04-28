import { state } from './state.js';
export function showError(errorType) {
    if (!errorType) {
        state.error = '';
        return;
    }
    let errorMessage = 'An unexpected error occurred!'; 
    if (errorType === 'network error') {
        errorMessage = 'There is a network error';
    } else if (errorType === 'auth insufficient') {
        errorMessage = 'You cannot use dog as a username.';
    } else if (errorType === 'required username') {
        errorMessage = 'Please enter a valid username';
    } else if (errorType === 'required message') {
        errorMessage = 'Please enter something to send';
    }

    state.error = errorMessage;
    state.isLoginPending = false;
  
}
