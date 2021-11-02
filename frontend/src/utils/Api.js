 class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkStatus = (res) => {
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

  _checkAuth = (headers) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }
  return headers;
}

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._checkAuth(this._headers),
    })
    .then((res) => this._checkStatus(res));
  }
  
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._checkAuth(this._headers),
    })
    .then((res) => this._checkStatus(res));
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._checkAuth(this._headers),
      body: JSON.stringify({
        name: name,
        about: about,
    })
  })
  .then((res) => this._checkStatus(res));
  }

  addNewCard(cardTitle, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._checkAuth(this._headers),
      body: JSON.stringify({
        name: cardTitle,
        link: cardLink
      })
    })
    .then((res) => this._checkStatus(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._checkAuth(this._headers),
  })  
  .then((res) => this._checkStatus(res));
 }

 setLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this._checkAuth(this._headers),
  })
  .then((res) => this._checkStatus(res));
}

deleteLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._checkAuth(this._headers),
  })
  .then((res) => this._checkStatus(res));
}

changeLikeCardStatus(cardId, isLiked) {
  if(isLiked) {
    return this.setLike(cardId)
  } else {
    return this.deleteLike(cardId)
  }
}

  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._checkAuth(this._headers),
      body: JSON.stringify({
      avatar: avatar
    })
  })  
  .then((res) => this._checkStatus(res));
  }
  
}

const api = new Api ({
  url: 'https://api.thisismesto.students.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;