/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { ImageBaseUri } from '../../../utils';

import styles from './styles.module.css';

const TVPoster = ({ item, onClickPoster, whiteText }) => {
  const { original_name, name, original_language, poster_path, overview, id } =
    item;

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
      id={`movie_poster_${original_name}_${original_language}_${id}`}
      onClick={() => onClickItem(id)}
      aria-hidden="true"
    >
      <div className={styles.img}>
        <img src={`${ImageBaseUri}/w300${poster_path}`} alt={original_name} />
      </div>
      <div className={desStyle}>
        <div className={styles.title}>{name}</div>
        <div className={styles.shortview}>{overview}</div>
        <div className={styles.button}>View more</div>
      </div>
    </div>
  );
};

TVPoster.defaultProps = {
  onClickPoster: () => {},
  whiteText: false
};

TVPoster.propTypes = {
  item: PropTypes.object.isRequired,
  onClickPoster: PropTypes.func,
  whiteText: PropTypes.bool
};

export default TVPoster;
