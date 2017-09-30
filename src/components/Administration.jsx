import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomPropTypes from '../utils/custom-prop-types';
import Card from './Card';
import SelectGroup from './SelectGroup';
import { userRoleChange, userRoleChangeRequest } from '../actions';

class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };

    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleRoleChange(user) {
    this.props.userRoleChangeRequest(user).then((res) => {
      if (res.status === 200) {
        res.json().then((newUser) => {
          this.props.userRoleChange(newUser);
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
                <button className="btn btn-sm btn-danger">
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

Administration.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  userRoleChange: PropTypes.func.isRequired,
  userRoleChangeRequest: PropTypes.func.isRequired,
  users: CustomPropTypes.users.isRequired,
};

export default connect(
  state => ({
    isAdmin: state.app.isAdmin,
    users: state.users,
  }),
  dispatch => ({
    userRoleChangeRequest: user => dispatch(userRoleChangeRequest(user)),
    userRoleChange: user => dispatch(userRoleChange(user)),
  }),
)(Administration);
