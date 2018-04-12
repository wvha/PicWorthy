import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; // go to https://www.npmjs.com/package/react-password-mask for styling

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.updateInfo = this.updateInfo.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  updateInfo(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendLogin(e) {
    axios.post('/login', this.state)
      .then((data) => {
        window.location.replace(window.location.origin);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        Username: <input type="text" name="username" onChange={this.updateInfo} /><br/>
        Password: <PasswordMask
          id="loginPassword"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.updateInfo}
        />
        <br/>
        <button onClick={this.sendLogin}> Login </button>
      </div>
    );
  }
};

export default Login;