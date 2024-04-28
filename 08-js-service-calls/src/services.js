export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify({ username }),
  })
  .catch(err => Promise.reject({ error: 'network-error' })) 
  .then(response => {
    if (!response.ok) {  
      return response.json().then(err => {
        if (err.error === 'required-username') {
          return Promise.reject({ error: 'You need to input a valid username' });
        } else if (err.error === 'auth-insufficient') {
          return Promise.reject({ error: 'You can not use dog as an username' });
        } else {
          return Promise.reject(err); 
        }
      });
    }
    return response.json(); 
  });
}

export function fetchUserStatus() {
  return fetch('/api/session', {
    method: 'GET', 
    headers: {}, 
  })
      .catch(err => Promise.reject({ error: 'network-error' })) 
      .then(response => {
          if (!response.ok) { 
            return response.json().then(err => {
              if(err.error === 'auth-missing') {
                return Promise.reject({ error: 'You are not logged in !' }); 
              }
              return Promise.reject(err);
            });
          }
          return response.json(); 
      });
}


export function fetchLogout() {
  return fetch('/api/session', {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json',
      },
  })
  .catch(err => Promise.reject({ error: 'network-error' }))
  .then(response => {
      if (!response.ok) {  
          return response.json().then(err => Promise.reject(err));
      }
      return response.json(); 
  });
}

export function fetchUserData() {
  return fetch('/api/word', {
    method: 'GET', 
    headers: {}, 
  })
  .catch(err => Promise.reject({ error: 'network-error' }))
  .then(response => {
    if (!response.ok) {  
        return response.json().then(err => {
            if (err.error === 'auth-missing') {
              return Promise.reject({ error: 'You are not logged in !' });
            } else {
              return Promise.reject(err);
            }
        });
    }
    return response.json(); 
  });
}

export function fetchWordChange(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({word}),
  })
  .catch(err => Promise.reject({ error: 'network-error' }))
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        if (err.error === 'auth-missing') {
          return Promise.reject({ error: 'You are not logged in !' });
        } else if (err.error === 'required-word') {
          return Promise.reject({ error: 'You need to input a valid word' });
        } else if (err.error === 'invalid-word') {
          return Promise.reject({ error: 'That is an invalid word' });
        } else {
          return Promise.reject(err); 
        }
      });
    }
    return response.json(); 
  });
}
