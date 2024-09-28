import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import MoviesService from '../../api/MoviesService';
import { useState, useEffect, useCallback } from 'react';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
import debounce from 'lodash.debounce';
// import Tabs from '../../components/parts/Tabs/Tabs';
import { Flex, Tabs } from 'antd';
import { GenresContext, PostDataContext } from '../../context';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ notFound: false, fetch: false });
  const [inputData, setInputData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Search');
  const [postData, setPostData] = useState({
    movieId: null,
    rating: 0,
  });
  const [ratedMovies, setRatedMovies] = useState([]);

  const moviesAPI = new MoviesService();

  // Обернули ф-цию загрузки фильмов в debounce и закешировали ее
  const debouncedFetchMovies = useCallback(
    debounce(async (movieName, pageNumber) => {
      // console.log('Call debounce');
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

  // Получаем жанры

  // Получаем жанры и создаем гостовую сессию и запоминаем ее session id
  useEffect(() => {
    const fetchGenresAndSessionId = async () => {
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
    };

    fetchGenresAndSessionId();
  }, []);

  // Отправляем POST запрос при оценки фильма (Работает)
  useEffect(() => {
    try {
      if (postData.movieId) {
        moviesAPI
          .rateMovie(localStorage.getItem('sessionID'), postData.movieId, postData.rating)
          .then((data) => console.log(data.status_message));
      }
    } catch {
      setError({ ...error, fetch: true });
    }
  }, [postData]);

  // Получаем оцененные фильмы
  useEffect(() => {
    moviesAPI
      .getRatedMovies(localStorage.getItem('sessionID'), currentPage)
      .then((data) => setRatedMovies(data));
  }, [activeTab, currentPage]);

  return (
    <>
      <GenresContext.Provider value={{ genres }}>
        <PostDataContext.Provider
          value={{
            postData,
            setPostData,
          }}
        >
          <div className={classes.container}>
            <Flex align="center" vertical="true">
              <Tabs
                onChange={(key) => setActiveTab(key)}
                activeKey={activeTab}
                destroyInactiveTabPane={true}
                items={[
                  {
                    key: 'Search',
                    label: 'Search',
                  },
                  {
                    key: 'Rated',
                    label: 'Rated',
                  },
                ]}
              />
              {/* <Tabs active={true} /> */}
              {activeTab === 'Search' && (
                <CustomInput
                  type="text"
                  placeholder="Type to search..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
              )}
              <MoviesList
                movies={activeTab === 'Search' ? movies : ratedMovies}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </Flex>
          </div>
        </PostDataContext.Provider>
      </GenresContext.Provider>
    </>
  );
}
