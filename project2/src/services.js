export function fetchSession() {
	return fetch("/api/session", {
		method: "GET",
	})
    .catch((err) => Promise.reject({ error: "network error" }))
    .then((response) => {
        if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
    });
}

export function fetchLogin(username) {
	return fetch("/api/session", {
		method: "POST",
		headers:({
			"content-type": "application/json",
		}),
		body: JSON.stringify({ username }),
	})
	.catch((err) => Promise.reject({ error: "network error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchLogout() {
	return fetch("/api/session", {
		method: "DELETE",
	})
		.catch((err) => Promise.reject({ error: "network error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchLoginUsers() {
    return fetch("/api/onlineUsers", {
        method: "GET",
    })
    .catch((err) => Promise.reject({ error: "network error" }))
    .then((response) => {
        if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
    });
}

export function fetchRegisteredUsers() {
    return fetch("/api/existUsers", {
        method: "GET",
    })
    .catch((err) => Promise.reject({ error: "network error" }))
    .then((response) => {
        if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
    });
}



export function fetchMessages() {
	return fetch("/api/messages", {
		method: "GET",
	})
    .catch((err) => Promise.reject({ error: "network error" }))
    .then((response) => {
        if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
    });
}

export function fetchPostMessage(message) {
	return fetch("/api/messages", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ message }),
	})
		.catch((err) => Promise.reject({ error: "network error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

