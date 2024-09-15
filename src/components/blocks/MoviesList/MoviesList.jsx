import { List } from 'antd';
import PropTypes from 'prop-types';
import MovieCard from '../../parts/MovieCard/MovieCard';

export default function MoviesList({ movies, isloading }) {
  return (
    <>
      <List
        dataSource={movies}
        grid={{ gutter: [36, 36], column: 2, xs: 0.5 }}
        size="small"
        loading={isloading}
        renderItem={(movie) => <MovieCard {...movie} key={movie.id} />}
      />
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array,
  isloading: PropTypes.bool.isRequired,
};
