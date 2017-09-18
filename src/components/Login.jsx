import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { userLoggedIn } from '../actions';
import './Login.scss';

const style = {
  margin: 15,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

    };
  }

  handleClick() {
    console.log(this.state);
    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => response.json()).then((body) => {
      if (body.error) {
        if (body.error.email) {
          // TODO display error when email not valid
          console.log(body.error.email);
        } else if (body.error.password) {
        // TODO display error when password not valid
          console.log(body.error.password);
        }
      } else {
        this.props.userLoggedIn(body);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="row content-wrapper login-wrapper">
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Email address"
              floatingLabelText="Email"
              onChange={(event, emailValue) => this.setState({ email: emailValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, passwordValue) => this.setState({ password: passwordValue })}
            />
            <br />
            <RaisedButton
              label="Submit"
              primary
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  userLoggedIn: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    userLoggedIn: (user) => {
      console.log(dispatch);
      dispatch(userLoggedIn(user));
    },
  }),
)(Login);
