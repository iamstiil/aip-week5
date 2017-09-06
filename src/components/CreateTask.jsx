import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    let userid = -1;
    if (props.users.length > 0) {
      userid = props.users[0].id;
    }

    if (props.history.location.search) {
      const tempid = props.history.location.search.slice(1);
      if (props.users.length > 0) {
        props.users.some((user) => {
          if (user.id === parseInt(tempid, 10)) {
            userid = user.id;
            return true;
          }
          return false;
        });
      }
    }

    this.state = {
      task: {
        title: '',
        description: '',
        user: userid,
      },
    };

    this.handleTitleChange.bind(this);
    this.handleDescriptionChange.bind(this);
    this.handleUserChange.bind(this);
  }

  /**
   * Get user for current path
   */
  getUser() {
    const userArray = this.props.users.filter((user) => {
      if (parseInt(this.props.match.params.userid, 10) === user.id) {
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
   * Handle title change in form
   */
  handleTitleChange(event) {
    this.setState({
      task: {
        ...this.state.task,
        title: event.target.value,
      },
    });
  }

  /**
   * Handle description change in form
   */
  handleDescriptionChange(event) {
    this.setState({
      task: {
        ...this.state.task,
        description: event.target.value,
      },
    });
  }

  /**
   * Handle user change in form
   */
  handleUserChange(event) {
    this.setState({
      task: {
        ...this.state.task,
        user: parseInt(event.target.value, 10),
      },
    });
  }

  render() {
    return (
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil" />
          </div>
          <h2>Create task</h2>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              type="text"
              className="form-control"
              name="task-title"
              placeholder="Enter description for the task"
              onChange={this.handleTitleChange}
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
              onChange={this.handleDescriptionChange}
              value={this.state.task.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-user">User</label>
            <select
              className="form-control"
              name="task-user"
              rows="8"
              onChange={this.handleUserChange}
              value={this.state.task.user}
            >
              {this.props.users.map(
                user => <option key={user.id} value={user.id}>{user.name}</option>,
              )}
            </select>
          </div>
          <button
            className="btn btn-primary btn-submit"
            onClick={() => {
              this.props.onCreateTask(this.state.task);
              this.props.history.goBack();
            }}
          >Create</button>
          <button
            className="btn btn-secondary btn-cancel"
            onClick={() => this.props.history.goBack()}
          >Cancel</button>
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCreateTask: PropTypes.func.isRequired,
  // TODO Refactor
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.boolean,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    users: state.users,
  }),
  dispatch => ({
    onCreateTask: task => dispatch(createTask(task)),
  }),
)(CreateTask);
