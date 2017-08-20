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
            <div className="view-menu float-right">
              <button className="btn btn-outline-primary oi oi-magnifying-glass"></button>
              <button className="btn btn-outline-primary oi oi-list"></button>
              <button className="btn btn-outline-primary oi oi-grid-two-up"></button>
            </div>
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <h3>User 1</h3>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 1</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 2</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 3</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <button className="btn btn-primary btn-block">Create Task</button>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <h3>User 2</h3>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 1</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 2</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 3</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 4</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <button className="btn btn-primary btn-block">Create Task</button>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <h3>User 3</h3>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 1</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">Task 2</h4>
                <p className="card-text">Simple task description</p>
              </div>
            </div>
            <button className="btn btn-primary btn-block">Create Task</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
