import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const moviesAPI = new MoviesService();
    moviesAPI
      .getAllMovies()
      .then((moviesData) => {
        setMovies(moviesData);
        setIsLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
    moviesAPI.getGenres().then((genresData) => setGenres(genresData));
  }, []);
  // if (movies) console.log(movies);
  // if (genres.length > 0) console.log(genres);

  return (
    <>
      <div className={classes.container}>
        <MoviesList movies={movies} genres={genres} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}
