import { MOVIES_URL } from './consts';

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  static processResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getMovies() {
    return fetch(`${this.baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this.headers,
    }).then(Api.processResponse);
  }
}

const moviesApi = new Api({
  baseUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
