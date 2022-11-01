const SERVER_URL = 'https://api.domain.nomoredomains.sbs/'

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  static processResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  signUp(creds) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(creds),
    }).then(Api.processResponse);
  }

  signIn(creds) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(creds),
    }).then(Api.processResponse);
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this.headers, Authorization: `Bearer ${jwt}` },
    }).then(Api.processResponse);
  }
}

const mainApi = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;