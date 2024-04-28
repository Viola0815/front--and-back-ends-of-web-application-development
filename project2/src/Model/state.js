export const state = {
    isLoggedIn: false,
    username: "",
    error: "",
    users: {},
    messages: [],
    registeredUsers: [],
    isLoginPending: false,
};

export function loginPending() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.users = {};
    state.messages = [];
    state.error = '';
}
