import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect } from 'react';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
// import { LoDashStatic } from 'lodash.debounce';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    const moviesAPI = new MoviesService();
    // const debFunc = LoDashStatic.debounce(
    //   () =>
    //     moviesAPI
    //       .getAllMovies(inputData)
    //       .then((moviesData) => {
    //         setMovies(moviesData);
    //         setIsLoading(false);
    //         setError(false);
    //       })
    //       .catch(() => {
    //         setError(true);
    //         setIsLoading(false);
    //       }),
    //   400
    // );
    moviesAPI
      .getAllMovies(inputData)
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
