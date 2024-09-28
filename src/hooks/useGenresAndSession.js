import { useState, useEffect, useCallback } from 'react';
import MoviesService from '../api/MoviesService';

const useGenresAndSession = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState({ notFound: false, fetch: false });

  const moviesAPI = new MoviesService();

  // Получаем жанры, создаем гостовую сессию и запоминаем ее session id
  const fetchGenresAndCreateSessionId = useCallback(async () => {
    try {
      const genresData = await moviesAPI.getGenres();
      setGenres(genresData);
      if (!localStorage.getItem('sessionID')) {
        const guestSessionId = await moviesAPI.createGuestSession();
        localStorage.setItem('sessionID', `${guestSessionId}`);
      }
    } catch {
      setError({ ...error, fetch: true });
    }
  }, []);

  useEffect(() => {
    fetchGenresAndCreateSessionId();
  }, [fetchGenresAndCreateSessionId]);

  return [genres, error];
};

export default useGenresAndSession;
