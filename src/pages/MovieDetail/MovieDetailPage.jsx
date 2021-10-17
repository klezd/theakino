/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getMovieById } from '../../store/Movie/action';

import Loading from '../../components/common/Loading/Loading';
import ScrollingPanel from '../../components/common/ScrollingPanel/ScrollingPanel';

import theme from '../../utils/theme';

import styles from './MovieDetailPage.module.css';
import Reviews from '../../components/Reviews';
import Credits from '../../components/CreditsList';
import VideosList from '../../components/VideosList/VideosList';
import HeadingPart from '../../components/HeadingPart/HeadingPart';

const MovieDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const movie = useSelector((s) => s.movie.currentMovie);
  const error = useSelector((s) => s.movie.error);

  const openExtraMovie = (name) => {
    console.log('open full list of movies');
    history.push(`/movies/recommendations/${id}-${name.replaceAll(' ', '_')}`);
  };

  const openMovie = (i) => history.push(`/movie/${i}`);

  const openPeople = (i) => history.push(`/people/${i}`);

  const onViewAllReviews = (i, title) => {
    history.push(`/movie/${i}/${title}/reviews`);
  };

  const onViewAllCredits = (i, title) =>
    alert('Credits List is not available at this time');
  // history.push(`/movie/${i}/${title}/credits`);

  React.useEffect(() => {
    dispatch(getMovieById(id));
  }, [id]);

  if (error) {
    return <div className={styles.root}>{error}</div>;
  }
  if (movie && movie[id] && movie[id].data) {
    const {
      data,
      trailers,
      recommendations,
      loading,
      providers,
      credits,
      reviews
    } = movie[id];

    const { title } = data;

    let reviewsList = [];
    reviewsList = reviews && reviews.results.length !== 0 && reviews.results;

    return (
      <div
        className={styles.container}
        style={{ color: theme.palette.primary.contrastText }}
      >
        {data && <HeadingPart item={data} />}

        {credits && credits.cast && (
          <Credits
            itemsList={credits.cast}
            loading={loading}
            clickItem={openPeople}
            title="Cast"
            clickExtra={() => onViewAllCredits(id, title)}
          />
        )}
        {trailers && trailers.results && (
          <VideosList videos={trailers.results} title="Trailer and Videos" />
        )}
        {reviewsList && (
          <Reviews
            reviewsList={reviewsList}
            title={title}
            display={1}
            viewAll={() => onViewAllReviews(id, title)}
          />
        )}
        {recommendations && recommendations.results && (
          <div className={styles.recommendations}>
            <span className={styles.main}>Recommendations</span>
            <div>
              <ScrollingPanel
                items={recommendations.results}
                loading={loading}
                showItems={5}
                onClickItem={(i) => openMovie(i)}
                onClickExtra={() => openExtraMovie(title)}
                autoScroll={false}
                type="movie"
                whiteText
                withViewMore
              />
            </div>
          </div>
        )}
        {providers && (
          <div className={styles.price}>
            <span className={styles.main}>Where to watch?</span>
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

MovieDetailPage.defaultProps = {};

MovieDetailPage.propTypes = {};

export default MovieDetailPage;
