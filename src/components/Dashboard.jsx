/**
 * Import dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeTitle } from '../actions';
import Card from './Card';
import CustomPropTypes from '../utils/custom-prop-types';
import './Dashboard.scss';

/**
 * Component class for Dashboard
 */
class Dashboard extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      filterOpen: false,
      visibleTasks: props.tasks,
    };

    this.toggleFilter = this.toggleFilter.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
  }

  /**
   * React lifecycle methods
   */
  componentDidMount() {
    this.props.changeTitle('Dashboard');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visibleTasks: nextProps.tasks,
    });
  }

  /**
   * Get all lists of users with tasks
   */
  getUserLists() {
    return this.props.users.map(user => (
      <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <h3>{user.name.length > 0 ? user.name : user.username}</h3>
        {this.state.visibleTasks.map((task) => {
          if (user.id !== task.user) {
            return false;
          }
          return (
            <Link key={task.id} to={`/task/${task.id}`}>
              <Card title={task.title} link>{task.description}</Card>
            </Link>
          );
        })}
        <Link to={`/task/create?${user.id}`}>
          <button className="btn btn-primary btn-block btn-create">Create Task</button>
        </Link>
      </div>
    ));
  }

  /**
   * Filter visible tasks
   */
  filterTasks(event) {
    const tasks = this.props.tasks.filter((task) => {
      const value = event.target.value.toLowerCase();
      const title = task.title.toLowerCase();
      const description = task.description.toLowerCase();

      if (title.indexOf(value) !== -1) {
        return true;
      }
      if (description.indexOf(value) !== -1) {
        return true;
      }
      return false;
    });
    this.setState({
      visibleTasks: tasks,
    });
  }

  /**
   * View/hide filter input
   */
  toggleFilter() {
    this.setState({
      filterOpen: !this.state.filterOpen,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 view-menu-wrapper">
          <div className="view-menu float-right form-inline">
            <div className={classnames('filter-input', 'mr-2', { open: this.state.filterOpen })}>
              <input className="form-control" onChange={this.filterTasks} />
            </div>
            <button
              className={
                classnames('btn', 'btn-primary', 'oi', {
                  'oi-magnifying-glass': !this.state.filterOpen,
                  'oi-x': this.state.filterOpen,
                })
              }
              onClick={this.toggleFilter}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            {this.getUserLists()}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
Dashboard.propTypes = {
  changeTitle: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
  tasks: CustomPropTypes.tasks.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    users: state.users,
    tasks: state.tasks,
  }),
  dispatch => ({
    changeTitle: title => dispatch(changeTitle(title)),
  }),
)(Dashboard);
