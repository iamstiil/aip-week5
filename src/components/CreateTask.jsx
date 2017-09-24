import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import InputGroup from './InputGroup';
import TextAreaGroup from './TextAreaGroup';
import SelectGroup from './SelectGroup';
import { createTask } from '../actions';
import CustomPropTypes from '../utils/custom-prop-types';
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
      task: {
        title: '',
        description: '',
        user: -1,
      },
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
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
          <InputGroup
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
            field="task-user"
            label="User"
            onChange={this.handleUserChange}
            value={this.state.task.user}
          >
            {this.props.users.map(user => (
              <option key={user.id} value={user.id}>{
                user.name.length > 0 ? user.name : user.email
              }</option>
            ))}
          </SelectGroup>
          <button
            className="btn btn-primary btn-submit"
            onClick={() => {
              this.props.onCreateTask(this.state.task);
              this.props.history.push('/');
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

CreateTask.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  onCreateTask: PropTypes.func.isRequired,
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
  }),
)(CreateTask);
