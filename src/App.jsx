import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
  fas,
  faHome,
  faUser,
  faTimes,
  faSignOutAlt,
  faHeart,
  faBars,
  faAngleRight,
  faAngleLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

import MainPage from './pages/Main';
import './App.css';
import theme from './utils/theme';

library.add(
  fab,
  fas,
  far,
  faGoogle,
  faFacebookF,
  faHome,
  faUser,
  faTimes,
  faSignOutAlt,
  faHeart,
  faBars,
  faAngleRight,
  faAngleLeft,
  faArrowRight
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={MainPage} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
