import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; // go to https://www.npmjs.com/package/react-password-mask for styling

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    },
    this.updateInfo = this.updateInfo.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
  }

  updateInfo(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  sendInfo() { 
    console.log(this.state);
    axios.post('/api/signup', this.state)
      .then((result) => {
        alert(JSON.stringify(result.data));
      })
  }

  render() {
    return (<div>
      First Name: <input type="text" name="firstName" onChange = {this.updateInfo}/><br/>
      Last Name: <input type="text" name="lastName" onChange = {this.updateInfo} /><br/>
      Username: <input type="text" name="username" onChange = {this.updateInfo} /><br/>
      Password: <PasswordMask
                  id="signupPassword"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.updateInfo}
                />
      <br/>
      <button onClick={this.sendInfo}>Sign Up</button>
    </div>)
  }
};

export default Signup;