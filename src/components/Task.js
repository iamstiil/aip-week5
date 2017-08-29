import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Component class displaying a single task
 */
class Task extends Component {
  /**
   * Get user for current path
   */
  _getUser() {
    let userArray = this.props.users.filter((user) => {
      if(this.props.match.params.userid == user.id){
        return true;
      }
      return false;
    });
    
    let user = null;
    if(userArray.length === 1)
      user = userArray[0];
    return user;
  }
  
  /**
   * Get task for current path using the passed user
   */
  _getTask(user) {
    let taskArray = user.tasks.filter((task) => {
      if(this.props.match.params.taskid == task.id){
        return true;
      }
      return false;
    });
    
    let task = null;
    if(taskArray.length === 1)
      task = taskArray[0];
    return task;
  }
  
  render() {
    let user = this._getUser();
    let task = this._getTask(user);
    return (
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil"></button>
          </div>
          <h2>{task.title}<span> assigned to {user.name}</span></h2>
        </div>
        <div className="col-12">{task.description}</div>
      </div>
    );
  }
}

/**
 * Connect Redux with Component
 */
Task = connect(
  (state) => {
    return {
      users: state.users
    }
  }
)(Task);

export default Task;
