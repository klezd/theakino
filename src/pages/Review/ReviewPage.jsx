import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Reviews from '../../components/Reviews';
import { getMovieInfoById } from '../../store/Movie/action';
import styles from './ReviewPage.module.css';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieId, title } = useParams();

  React.useEffect(() => {
    dispatch(getMovieInfoById(movieId, 'reviews', 'reviews'));
  }, [movieId]);

  const openMovie = () => {
    history.push(`/movie/${movieId}`);
  };

  const movie = useSelector((s) => s.movie.currentMovie[movieId]);
  const reviewList = movie && movie.reviews;
  return (
    <div className={styles.root}>
      {reviewList && (
        <Reviews
          reviewsList={reviewList.results}
          title={title}
          display={0}
          displayViewAll={false}
          whiteText={false}
          viewLongText
        />
      )}

      <div className={styles.movie} onClick={openMovie} aria-hidden>
        View Movie Detail
      </div>
    </div>
  );
};
ReviewPage.defaultProps = {};

ReviewPage.propTypes = {};

export default ReviewPage;
