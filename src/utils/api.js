class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _request(endPoint, method, body) {
    return fetch(
      `${this._baseUrl}/${endPoint}`,
      {
        method: method,
        headers: this._headers,
        body:JSON.stringify(body)
      }
    ).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }


  getInitialCards() {
    return this._request('cards')
  }

  getUserData() {
    return this._request('users/me')
  }

  updateUserData(newData) {
    return this._request('users/me', 'PATCH', newData)
  }

  updateAvatar(newAvatar) {
    return this._request('users/me/avatar', 'PATCH', newAvatar)
  }

  addCard(newCard) {
    return this._request('cards', 'POST', newCard)
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, 'DELETE')
  }

  addLike(cardId) {
    return this._request(`cards/likes/${cardId}`, 'PUT')
  }

  deleteLike(cardId) {
    return this._request(`cards/likes/${cardId}`, 'DELETE')
  }
}

export const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
      authorization: '934c46c5-5482-4ae2-9c3d-a386fe87103e',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
)
