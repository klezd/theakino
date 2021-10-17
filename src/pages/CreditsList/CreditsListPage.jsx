import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMovieInfoById } from '../../store/Movie/action';

import { PeopleTMDBUri } from '../../utils';
import styles from './CreditsListPage.module.css';

const CreditsListPage = () => {
  const { movieId } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMovieInfoById(movieId, 'credits', 'credits'));
  }, [movieId]);

  return <div className={styles.root}>The list is on updating</div>;
};

export default CreditsListPage;
