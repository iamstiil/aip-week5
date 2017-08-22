import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions';
import './CreateTask.scss';

/**
 * Component class displaying task creation form
 */
class CreateTask extends Component {
  /**
   * Constructor 
   */
  constructor(props) {
    super(props);
    
    let user = this._getUser();
    
    this.state = {
      task: {
        title: '',
        description: '',
        user: user.id
      }
    };
  }
  
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
   * Handle title change in form
   */
  _handleTitleChange(event){
    this.setState({
      task: {
        ... this.state.task,
        title: event.target.value
      }
    });
  }
  
  /**
   * Handle description change in form
   */
  _handleDescriptionChange(event){
    this.setState({
      task: {
        ... this.state.task,
        description: event.target.value
      }
    });
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
            <label htmlFor="task-title">Title</label>
            <input
              type="text"
              className="form-control"
              name="task-title"
              placeholder="Enter description for the task"
              onChange={this._handleTitleChange.bind(this)}
              value={this.state.task.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              type="text"
              className="form-control"
              name="task-description"
              placeholder="Enter description for the task"
              rows="8"
              onChange={this._handleDescriptionChange.bind(this)}
              value={this.state.task.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-user">User</label>
            <select
              className="form-control"
              name="task-user"
              rows="8"
              value={this.state.task.user}
              disabled
            >
              <option value={user.id}>{user.name}</option>
            </select>
          </div>
          <button
            className="btn btn-primary btn-submit"
            onClick={() => {
              this.props.onCreateTask(this.state.task);
              this.props.history.goBack();
            }}
          >Create</button>
          <button className="btn btn-secondary btn-cancel" onClick={() => this.props.history.goBack()}>Cancel</button>
        </div>
      </div>
    );
  }
}

/**
 * Connect Redux with Component
 */
CreateTask = connect(
  (state) => {
    return {
      users: state.users
    };
  },
  (dispatch) => {
    return {
      onCreateTask: (task) => {
        dispatch(createTask(task));
      }
    };
  }
)(CreateTask);

export default CreateTask;