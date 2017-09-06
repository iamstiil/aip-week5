import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap';
import './App.scss';

import Dashboard from './components/Dashboard';
import Task from './components/Task';
import CreateTask from './components/CreateTask';


/**
 * Component class for routing
 */
const App = () => (
  <Router>
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to={'/'}>Homize</Link>
        </nav>
      </div>
      <Route exact path={'/'} component={Dashboard} />
      <Route exact path={'/task/create'} component={CreateTask} />
      <Route exact path={'/task/:taskid(\\d+)'} component={Task} />
    </div>
  </Router>
);

export default App;
