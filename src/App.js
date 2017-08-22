import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import CreateTask from './components/CreateTask';
import 'bootstrap';
import './App.scss';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to={`/`}>Homize</Link>
            </nav>
          </div>
          <Route exact={true} path={`/`} component={Dashboard}/>
          <Route exact={true} path={`/user/:userid/task/create`} component={CreateTask} />
          <Route exact={true} path={`/user/:userid/task/:taskid(\\d+)`} component={Task} />
        </div>
      </Router>
    );
  }
}

export default App;
