import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getTVShowById } from '../../store/TvShows/action';

import Loading from '../../components/common/Loading/Loading';
import ScrollingPanel from '../../components/common/ScrollingPanel/ScrollingPanel';

import theme from '../../utils/theme';

import styles from './ShowDetailPage.module.css';
import Reviews from '../../components/Reviews';
import Credits from '../../components/CreditsList';
import VideosList from '../../components/VideosList/VideosList';
import HeadingPart from '../../components/HeadingPart/HeadingPart';

const ShowDetailPage = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const show = useSelector((s) => s.tv.currentShow);
  const error = useSelector((s) => s.tv.error);

  React.useEffect(() => {
    console.count(id);
    dispatch(getTVShowById(id));
  }, [id]);

  return <div className={styles.root}>ShowDetailPage</div>;
};
ShowDetailPage.defaultProps = {};

ShowDetailPage.propTypes = {};

export default ShowDetailPage;
