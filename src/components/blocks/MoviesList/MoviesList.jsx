import PropTypes from 'prop-types';
import MovieCard from '../../parts/MovieCard/MovieCard';
import classes from './MoviesList.module.css';
import { Spin, Alert } from 'antd';
import { useCallback } from 'react';

export default function MoviesList({ movies, genres, isLoading, error }) {
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
      <Spin spinning={isLoading} fullscreen={isLoading} size="large">
        <section className={classes.movies}>
          {movies.map((movie) => (
            <MovieCard
              {...movie}
              isLoading={isLoading}
              key={movie.id}
              genres={cbGenreNames(movie, genres)}
            />
          ))}
        </section>
      </Spin>
      {/* <List
        dataSource={movies}
        grid={{ gutter: [36, 36], column: 2, xs: 0.5 }}
        size="small"
        loading={isloading}
        renderItem={(movie) => <MovieCard {...movie} key={movie.id} />}
      /> */}
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};
