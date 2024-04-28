export function checkSession() {
  return fetch("/api/v1/session", {
    method: "GET",
  })
  .catch(err => Promise.reject({ error: "network-error" }))
  .then(response => {
      if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
      }
      return response.json();
  });
}

export function fetchLogin(username) {
	return fetch("/api/v1/login", {
		method: "POST",
		headers:({
			"content-type": "application/json",
		}),
		body: JSON.stringify({ username }),
	})
	.catch((err) => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchLogout() {
  return fetch('/api/v2/session', {
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


export function fetchProducts() {
  return fetch("/api/v1/products", {
    method: "GET",
  })
  .catch(err => ({ error: "network-error" })) 
  .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }

      return response.json();
  });
}

export function fetchCart() {
  return fetch("/api/v1/cart", {
    method: "GET", 
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }

    return response.json();
  })
  .catch(err => ({ error: "network-error" })); 
}


