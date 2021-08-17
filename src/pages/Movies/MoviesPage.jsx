/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getMovieInfoById, getMoviesBySet } from '../../store/Movie/action';
import { ImageBaseUri } from '../../utils';
import { formatDate } from '../../utils/time';

import theme from '../../utils/theme';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const { set, movieInfo } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const id = movieInfo && movieInfo.split('-')[0];
  const movieName =
    movieInfo &&
    movieInfo.split('-')[1] &&
    movieInfo.split('-')[1].replaceAll('_', ' ');

  React.useEffect(() => {
    if (set === 'recommendations' && id) {
      dispatch(getMovieInfoById(id, set, set));
    } else {
      dispatch(getMoviesBySet(set));
    }
  }, [set, id]);

  const movieRecommendations =
    set === 'recommendations' &&
    id &&
    useSelector((s) => s.movie.currentMovie[id]);
  const moviesSet =
    set !== 'recommendations' && useSelector((s) => s.movie.movies);
  const movies =
    set === 'recommendations' && movieRecommendations
      ? movieRecommendations.recommendations
      : moviesSet && moviesSet[set];

  let list;
  if (movies && Object.keys(movies).length !== 0) {
    if (set === 'recommendations') {
      list = movies.results;
    } else {
      list = movies.data ? movies.data.results : [];
    }
    console.log(list);
  } else {
    list = [];
  }

  const onOpenMovie = (i) => {
    history.push(`/movie/${i}`);
  };

  return (
    <div
      className={styles.root}
      style={{ color: theme.palette.primary.contrastText }}
    >
      <div className={styles.pageTitle}>
        {set === 'recommendations' && movieName ? (
          <>{`Recommendations for  ${movieName}`}</>
        ) : (
          <>{set.replaceAll('_', ' ')}</>
        )}
      </div>
      <div className={styles.pageContainer}>
        {list.map((movie, index) => {
          const {
            original_title,
            title,
            original_language,
            poster_path,
            overview,
            release_date
          } = movie;

          return (
            <div
              key={`movie_${index.toString()}_${movie.id}`}
              className={styles.movieItem}
              // onClick={() => onOpenMovie(movie.id)}
              // aira-hidden
            >
              <div className={styles.poster}>
                <img
                  src={`${ImageBaseUri}/w300${poster_path}`}
                  alt={original_title}
                />
              </div>
              <div className={styles.details}>
                <div className={styles.content}>
                  <span className={styles.title}>{title}</span>
                  <span>{formatDate(release_date)}</span>
                  <div className={styles.overview}>
                    <>{overview.slice(0, 600)}</>
                    {overview.length > 600 && (
                      <span
                        onClick={() => {
                          onOpenMovie(movie.id);
                        }}
                        aria-hidden
                      >
                        ...
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.action}>
                  <div
                    className={styles.button}
                    aria-hidden
                    onClick={() => {
                      onOpenMovie(movie.id);
                    }}
                  >
                    View More &gt;&gt;
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
MoviesPage.defaultProps = {};

MoviesPage.propTypes = {};

export default MoviesPage;
