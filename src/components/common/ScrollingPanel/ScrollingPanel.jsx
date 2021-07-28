/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';
import Loading from '../Loading/Loading';
import MoviePoster from './MoviePoster';
import TVPoster from './TVPoster';
import CastList from './CastList';

const ScrollingPanel = ({
  items,
  loading,
  autoScroll,
  onClickItem,
  onClickExtra,
  type,
  withViewMore,
  showItems,
  whiteText,
  viewAllAsBtn
}) => {
  const rootStyle = !autoScroll
    ? [styles.root, styles.manualScrollRoot].join(' ')
    : styles.root;
  const extraItem =
    type === 'movie'
      ? [styles.item, styles.movie, styles.extra].join(' ')
      : [styles.item, styles.cast, styles.extra].join(' ');

  let displayItems = [];
  if (items) {
    displayItems = items.slice(0, showItems);
  }

  if (items) {
    return (
      <div className={rootStyle}>
        {autoScroll && (
          <>
            <div className={styles.leftindicator}>
              <FontAwesomeIcon icon="angle-left" />
            </div>
            <div className={styles.rightindicator}>
              <FontAwesomeIcon icon="angle-right" />
            </div>
          </>
        )}
        <div className={styles.banner}>
          {type === 'movie' &&
            displayItems.length > 0 &&
            displayItems.map((i) => {
              const { original_title, original_language, id } = i;

              return (
                <MoviePoster
                  key={`movie_poster_${original_title}_${original_language}_${id}`}
                  onClickPoster={() => onClickItem(id)}
                  aria-hidden="true"
                  item={i}
                  whiteText={whiteText}
                />
              );
            })}
          {type === 'tv' &&
            displayItems.length > 0 &&
            displayItems.map((i) => {
              const { original_title, original_language, id } = i;

              return (
                <TVPoster
                  key={`tv_poster_${original_title}_${original_language}_${id}`}
                  onClickPoster={() => onClickItem(id)}
                  aria-hidden="true"
                  item={i}
                  whiteText={whiteText}
                />
              );
            })}
          {type === 'people' &&
            displayItems.length > 0 &&
            displayItems.map((i) => {
              const { original_name, id } = i;

              return (
                <CastList
                  key={`people_${original_name}_${id}`}
                  onClickPeople={() => onClickItem(id)}
                  aria-hidden="true"
                  item={i}
                  whiteText={whiteText}
                />
              );
            })}
          {withViewMore && onClickExtra && !viewAllAsBtn && (
            <div
              className={extraItem}
              aria-hidden
              onClick={() => onClickExtra()}
            >
              <div>
                <FontAwesomeIcon icon="arrow-right" />
                <span>View all</span>
              </div>
            </div>
          )}
        </div>
        {viewAllAsBtn && (
          <div
            className={styles.bottomBtn}
            aria-hidden
            onClick={() => onClickExtra()}
          >
            View All
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Loading />
    </div>
  );
};

ScrollingPanel.defaultProps = {
  items: [],
  loading: true,
  onClickItem: () => {},
  onClickExtra: () => {},
  autoScroll: true,
  withViewMore: false,
  type: 'movie',
  showItems: 5,
  whiteText: false,
  viewAllAsBtn: false
};

ScrollingPanel.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  onClickItem: PropTypes.func,
  onClickExtra: PropTypes.func,
  autoScroll: PropTypes.bool,
  withViewMore: PropTypes.bool,
  type: PropTypes.oneOf(['movie', 'people', 'tv']),
  showItems: PropTypes.number,
  whiteText: PropTypes.bool,
  viewAllAsBtn: PropTypes.bool
};

export default ScrollingPanel;
