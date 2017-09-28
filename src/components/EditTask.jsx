/**
 * Import dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import CustomPropTypes from '../utils/custom-prop-types';
import InputGroup from './InputGroup';
import TextAreaGroup from './TextAreaGroup';
import SelectGroup from './SelectGroup';
import { deleteTask, deleteTaskRequest, editTask, editTaskRequest } from '../actions';
import { validateTaskCreation } from '../shared/validations';

/**
 * Component class for editing tasks
 */
class EditTask extends Component {
  /**
   * Get task for current path
   */
  static getTask(props) {
    const taskArray = props.tasks.filter((task) => {
      if (props.match.params.taskid === task.id) {
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

  /**
  * Constructor
  */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isLoading: false,
      popUp: false,
      task: EditTask.getTask(props),
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  /**
   * React lifecycle methods
   */
  componentWillReceiveProps(nextProps) {
    const task = EditTask.getTask(nextProps);

    this.setState({ task });
  }

  /**
   * Handle change inside inputs
   */
  handleChange(e) {
    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value,
      },
    });
  }

  /**
   * Handle saving of task
   */
  handleSave() {
    this.setState({ isLoading: true });
    this.props.onEditTaskRequest(this.state.task).then((res) => {
      if (res.status === 200) {
        res.json().then((task) => {
          this.props.onEditTask(task);
          this.props.history.push('/');
        });
      } else {
        res.json().then((errors) => {
          this.setState({ errors });
        });
      }
    });
  }

  /**
   * Handle deletion of task
   */
  handleDelete() {
    this.setState({ isLoading: true });
    this.props.onDeleteTaskRequest(this.state.task).then((res) => {
      if (res.status === 200) {
        res.json().then((task) => {
          this.props.onDeleteTask(task);
          this.closeModal();
          this.props.history.push('/');
        });
      } else {
        res.json().then((errors) => {
          this.setState({ errors });
        });
      }
    });
  }

  /**
   * Close deletion modal
   */
  closeModal() {
    $(this.deleteModal).modal('hide');
  }

  /**
   * Validate Task
   */
  isValid(task) {
    const { errors, isValid } = validateTaskCreation(task);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    return (
      <div className="row">
        <div
          className="modal fade"
          id="deleteModal"
          role="dialog"
          ref={(modal) => { this.deleteModal = modal; }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this task permanently?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal" type="button">
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={this.handleDelete} type="button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 view-menu-wrapper">
          <div className="view-menu float-right">
            <button
              data-toggle="modal"
              data-target="#deleteModal"
              className="btn btn-outline-danger oi oi-trash"
            />
          </div>
        </div>
        {this.state.errors && this.state.errors.default && (
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              {this.state.errors.default}
            </div>
          </div>
        )}
        {this.state.task && (
          <div className="col-12">
            <InputGroup
              error={this.state.errors.title}
              field="title"
              label="Title"
              onChange={this.handleChange}
              type="text"
              value={this.state.task.title}
            />
            <TextAreaGroup
              field="description"
              label="Description"
              onChange={this.handleChange}
              rows={8}
              value={this.state.task.description}
            />
            <SelectGroup
              error={this.state.user}
              field="user"
              label="User"
              onChange={this.handleChange}
              value={this.state.task.user}
            >
              {this.props.users.map(user => (
                <option key={user.id} value={user.id}>{
                  user.name.length > 0 ? user.name : user.username
                }</option>
              ))}
            </SelectGroup>
            <button
              className="btn btn-primary btn-submit"
              disabled={this.state.isLoading}
              onClick={() => {
                if (this.isValid(this.state.task)) {
                  this.setState({
                    isLoading: true,
                  });
                  this.handleSave();
                }
              }}
            >Save</button>
            <button
              className="btn btn-secondary btn-cancel"
              onClick={() => this.props.history.push('/')}
            >Cancel</button>
          </div>
        )}
      </div>
    );
  }
}

/**
 * PropTypes
 */
EditTask.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onDeleteTaskRequest: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onEditTaskRequest: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    tasks: state.tasks,
    users: state.users,
  }),
  dispatch => ({
    onDeleteTask: task => dispatch(deleteTask(task)),
    onDeleteTaskRequest: task => dispatch(deleteTaskRequest(task)),
    onEditTask: task => dispatch(editTask(task)),
    onEditTaskRequest: task => dispatch(editTaskRequest(task)),
  }),
)(EditTask);
