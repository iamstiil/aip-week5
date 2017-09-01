import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './Card';
import './Dashboard.scss';

/**
 * Component class for Dashboard
 */
class Dashboard extends Component {

  /**
   * get all lists of users with tasks
   */
  _getUserLists() {
    return this.props.users.map((user) => {
      return (
        <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <h3>{user.name}</h3>
          {this.props.tasks.map((task) => {
            if(user.id !== task.userid)
              return false;
            return (
              <Link key={task.id} to={`/task/${task.id}`}>
                <Card title={task.title}>{task.description}</Card>
              </Link>
            );
          })}
          <Link to={`/task/create`}>
            <button className="btn btn-primary btn-block btn-create">Create Task</button>
          </Link>
        </div>
      );
    });
  }
  
  render() {
    return (
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-magnifying-glass"></button>
            <button className="btn btn-outline-primary oi oi-list"></button>
            <button className="btn btn-outline-primary oi oi-grid-two-up"></button>
          </div>
          <h2>Dashboard</h2>
        </div>
        <div className="col-12">
          <div className="row">
            {this._getUserLists()}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Connect Redux with Component
 */
Dashboard = connect(
  (state) => {
    return {
      users: state.users,
      tasks: state.tasks,
    };
  },
)(Dashboard)

export default Dashboard;
