import trancateText from '../../../utils/trancateText';
import classes from './MovieCard.module.css';
import { Flex, Rate } from 'antd';
import noIcon from '/img/no_icon.png';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { Spin } from 'antd';

export default function MovieCard({
  title,
  poster_path: posterPath,
  overview,
  vote_average: voteAverage,
  release_date: releaseDate,
  genres,
  isLoading,
}) {
  const voteNumber = voteAverage.toFixed(1);
  function colorRate(voteNumber) {
    if (voteNumber < 3) return classes['card__rate_color-from-0-to-3'];
    else if (voteNumber >= 3 && voteNumber < 5) return classes['card__rate_color-from-3-to-5'];
    else if (voteNumber >= 5 && voteNumber < 7) return classes['card__rate_color-from-5-to-7'];
    else return classes['card__rate_color-from-7-to-10'];
  }

  return (
    <>
      <div className={classes.card}>
        {posterPath && (
          <Spin spinning={isLoading} size="large">
            <img
              className={classes.card__img}
              src={`https://image.tmdb.org/t/p/original${posterPath}`}
              alt={`${title} poster`}
            />
          </Spin>
        )}
        {!posterPath && <img className={classes.card__img} src={noIcon} alt={`no poster`} />}
        <p className={`${classes.card__rate} ${colorRate(voteNumber)}`}>{voteNumber}</p>
        <div className={classes.card__content}>
          <h3 className={classes.card__title}>{title}</h3>
          <p className={classes.card__date}>
            {releaseDate
              ? format(parseISO(releaseDate), 'MMMM d, yyyy')
              : 'The release is expected'}
          </p>
          <Flex gap="small" wrap>
            {genres.length > 0 &&
              genres.map((genre) => (
                <a key={genre} className={classes.card__genre} href="#">
                  {genre}
                </a>
              ))}
            {genres.length === 0 && (
              <a key={Date.now()} className={classes.card__genre} href="#">
                No data
              </a>
            )}
          </Flex>
          <p className={classes.card__overview}>{trancateText(overview)}</p>
          <Rate
            count={10}
            // Добавить стейт для рейтинга
            defaultValue={0}
            allowHalf={true}
            allowClear={false}
            style={{ fontSize: '15px', alignSelf: 'flex-end' }}
          />
        </div>
      </div>
    </>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  overview: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  release_date: PropTypes.string.isRequired,
  genres: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};
