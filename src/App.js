import React, { Component } from 'react';
import Card from './components/Card';
import 'bootstrap';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: [
        {
          id: 1,
          name: 'User 1',
          tasks: [
            {
              id: 1,
              title: 'Task 1',
              description: 'Simple task description'
            },
            {
              id: 2,
              title: 'Task 2',
              description: 'Simple task description'
            },
            {
              id: 3,
              title: 'Task 3',
              description: 'Simple task description'
            },
          ]
        },
        {
          id: 2,
          name: 'User 2',
          tasks: [
            {
              id: 4,
              title: 'Task 1',
              description: 'Simple task description'
            },
            {
              id: 5,
              title: 'Task 2',
              description: 'Simple task description'
            },
            {
              id: 6,
              title: 'Task 3',
              description: 'Simple task description'
            },
            {
              id: 7,
              title: 'Task 4',
              description: 'Simple task description'
            },
          ]
        },
        {
          id: 3,
          name: 'User 3',
          tasks: [
            {
              id: 8,
              title: 'Task 1',
              description: 'Simple task description'
            },
            {
              id: 9,
              title: 'Task 2',
              description: 'Simple task description'
            },
          ]
        },
      ]
    };
  }
  
  _getUserLists() {
    return this.state.users.map((user) => {
      return (
        <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <h3>{user.name}</h3>
          {user.tasks.map((task) => {
            return <Card key={task.id} title={task.title}>{task.description}</Card>
          })}
        </div>
      );
    });
  }
  
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
          {this._getUserLists()}
        </div>
      </div>
    );
  }
}

export default App;
