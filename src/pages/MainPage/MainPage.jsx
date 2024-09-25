import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect, useCallback } from 'react';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
import debounce from 'lodash.debounce';
import Tabs from '../../components/parts/Tabs/Tabs';
import { Flex } from 'antd';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ notFound: false, fetch: false });
  const [inputData, setInputData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const moviesAPI = new MoviesService();

  const debouncedFetchMovies = useCallback(
    debounce(async (movieName, pageNumber) => {
      console.log('Call debounce');
      setIsLoading(true);
      try {
        const moviesData = await moviesAPI.getAllMovies(movieName, pageNumber);
        setMovies(moviesData);
        setError({ notFound: moviesData.length === 0, fetch: false });
      } catch {
        setError((prev) => ({ ...prev, fetch: true }));
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [moviesAPI]
  );

  useEffect(() => {
    if (inputData.trim()) {
      console.log('Call debouncedFetchMovies');
      debouncedFetchMovies(inputData, currentPage);
    } else {
      setMovies([]);
      setError({ notFound: false, fetch: false });
    }
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [inputData, currentPage]);

  useEffect(() => {
    moviesAPI.getGenres().then((genresData) => setGenres(genresData));
  }, []);

  return (
    <>
      <div className={classes.container}>
        <Flex align="center" vertical="true">
          <Tabs />
          <CustomInput
            type="text"
            placeholder="Type to search..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <MoviesList
            movies={movies}
            genres={genres}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </Flex>
      </div>
    </>
  );
}
