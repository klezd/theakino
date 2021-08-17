/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getMovieById } from '../../store/Movie/action';

import Loading from '../../components/common/Loading/Loading';
import ScrollingPanel from '../../components/common/ScrollingPanel/ScrollingPanel';

import theme from '../../utils/theme';

import styles from './DetailPage.module.css';
import Reviews from '../../components/Reviews';
import Credits from '../../components/CreditsList';
import VideosList from '../../components/VideosList/VideosList';
import HeadingPart from '../../components/HeadingPart/HeadingPart';
import { getTVShowById } from '../../store/TvShows/action';

const DetailPage = () => {
  const { id, media } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const item =
    media === 'movie'
      ? useSelector((s) => s.movie.currentMovie)
      : useSelector((s) => s.tv.currentShow);
  const error =
    media === 'movie'
      ? useSelector((s) => s.movie.error)
      : useSelector((s) => s.tv.error);

  const openAllItems = (name) => {
    console.log('open full list');
    if (media === 'movie') {
      history.push(
        `/movies/recommendations/${id}-${name.replaceAll(' ', '_')}`
      );
    } else {
      history.push(`/TVs/recommendations/${id}-${name.replaceAll(' ', '_')}`);
    }
  };

  const openItem = (i) => {
    if (media === 'movie') {
      history.push(`/movie/${i}`);
    } else {
      history.push(`/TV/${i}`);
    }
  };

  const openPeople = (i) => history.push(`/people/${i}`);

  const onViewAllReviews = (i, title) => {
    if (media === 'movie') {
      history.push(`/movie/${i}/${title}/reviews`);
    } else {
      history.push(`/TV/${i}/${title}/reviews`);
    }
  };
  const onViewAllCredits = (i, title) => {
    if (media === 'movie') {
      history.push(`/movie/${i}/${title}/credits`);
    } else {
      history.push(`/TV/${i}/${title}/credits`);
    }
  };

  console.count(media);
  console.log(item);
  React.useEffect(() => {
    console.count('detail page');
    if (media.toLowerCase().includes('movie')) dispatch(getMovieById(id));
    else dispatch(getTVShowById(id));
  }, [id]);

  if (error) {
    return <div className={styles.root}>{error}</div>;
  }
  if (item && item[id] && item[id].data) {
    const {
      data,
      trailers,
      recommendations,
      loading,
      providers,
      credits,
      reviews
    } = item[id];

    const { title, name } = data;

    let reviewsList = [];
    reviewsList = reviews && reviews.results.length !== 0 && reviews.results;

    return (
      <div
        className={styles.container}
        style={{ color: theme.palette.primary.contrastText }}
      >
        {data && <HeadingPart item={data} media={media.toLowerCase()} />}

        {credits && credits.cast && (
          <Credits
            itemsList={credits.cast}
            loading={loading}
            clickItem={openPeople}
            title="Cast"
            clickExtra={() => {
              if (media.toLowerCase().includes('movie')) {
                onViewAllCredits(id, title);
              } else {
                onViewAllCredits(id, name);
              }
            }}
          />
        )}
        {trailers && trailers.results && (
          <VideosList videos={trailers.results} title="Trailer and Videos" />
        )}
        {reviewsList && (
          <Reviews
            reviewsList={reviewsList}
            title={media === 'movie' ? title : name}
            display={1}
            viewAll={() => {
              if (media.toLowerCase().includes('movie')) {
                onViewAllReviews(id, title);
              } else {
                onViewAllReviews(id, name);
              }
            }}
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
                onClickItem={(i) => openItem(i)}
                onClickExtra={() => {
                  if (media.toLowerCase().includes('movie')) {
                    openAllItems(title);
                  } else {
                    openAllItems(name);
                  }
                }}
                autoScroll={false}
                type={media.toLowerCase()}
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

DetailPage.defaultProps = {};

DetailPage.propTypes = {};

export default DetailPage;
