import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';
import MoviesService from '../api/MoviesService';

const useMovies = (inputData, currentPage) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ notFound: false, fetch: false });
  const [searchTotalPages, setSearchTotalPages] = useState(0);

  const moviesAPI = new MoviesService();

  // Обернули ф-цию загрузки фильмов в debounce и закешировали ее
  const debouncedFetchMovies = useCallback(
    debounce(async (movieName, pageNumber) => {
      setIsLoading(true);
      try {
        const { results: moviesData, total_pages } = await moviesAPI.getAllMovies(
          movieName,
          pageNumber
        );
        setMovies(moviesData);
        setSearchTotalPages(total_pages);
        setError({ notFound: moviesData.length === 0, fetch: false });
      } catch {
        setError((prev) => ({ ...prev, fetch: true }));
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [moviesAPI]
  );

  // Загружаем данные по строке из input
  useEffect(() => {
    if (inputData.trim()) {
      debouncedFetchMovies(inputData, currentPage);
    } else {
      setMovies([]);
      setError({ notFound: false, fetch: false });
    }
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [inputData, currentPage]);

  return [movies, isLoading, error, searchTotalPages];
};

export default useMovies;
