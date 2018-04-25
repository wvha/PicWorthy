import React, { Component } from 'react';
import axios from 'axios';
import PasswordMask from 'react-password-mask'; 
import { Modal } from 'react-bootstrap';
import Login from './login.jsx';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      status: undefined,
    },
    
    this.updateInfo = this.updateInfo.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
  }

  updateInfo(e) {
    this.setState({
      [e.target.name]: e.target.value,
      status: undefined
    });
  }

  sendInfo() { 
    axios.post('/api/signup', this.state)
      .then((data) => {
        this.setState({
          status: true
        });
      })
      
      .catch(() => {
        this.setState({
          status: false
        })
      })
  }

  renderStatus() {
    if (this.state.status !== undefined) {
      if (this.state.status) {
        return <span style={{color: `green`}}>Your account was successfully created!</span>
      
      } else {
        return <span style={{color: `red`}}>Username already exists.</span>
      }
    }
  }

  render() {
    return (
    <div>
       <Modal show={this.props.show} onHide={() => {this.props.hide()}} bsSize="small">
          
          <Modal.Header closeButton>
            <Modal.Title>Create an account</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
              First Name: <br/><input type="text" name="firstName" placeholder="Enter first name" onChange = {this.updateInfo}/><br/><br/>
              Last Name: <br/><input type="text" name="lastName" placeholder="Enter last name" onChange = {this.updateInfo} /><br/><br/>
              Username: <br/><input type="text" name="username" placeholder="Enter username" onChange = {this.updateInfo} /><br/><br/>
              Password: <PasswordMask
                          id="signupPassword"
                          name="password"
                          placeholder="Enter password"
                          value={this.state.password}
                          onChange={this.updateInfo}
                          useVendorStyles={false}
                        />
              {this.renderStatus()}
          </Modal.Body>
          
          <Modal.Footer>
              <a style={{float:`left`}} onClick={() => {this.props.handleShowLogin()}}>Already have an account?</a>
              <button onClick={this.sendInfo} style={{borderRadius: `5px`, padding: `5px`}}> Register </button>
          </Modal.Footer>
        </Modal>
    </div>)
  }
};
