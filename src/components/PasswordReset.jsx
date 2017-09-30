import React, { Component } from 'react';
import InputGroup from './InputGroup';

/**
 * Component for resetting the Password
 */
class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      email: '',
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    console.log(e, this);
  }
  handleChange(e) {
    const { formData } = this.state;
    formData[event.target.name] = e.target.value;
    this.setState({ formData });
  }

  render() {
    return (
      <div className="login-panel card mt-5">
        <div className="card-block p-3">
          <h3 className="card-title text-center mt-1">Password Reset</h3>
          <div className="divider mt-0" />
          <form className="form" onSubmit={this.handleSubmit}>
            <InputGroup
              field="email"
              label="Email"
              onChange={this.handleChange}
              type="email"
              value={this.state.email}
            />
            <button
              className="btn btn-primary btn-block"
            >Reset</button>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
PasswordReset.propTypes = {
};

export default PasswordReset;
