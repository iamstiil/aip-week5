import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomPropTypes from '../utils/custom-prop-types';
import Card from './Card';
import SelectGroup from './SelectGroup';

class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        {this.props.users.map(({ email, role, username }) => (
          <Card subtitle={email} title={username}>
            <div className="row">
              <SelectGroup className="col-12 col-lg-6 col-xl-4" label="Role" value={role}>
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
  users: CustomPropTypes.users.isRequired,
};

export default connect(
  state => ({
    users: state.users,
  }),
)(Administration);
