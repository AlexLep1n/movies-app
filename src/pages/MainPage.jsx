import MoviesList from '../components/blocks/MoviesList/MoviesList';
import MoviesService from '../api/MoviesService';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const moviesAPI = new MoviesService();
    moviesAPI.getAllMovies().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <MoviesList movies={movies} />
    </>
  );
}
