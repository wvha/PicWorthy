import React from 'react';
import Row from './row.jsx';

class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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