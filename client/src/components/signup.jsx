import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; // go to https://www.npmjs.com/package/react-password-mask for styling
import { Modal } from 'react-bootstrap';

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
       <Modal show={this.props.show} onHide={() => {this.props.hide()}} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title>Create an account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              First Name: <br/><input type="text" name="firstName" onChange = {this.updateInfo}/><br/><br/>
              Last Name: <br/><input type="text" name="lastName" onChange = {this.updateInfo} /><br/><br/>
              Username: <br/><input type="text" name="username" onChange = {this.updateInfo} /><br/><br/>
              Password: <PasswordMask
                          id="signupPassword"
                          name="password"
                          placeholder="Enter password"
                          value={this.state.password}
                          onChange={this.updateInfo}
                          useVendorStyles={false}
                        />
          </Modal.Body>
          <Modal.Footer>
              <button onClick={this.sendInfo} style={{borderRadius: `5px`}}> Register </button>
          </Modal.Footer>
        </Modal>
    </div>)
  }
};

export default Signup;