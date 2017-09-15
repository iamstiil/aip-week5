import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.scss';

const style = {
  margin: 15,
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

    };
  }

  handleClick() {
    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      body: this.state,
    }).then(response => response.json()).then((body) => {
      console.log(body);
    });
  }

  render() {
    return (
      <div className="row content-wrapper login-wrapper">
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              onchange={(event, usernameValue) => this.setState({ username: usernameValue })}
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

