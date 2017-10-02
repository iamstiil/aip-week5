/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { createTask, createTaskRequest } from '../actions';
import CustomPropTypes from '../utils/custom-prop-types';
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';
import TextAreaGroup from './TextAreaGroup';
import { validateTaskCreation } from '../shared/validations';
import './CreateTask.scss';

/**
 * Component class displaying task creation form
 */
class CreateTask extends Component {
  /**
   * Get user for current path
   */
  static getUser(props) {
    let userid = -1;

    if (props.users.length > 0) {
      userid = props.users[0].id;
    }

    if (props.history.location.search) {
      const tempid = props.history.location.search.slice(1);
      if (props.users.length > 0) {
        props.users.some((user) => {
          if (user.id === tempid) {
            userid = user.id;
            return true;
          }
          return false;
        });
      }
    }

    return userid;
  }

  /**
   * Constructor 
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      task: {
        title: '',
        description: '',
        user: CreateTask.getUser(props),
      },
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  /**
   * React lifecycle methods
   */
  componentWillReceiveProps(nextProps) {
    const userid = CreateTask.getUser(nextProps);

    this.setState({
      task: {
        ...this.state.task,
        user: userid,
      },
    });
  }

  // TODO: Join change handlers to one like EditTask
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
        user: event.target.value,
      },
    });
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
        <div className="col-12 view-menu-wrapper">
          <div className="view-menu float-right">
            <button className="btn btn-outline-primary oi oi-pencil" />
          </div>
        </div>
        <div className="col-12">
          <InputGroup
            error={this.state.errors.title}
            field="task-title"
            label="Title"
            onChange={this.handleTitleChange}
            type="text"
            value={this.state.task.title}
          />
          <TextAreaGroup
            field="task-description"
            label="Description"
            onChange={this.handleDescriptionChange}
            rows={8}
            value={this.state.task.description}
          />
          <SelectGroup
            error={this.state.errors.user}
            field="task-user"
            label="User"
            onChange={this.handleUserChange}
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
                this.props.onCreateTaskRequest(this.state.task).then((res) => {
                  if (res.status === 200) {
                    res.json().then((task) => {
                      this.props.onCreateTask(task);
                      this.props.history.push('/');
                    });
                  } else if (res.status === 400) {
                    this.setState({
                      errors: 'Task could not be created! Please try again.',
                      isLoading: false,
                    });
                  }
                });
              }
            }}
          >Create</button>
          <button
            className="btn btn-secondary btn-cancel"
            onClick={() => this.props.history.push('/')}
          >Cancel</button>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
CreateTask.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onCreateTaskRequest: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
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
    onCreateTaskRequest: task => dispatch(createTaskRequest(task)),
  }),
)(CreateTask);
