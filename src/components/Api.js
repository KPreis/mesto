export default class Api {
  constructor(authConfig) {
    this._token = authConfig.token;
    this._cohortId = authConfig.cohortId;
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendNewCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${card['name']}`,
        link: `${card['link']}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `${this._token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProfile() {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`,
      {
        method: 'GET',
        headers: {
          authorization: `${this._token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setProfile(profile) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`,
      {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${profile['name']}`,
          about: `${profile['description']}`,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setAvatar(avatarLink) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: `${avatarLink}`,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      {
        method: 'PUT',
        headers: {
          authorization: `${this._token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      {
        method: 'DELETE',
        headers: {
          authorization: `${this._token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
