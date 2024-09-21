export default class MoviesService {
  constructor() {
    this._basicUrl = 'https://api.themoviedb.org/3/search/movie';
    this._genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    this._accessKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTQzZWYwOTIzN2RjOGVkY2UzMWJlYjMyNmZhNTlmNiIsIm5iZiI6MTcyNjMzMjcwOS42MDg0NjgsInN1YiI6IjY2ZTViYmI5MmNmMzI1OTc5YTM5Nzc2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nGMQFMnvCPM8H9H6i0DAwGfPttVMCQCxSjoJtVke_6A';
  }

  async getResource(urlBase, params) {
    const fullUrl = `${urlBase}${params}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._accessKey}`,
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

  async getAllMovies(inputData) {
    const params = new URLSearchParams({
      query: inputData,
      include_adult: false,
      language: 'en-US',
      page: 1,
    });

    const moviesData = await this.getResource(this._basicUrl, `?${params}`);
    return moviesData.results;
  }

  async getGenres() {
    const genresData = await this.getResource(this._genresUrl, '');
    return genresData.genres;
  }
}
