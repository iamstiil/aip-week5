/**
 * Import dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle, updateUserRequest } from '../actions';
import InputGroup from './InputGroup';
import CustomPropTypes from '../utils/custom-prop-types';
import { validateUser } from '../shared/validations';

/**
 * Component for settings view
 */
class Settings extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      ...props.currentUser,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  /**
   * React lifecycle methods
   */
  componentDidMount() {
    this.props.changeTitle('Settings');
  }

  /**
   * Hangle input change
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const user = {
      name: this.state.name,
      phone: this.state.phone,
    };

    if (this.isValid(user)) {
      this.props.updateUserRequest(this.state.id, user).then(res => res.json()).then((res) => {
        if (res.errors) {
          this.setState({ errors: res.errors });
        } else {
          this.setState({ msg: 'User data were saved.' });
        }
      });
    }
  }

  /**
   * Check form validity
   */
  isValid(user) {
    const { errors, isValid } = validateUser(user);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <div className="col-12">
          <h2>Personal Details</h2>
        </div>
        <div className="col-12">
          <InputGroup
            error={this.state.errors.name}
            field="name"
            label="Name"
            onChange={this.handleChange}
            type="text"
            value={this.state.name}
          />
          <InputGroup
            error={this.state.errors.phone}
            field="phone"
            label="Phone number"
            onChange={this.handleChange}
            type="text"
            value={this.state.phone}
          />
          <button className="btn btn-primary mb-3">Submit</button>
        </div>
        {this.state.msg && (
          <div className="col-12">
            <div className="alert alert-success" role="alert">{this.state.msg}</div>
          </div>
        )}
      </form>
    );
  }
}

/**
 * PropTypes
 */
Settings.propTypes = {
  changeTitle: PropTypes.func.isRequired,
  currentUser: CustomPropTypes.user.isRequired,
  updateUserRequest: PropTypes.func.isRequired,
};

/**
 * Connect Redux with Component
 */
export default connect(
  state => ({
    currentUser: state.app.currentUser,
  }),
  dispatch => ({
    changeTitle: title => dispatch(changeTitle(title)),
    updateUserRequest: (userid, user) => dispatch(updateUserRequest(userid, user)),
  }),
)(Settings);
