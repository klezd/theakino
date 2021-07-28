import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TabContext from '@material-ui/lab/TabContext';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';

import { getMoviesAllSet } from '../../store/Movie/action';
import ScrollingPanel from '../../components/common/ScrollingPanel/ScrollingPanel';
import styles from './DashboardPage.module.css';

const DashboardPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieState = useSelector((s) => s.movie.movies);
  const [tab, setTab] = React.useState(0);
  React.useEffect(() => {
    dispatch(getMoviesAllSet());
  }, []);

  const handleChange = (e, tabIndex) => {
    setTab(tabIndex);
  };

  const openMovie = (id) => {
    history.push(`/movie/${id}`);
  };

  const openMoviesSet = (set) => {
    history.push(`/movies/${set}`);
  };

  return (
    <div className={styles.root}>
      <div className={[styles.section, styles.movie]}>
        <div className={styles.title}>Feature Movies</div>
        <TabContext value={tab}>
          <Paper elevation={3}>
            <Tabs
              value={tab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Now Playing" />
              <Tab label="Upcoming" />
            </Tabs>
            <TabPanel value={0}>
              {movieState && movieState.now_playing && (
                <ScrollingPanel
                  items={movieState.now_playing.data.results}
                  loading={movieState.now_playing.loading}
                  onClickItem={openMovie}
                  showItems={10}
                  withViewMore
                  onClickExtra={() => openMoviesSet('now_playing')}
                />
              )}
            </TabPanel>
            <TabPanel value={1}>
              {movieState && movieState.upcoming && (
                <ScrollingPanel
                  items={movieState.upcoming.data.results}
                  loading={movieState.upcoming.loading}
                  onClickItem={openMovie}
                  showItems={10}
                  withViewMore
                  onClickExtra={() => openMoviesSet('upcoming')}
                />
              )}
            </TabPanel>
          </Paper>
        </TabContext>
      </div>
    </div>
  );
};

DashboardPage.defaultProps = {};

DashboardPage.propTypes = {};

export default DashboardPage;
