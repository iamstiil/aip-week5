/**
 * Import dependencies
 */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import CustomPropTypes from '../utils/custom-prop-types';

/**
 * Component class displaying a single task
 */
class Task extends Component {
  /**
   * Get user for current path
   */
  getUser(userid) {
    const userArray = this.props.users.filter((user) => {
      if (userid === user.id) {
        return true;
      }
      return false;
    });

    let user = null;
    if (userArray.length === 1) {
      user = userArray[0];
    }
    return user;
  }

  /**
   * Get task for current path using the passed user
   */
  getTask() {
    const taskArray = this.props.tasks.filter((task) => {
      if (parseInt(this.props.match.params.taskid, 10) === task.id) {
        return true;
      }
      return false;
    });

    let task = null;
    if (taskArray.length === 1) {
      task = taskArray[0];
    }
    return task;
  }

  render() {
    const task = this.getTask();
    if (task === null) {
      return false;
    }
    const user = this.getUser(task.userid);

    return (
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil" />
          </div>
          <h2>{task.title}<span> assigned to {user.name}</span></h2>
        </div>
        <div className="col-12">{task.description}</div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
Task.propTypes = {
  users: CustomPropTypes.users.isRequired,
  tasks: CustomPropTypes.tasks.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    users: state.users,
    tasks: state.tasks,
  }),
)(Task);
