export default class MoviesService {
  constructor() {
    this._basicUrl = 'https://api.themoviedb.org/3/search/movie';
    this._genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    this._API_KEY = '5143ef09237dc8edce31beb326fa59f6';
    this._API_TOKEN =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTQzZWYwOTIzN2RjOGVkY2UzMWJlYjMyNmZhNTlmNiIsIm5iZiI6MTcyNjMzMjcwOS42MDg0NjgsInN1YiI6IjY2ZTViYmI5MmNmMzI1OTc5YTM5Nzc2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nGMQFMnvCPM8H9H6i0DAwGfPttVMCQCxSjoJtVke_6A';
    this._guestSessionUrl = 'https://api.themoviedb.org/3/authentication/guest_session/new';
  }

  // Reusable ф-ция для получения данных по пути и параметрам
  async getResource(urlBase, params) {
    const fullUrl = `${urlBase}${params}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._API_TOKEN}`,
      },
    });
    if (!response.ok) {
      const errorText = response.text();
      throw new Error(
        `Could not fetch ${fullUrl}, received status ${response.status}: ${errorText}`
      );
    }
    return await response.json();
  }

  async postResource(urlBase, params, bodyData) {
    const fullUrl = `${urlBase}${params}`;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this._API_TOKEN}`,
      },
      body: JSON.stringify({
        value: bodyData,
      }),
    });
    if (!response.ok) {
      const errorText = response.text();
      throw new Error(
        `Could not fetch ${fullUrl}, received status ${response.status}: ${errorText}`
      );
    }
    return await response.json();
  }

  // Получаем массив фильмов по запросу и странице
  async getAllMovies(inputData, pageNumber) {
    const params = new URLSearchParams({
      query: inputData,
      include_adult: false,
      language: 'en-US',
      page: pageNumber,
    });

    const moviesData = await this.getResource(this._basicUrl, `?${params}`);
    return moviesData.results;
  }

  // Получаем жанры фильмов
  async getGenres() {
    const genresData = await this.getResource(this._genresUrl, '');
    return genresData.genres;
  }

  // Получаем guest seesion id
  async createGuestSession() {
    const sessionId = await this.getResource(this._guestSessionUrl, '');
    return sessionId.guest_session_id;
  }

  async rateMovie(sessionId, movieId, rating) {
    const params = new URLSearchParams({
      guest_session_id: sessionId,
    });
    const response = await this.postResource(
      `https://api.themoviedb.org/3/movie/${movieId}/rating`,
      `?${params}`,
      rating
    );
    return response;
  }

  async getRatedMovies(sessionId, pageNumber) {
    const params = new URLSearchParams({
      language: 'en-US',
      page: pageNumber,
      sort_by: 'created_at.asc',
    });

    const ratedMovies = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies`,
      `?${params}`
    );
    return ratedMovies.results;
  }
}
