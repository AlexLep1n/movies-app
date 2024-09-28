import PropTypes from 'prop-types';
import MovieCard from '../../parts/MovieCard/MovieCard';
import classes from './MoviesList.module.css';
import { Spin, Alert, Pagination } from 'antd';
import { useCallback, useContext } from 'react';
import { GenresContext } from '../../../context';

export default function MoviesList({ movies, isLoading, error, currentPage, setCurrentPage }) {
  const { genres } = useContext(GenresContext);

  const cbGenreNames = useCallback((movie, genres) => {
    return genres
      .map((genre) => (movie.genre_ids.includes(genre.id) ? genre.name : ''))
      .filter((item) => item);
  }, []);

  return (
    <>
      {error.fetch && (
        <Alert
          message="Error!"
          description=" The data is not being retrieved"
          type="error"
          showIcon
        />
      )}
      {error.notFound && !isLoading && (
        <Alert
          message="Внимание!"
          description="По данному запросу фильмы не найдены!"
          type="info"
          showIcon
        />
      )}
      <Spin spinning={isLoading} tip="Loading" size="large">
        <section>
          <div className={classes.movies}>
            {movies.map((movie) => (
              <MovieCard
                {...movie}
                isLoading={isLoading}
                key={movie.id}
                genres={cbGenreNames(movie, genres)}
              />
            ))}
          </div>
          {movies.length > 0 && (
            <Pagination
              align="center"
              current={currentPage}
              pageSize={20}
              total={200}
              showSizeChanger={false}
              onChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          )}
        </section>
      </Spin>
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
