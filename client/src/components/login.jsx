import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; // go to https://www.npmjs.com/package/react-password-mask for styling
import { Modal } from 'react-bootstrap';

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
    axios.post('/api/login', this.state)
      .then((data) => {
        window.location.replace(`${window.location.origin}/locations`);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={() => {this.props.hide()}} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Username: 
              <div>
                <input type="text" placeholder="Enter username" name="username" onChange={this.updateInfo} />
                <br/>
              </div>
              <br />
              Password:  <PasswordMask
                          id="loginPassword"
                          name="password"
                          placeholder="Enter password"
                          value={this.state.password}
                          onChange={this.updateInfo}
                          useVendorStyles={false}
                        />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.sendLogin} style={{borderRadius: `5px`}}> Login </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

const containerStyles ={
  display: "inline",
  backgroundColor: "black"
}

export default Login;