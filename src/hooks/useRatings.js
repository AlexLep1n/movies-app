import { useState, useEffect, useCallback } from 'react';
import MoviesService from '../api/MoviesService';

const useRatings = (postData, currentPage, activeTab) => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState({ notFound: false, fetch: false });

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
    const data = await moviesAPI.getRatedMovies(localStorage.getItem('sessionID'), currentPage);
    setRatedMovies(data);
  }, [currentPage]);

  useEffect(() => {
    if (activeTab === 'Rated') {
      fetchRatedMovies();
    }
  }, [activeTab]);
  return [ratedMovies, error];
};

export default useRatings;
