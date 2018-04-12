import React, { Component } from 'react';
import axios from 'axios';

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
    axios.post('/signup', this.state)
      .then((result) => {
        alert(JSON.stringify(result.data));
      })
  }

  render() {
    return (<div>
      First Name: <input type="text" name="firstName" onChange = {this.updateInfo}/><br/>
      Last Name: <input type="text" name="lastName" onChange = {this.updateInfo} /><br/>
      Username: <input type="text" name="username" onChange = {this.updateInfo} /><br/>
      Password: <input type="text" name="password" onChange = {this.updateInfo} /><br/><br/>
      <button onClick={this.sendInfo}>Sign Up</button>
    </div>)
  }
};

export default Signup;