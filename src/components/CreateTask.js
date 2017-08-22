import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateTask.scss';

class CreateTask extends Component {
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
  
  render() {
    let user = this._getUser();
    return(
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil"></button>
          </div>
          <h2>Create task for {user.name}</h2>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label for="task-title">Title</label>
            <input type="text" className="form-control" name="task-title" placeholder="Enter description for the task" />
          </div>
          <div className="form-group">
            <label for="task-description">Description</label>
            <textarea type="text" className="form-control" name="task-description" placeholder="Enter description for the task" rows="8"/>
          </div>
          <div className="form-group">
            <label for="task-user">User</label>
            <select className="form-control" name="task-user" rows="8" disabled>
              <option>{user.name}</option>
            </select>
          </div>
          <button className="btn btn-primary btn-submit">Create</button>
          <button className="btn btn-secondary btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }
}

CreateTask = connect(
  (state) => {
    return {
      users: state.users
    };
  }
)(CreateTask);

export default CreateTask;