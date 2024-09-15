import trancateText from '../../../helpers/trancateText';
import classes from './MovieCard.module.css';
import { Flex, Rate } from 'antd';
import noIcon from '/img/no_icon.png';
import PropTypes from 'prop-types';

export default function MovieCard({
  title,
  poster_path: posterPath,
  overview,
  vote_average: voteAverage,
}) {
  return (
    <>
      <div className={classes.card}>
        {posterPath && (
          <img
            className={classes.card__img}
            src={`https://image.tmdb.org/t/p/original${posterPath}`}
            alt={`${title} poster`}
          />
        )}
        {!posterPath && <img className={classes.card__img} src={noIcon} alt={`no poster`} />}
        <div className={classes.card__content}>
          <h3 className={classes.card__title}>{title}</h3>
          <p className={classes.card__date}>March 5, 2020 </p>
          <Flex gap="small">
            <a className={classes.card__genre} href="#">
              Action
            </a>
            <a className={classes.card__genre} href="#">
              Drama
            </a>
          </Flex>
          <p className={classes.card__overview}>{trancateText(overview)}</p>
          <Rate
            count={10}
            defaultValue={voteAverage}
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
};
