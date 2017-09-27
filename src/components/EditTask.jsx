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
import { editTask, editTaskRequest } from '../actions';

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
      isLoading: false,
      task: EditTask.getTask(props),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
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

  render() {
    return (
      <div className="row content-wrapper">
        <div className="col-12">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil" />
          </div>
          <h2>Edit task</h2>
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
                this.setState({
                  isLoading: true,
                });
                this.handleSave();
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
  onEditTask: PropTypes.func.isRequired,
  onEditTaskRequest: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
};

export default connect(
  state => ({
    tasks: state.tasks,
    users: state.users,
  }),
  dispatch => ({
    onEditTask: task => dispatch(editTask(task)),
    onEditTaskRequest: task => dispatch(editTaskRequest(task)),
  }),
)(EditTask);
