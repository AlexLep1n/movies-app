import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const moviesAPI = new MoviesService();
    moviesAPI.getAllMovies().then((data) => {
      setMovies(data);
      setIsloading(false);
    });
  }, []);
  if (movies) console.log(movies);

  return (
    <>
      <div className={classes.container}>
        <MoviesList movies={movies} isloading={isloading} />
      </div>
    </>
  );
}
