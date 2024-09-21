import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect, useCallback } from 'react';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
import debounce from 'lodash.debounce';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ notFound: false, fetch: false });
  const [inputData, setInputData] = useState('');

  const moviesAPI = new MoviesService();

  const debouncedFetchMovies = useCallback(
    debounce(async (movieName) => {
      setIsLoading(true);
      try {
        const moviesData = await moviesAPI.getAllMovies(movieName);
        setMovies(moviesData);
        setError({ notFound: moviesData.length === 0, fetch: false });
      } catch {
        setError((prev) => ({ ...prev, fetch: true }));
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [moviesAPI]
  );

  useEffect(() => {
    if (inputData.trim()) {
      debouncedFetchMovies(inputData);
    } else {
      setMovies([]);
      setError({ notFound: false, fetch: false });
    }

    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [inputData]);

  useEffect(() => {
    console.log('getGenres');
    moviesAPI.getGenres().then((genresData) => setGenres(genresData));
  }, []);

  return (
    <>
      <div className={classes.container}>
        <CustomInput
          type="text"
          placeholder="Type to search..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <MoviesList movies={movies} genres={genres} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}
