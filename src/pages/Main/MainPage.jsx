import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dashboard from '../Dashboard';
import MovieDetail from '../MovieDetail';
import Movies from '../Movies';
import ShowDetail from '../ShowDetail';
import Detail from '../Detail';
import TVs from '../TVs';
import Credits from '../CreditsList';
import Review from '../Review';
import Error from '../Error';

import styles from './MainPage.module.css';

import theme from '../../utils/theme';

const today = new Date();
const MainPage = () => {
  const history = useHistory();
  const onClickMenuBtn = () => {};
  const onClickHome = () => {
    history.push('/');
  };
  return (
    <div
      className={styles.root}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div
        className={styles.header}
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <div className={styles.leftHeader}>
          <div
            className={styles.headerBtn}
            onClick={() => onClickMenuBtn()}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon="bars" />
          </div>
          <div
            className={styles.logo}
            onClick={() => onClickHome()}
            aria-hidden
          >
            TheaKino
          </div>
        </div>
        <div className={styles.rightHeader}>User</div>
      </div>

      <div className={styles.container}>
        <Switch>
          {/* TODO Rewrite routing and components */}
          <Route path="/" exact component={Dashboard} />
          <Route path="/movie/:id" exact component={MovieDetail} />
          {/* <Route path="/TV/:id" exact component={ShowDetail} /> */}
          <Route path="/:media/:id" exact component={Detail} />
          <Route path="/movies/:set" exact component={Movies} />
          <Route path="/TVs/:set" exact component={TVs} />
          <Route path="/movies/:set/:movieInfo" exact component={Movies} />
          <Route path="/TVs/:set/:TVInfo" exact component={TVs} />
          <Route
            path="/movie/:movieId/:title/credits"
            exact
            component={Credits}
          />
          <Route
            path="/movie/:movieId/:title/reviews"
            exact
            component={Review}
          />
          <Route component={Error} />
        </Switch>
      </div>
      <div className={styles.footer}>
        Theakino &nbsp;
        <FontAwesomeIcon icon="copyright" />
        &nbsp;
        {today.getFullYear()}
      </div>
    </div>
  );
};

// MainPage.defaultProps = {};

// MainPage.propTypes = {};

export default MainPage;
