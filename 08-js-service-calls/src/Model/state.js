const state = {
  userData: {}
};

function updateUserData(newUserInfo) {
  state.userData = newUserInfo;
}

function clearUserData() {
  state.userData = {};
}

function getUserData() {
  let username, storedWord, error;
  if (state.userData) {
      username = state.userData.username;
      storedWord = state.userData.storedWord;
      error = state.userData.error;
  } else {
      username = ''; 
      storedWord = '';
      error = '';
  }
  return { username, storedWord, error };
}

export { state, updateUserData, clearUserData, getUserData };
