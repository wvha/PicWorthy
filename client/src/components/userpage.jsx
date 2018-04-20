import React from 'react';
import Row from './row.jsx';
import axios from 'axios';

class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/userposts', {username: this.props.userData.username}).then(res => {
      console.log('this is results in userpage.jsx:', res);
    });

    
  }

// need function to call users pics and set state 

// need function to call users likes and set second state

  render() {
    return (
      <div>
        <div>
        <h1>Hello this is the user page.</h1>
        <h2>username</h2>
        <h3>location</h3>
        <br />
        </div>

      <p>User's places</p>
      <Row />
      <br />
      
      <p>User's likes</p>
      <Row />



      </div>
    )
  }
}

export default Userpage;