import { useState, useEffect, useCallback } from 'react';
import MoviesService from '../api/MoviesService';

const useRatings = (postData, currentPage, activeTab) => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState({ notFound: false, fetch: false });
  const [rateTotalPages, setRateTotalPages] = useState(0);

  const moviesAPI = new MoviesService();

  // Отправляем POST запрос при оценки фильма
  const rateMovie = useCallback(async () => {
    if (postData.movieId) {
      try {
        const data = await moviesAPI.rateMovie(
          localStorage.getItem('sessionID'),
          postData.movieId,
          postData.rating
        );
        console.log(data.status_message);
      } catch {
        setError({ ...error, fetch: true });
      }
    }
  }, [postData]);

  useEffect(() => {
    rateMovie();
  }, [rateMovie]);

  // Получаем оцененные фильмы
  const fetchRatedMovies = useCallback(async () => {
    try {
      const { results: ratedMoviesData, total_pages } = await moviesAPI.getRatedMovies(
        localStorage.getItem('sessionID'),
        currentPage
      );
      setRatedMovies(ratedMoviesData);
      setRateTotalPages(total_pages);
    } catch {
      setError({ ...error, fetch: true });
    }
  }, [currentPage]);

  useEffect(() => {
    if (activeTab === 'Rated') {
      fetchRatedMovies();
    }
  }, [activeTab, fetchRatedMovies]);
  return [ratedMovies, rateTotalPages, error];
};

export default useRatings;
