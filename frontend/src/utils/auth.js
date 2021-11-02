export const BASE_URL = "https://api.thisismesto.students.nomoredomains.rocks";

export const checkStatus = (res) => {
  if (res.ok) {
  return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkStatus(res))
};

export const authorize = (userInfo) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(userInfo),
  })
  .then((res) => checkStatus(res))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then((res) => checkStatus(res))
};
