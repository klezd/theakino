import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Dashboard from '../Dashboard';
import MovieDetail from '../MovieDetail';
import styles from './MainPage.module.css';

const MainPage = (props) => (
  <div className={styles.root}>
    <div className={styles.header}>Header</div>

    <div className={styles.container}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/movie/:id" exact component={MovieDetail} />
        <Route component={Error} />
      </Switch>
    </div>
    <div className={styles.footer}>Footer</div>
  </div>
);

MainPage.defaultProps = {};

MainPage.propTypes = {};

export default MainPage;
