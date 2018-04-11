import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'christina',
      lastName: 'yuen',
      username: 'ceyuen',
      password: 'hello'
    },
    this.sendInfo = this.sendInfo.bind(this);
  }

  sendInfo() {
    console.log(this.state);
    axios.post('/signup', this.state)
      .then(() => {
        console.log('im in then in signup.jsx')
      })
  }

  render () {
    return (<div>
      First Name: <input type="text"/><br/>
      Last Name: <input type="text"/><br/>
      Username: <input type="text"/><br/>
      Password: <input type="text"/><br/><br/>
      <button onClick={this.sendInfo}>Sign Up</button>
    </div>)
  }
};

export default Signup;