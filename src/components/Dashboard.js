import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './Card';

class Dashboard extends Component {
  
  _getUserLists() {
    return this.props.users.map((user) => {
      return (
        <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <h3>{user.name}</h3>
          {user.tasks.map((task) => {
            return <Link key={task.id} to={`/user/${user.id}/task/${task.id}`}><Card title={task.title}>{task.description}</Card></Link>
          })}
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

Dashboard = connect(
  (state) => {
    return {
      users: state.users
    };
  },
)(Dashboard)

export default Dashboard;
