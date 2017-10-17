/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { changeTitle, createTask, createTaskRequest } from '../actions';
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  /**
   * React lifecycle methods
   */
  componentDidMount() {
    this.props.changeTitle('Create Task');
  }

  componentWillReceiveProps(nextProps) {
    const userid = CreateTask.getUser(nextProps);

    this.setState({
      task: {
        ...this.state.task,
        user: userid,
      },
    });
  }

  /**
   * Handle change in form
   */
  handleChange(event) {
    this.setState({
      task: {
        ...this.state.task,
        [event.target.name]: event.target.value,
      },
    });
  }

  /**
   * Handle form submission
   */
  handleSubmit() {
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
            error={this.state.errors.user}
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
            onClick={this.handleSubmit}
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
  changeTitle: PropTypes.func.isRequired,
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
    changeTitle: title => dispatch(changeTitle(title)),
    onCreateTask: task => dispatch(createTask(task)),
    onCreateTaskRequest: task => dispatch(createTaskRequest(task)),
  }),
)(CreateTask);
