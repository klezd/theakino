/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { ImageBaseUri } from '../../../utils';

import styles from './styles.module.css';

const MoviePoster = ({ item, onClickPoster, whiteText }) => {
  const {
    original_title,
    title,
    original_language,
    poster_path,
    overview,
    id
  } = item;

  const desStyle = whiteText
    ? [styles.whiteText, styles.description].join(' ')
    : styles.description;
  const onClickItem = (i) => {
    if (!onClickPoster) return;
    onClickPoster(i);
  };

  return (
    <div
      className={[styles.item, styles.movie].join(' ')}
      id={`movie_poster_${original_title}_${original_language}_${id}`}
      onClick={() => onClickItem(id)}
      aria-hidden="true"
    >
      <div className={styles.img}>
        <img src={`${ImageBaseUri}/w300${poster_path}`} alt={original_title} />
      </div>
      <div className={desStyle}>
        <div className={styles.title}>{title}</div>
        <div className={styles.shortview}>{overview}</div>
        <div className={styles.button}>View more</div>
      </div>
    </div>
  );
};

MoviePoster.defaultProps = {
  onClickPoster: () => {},
  whiteText: false
};

MoviePoster.propTypes = {
  item: PropTypes.object.isRequired,
  onClickPoster: PropTypes.func,
  whiteText: PropTypes.bool
};

export default MoviePoster;
