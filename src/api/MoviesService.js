export default class MoviesService {
  _basicUrl = 'https://api.themoviedb.org/3/search/movie';
  _accessKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTQzZWYwOTIzN2RjOGVkY2UzMWJlYjMyNmZhNTlmNiIsIm5iZiI6MTcyNjMzMjcwOS42MDg0NjgsInN1YiI6IjY2ZTViYmI5MmNmMzI1OTc5YTM5Nzc2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nGMQFMnvCPM8H9H6i0DAwGfPttVMCQCxSjoJtVke_6A';

  async getResource(url) {
    const response = await fetch(`${this._basicUrl}${url}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._accessKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received status ${response.status}`);
    }
    return await response.json();
  }

  async getAllMovies() {
    const moviesData = await this.getResource(
      '?query=return&include_adult=false&language=en-US&page=1'
    );
    return moviesData.results;
  }
}
