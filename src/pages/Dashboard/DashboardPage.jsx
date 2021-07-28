import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { getMoviesAllSet } from '../../store/Movie/action';
import { getTVAllSet } from '../../store/TvShows/action';

import styles from './DashboardPage.module.css';
import ItemCollections from '../../components/ItemCollections/ItemCollections';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieState = useSelector((s) => s.movie.movies);
  const TVState = useSelector((s) => s.tv.allShows);
  const [movieList, setMovieList] = React.useState([]);
  const [TVList, setTVList] = React.useState([]);

  React.useEffect(() => {
    dispatch(getMoviesAllSet());
    dispatch(getTVAllSet());
  }, []);

  React.useEffect(() => {
    if (Object.keys(movieState).length === 3) {
      const list = [];

      Object.keys(movieState).map((key) => {
        const movieSet = movieState[key];
        if (movieSet) {
          return list.push({
            set: key,
            data: movieSet.data.results,
            loading: movieSet.loading
          });
        }
        return null;
      });
      setMovieList(list);
    }
  }, [movieState]);

  React.useEffect(() => {
    if (Object.keys(TVState).length === 3) {
      const list = [];

      Object.keys(TVState).map((key) => {
        const TVSet = TVState[key];
        if (TVSet) {
          return list.push({
            set: key,
            data: TVSet.data.results,
            loading: TVSet.loading
          });
        }
        return null;
      });
      setTVList(list);
    }
  }, [TVState]);

  const openMovie = (id) => {
    history.push(`/movie/${id}`);
  };

  const openTV = (id) => {
    history.push(`/TV/${id}`);
  };

  const openMoviesSet = (set) => {
    history.push(`/movies/${set}`);
  };
  const openTVSet = (set) => {
    history.push(`/TVs/${set}`);
  };

  return (
    <div className={styles.root}>
      <div className={[styles.section, styles.movie]}>
        <div className={styles.title}>Feature Movies</div>
        <ItemCollections
          collections={movieList}
          onClickItem={openMovie}
          onClickOpenAll={openMoviesSet}
        />
      </div>
      <div className={[styles.section, styles.tv]}>
        <div className={styles.title}>Feature TV Shows</div>
        <ItemCollections
          collections={TVList}
          onClickItem={openTV}
          onClickOpenAll={openTVSet}
          type="tv"
        />
      </div>
    </div>
  );
};

DashboardPage.defaultProps = {};

DashboardPage.propTypes = {};

export default DashboardPage;
