import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; // go to https://www.npmjs.com/package/react-password-mask for styling
import { Modal } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    
    super(props);
    
    this.state = {
      username: '',
      password: '',
      failedLogin: ''
    };
    
    this.updateInfo = this.updateInfo.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  updateInfo(e) {
    this.setState({
      [e.target.name]: e.target.value,
      failedLogin: ''
    });
  }

  sendLogin(e) {
    axios.post('/api/login', this.state)
      .then((data) => {
        window.location.replace(`${window.location.origin}/locations`);
      })
      
      .catch((err) => {
        this.setState({
          failedLogin: 'Incorrect username or password.'
        })
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
          
              <span style={{color: "red"}}>
                {this.state.failedLogin}
              </span>
          </Modal.Body>
          
          <Modal.Footer>
            <a style={{float:`left`}} onClick={() => {this.props.handleShowSignup()}}>Need an account?</a>
            <button 
              onClick={this.sendLogin} 
              style={{borderRadius: `5px`, padding: `5px`}}> 
                Login 
              </button>
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
