import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './pages/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
