import React, { Component } from 'react';
import 'bootstrap';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Homize</a>
          </nav>
        </div>
        <div className="row content-wrapper">
          <div className="col-12">
            <h1>Dashboard</h1>
            <span className="oi oi-magnifying-glass"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
