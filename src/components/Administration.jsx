/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  userDelete,
  userDeleteRequest,
  userRoleChange,
  userRoleChangeRequest,
} from '../actions';
import Card from './Card';
import CustomPropTypes from '../utils/custom-prop-types';
import SelectGroup from './SelectGroup';

/**
 * Class component for administration
 */
class Administration extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };

    this.handleCloseWarning = this.handleCloseWarning.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  /**
   * Handle closing of warning messages
   */
  handleCloseWarning() {
    this.setState({
      errors: {},
    });
  }

  /**
   * Handle user deletion
   */
  handleDelete(user) {
    this.props.userDeleteRequest(user).then((res) => {
      if (res.status === 200) {
        res.json().then((oldUser) => {
          this.props.userDelete(oldUser);
        });
      } else {
        this.setState({
          errors: {
            default: 'User could not be deleted. Please try again.',
          },
        });
      }
    });
  }

  /**
   * Handle user role change
   */
  handleRoleChange(user) {
    this.props.userRoleChangeRequest(user).then((res) => {
      if (res.status === 200) {
        res.json().then((newUser) => {
          this.props.userRoleChange(newUser);
        });
      } else {
        this.setState({
          errors: {
            default: 'User role could not be changed. Please try again.',
          },
        });
      }
    });
  }

  render() {
    if (!this.props.isAdmin) {
      return (
        <div>
          <h3>Restricted Area</h3>
          <p>You don&apos;t have permission to access this page.</p>
        </div>
      );
    }
    return (
      <div>
        {this.state.errors.default && (
          <div className="alert alert-warning alert-dismissible" role="alert">
            <button
              aria-label="Close"
              className="close"
              onClick={this.handleCloseWarning}
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {this.state.errors.default}
          </div>
        )}
        <h3>Users</h3>
        {this.props.users.map(user => (
          <Card key={user.username} subtitle={user.email} title={user.username}>
            <div className="row">
              <SelectGroup
                className="col-12 col-lg-6 col-xl-4"
                field="role"
                label="Role"
                onChange={e => this.handleRoleChange({
                  ...user,
                  role: e.target.value,
                })}
                value={user.role}
              >
                <option value="Administrator">Administrator</option>
                <option value="User">User</option>
              </SelectGroup>
              <div className="col-12 col-lg-6 col-xl-8">
                <p>Actions</p>
                <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(user)}>
                  <em className="oi oi-trash" /> Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

/**
 * PropTypes
 */
Administration.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  userDelete: PropTypes.func.isRequired,
  userDeleteRequest: PropTypes.func.isRequired,
  userRoleChange: PropTypes.func.isRequired,
  userRoleChangeRequest: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    isAdmin: state.app.isAdmin,
    users: state.users,
  }),
  dispatch => ({
    userDelete: user => dispatch(userDelete(user)),
    userDeleteRequest: user => dispatch(userDeleteRequest(user)),
    userRoleChange: user => dispatch(userRoleChange(user)),
    userRoleChangeRequest: user => dispatch(userRoleChangeRequest(user)),
  }),
)(Administration);
