import React from 'react';
import Row from './row.jsx';


class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

// need function to call users pics and set state 

// need function to call users likes and set second state

  render() {
    return (
      <div>
        <div>
        <h1>Hello this is the likes page.</h1>
        <h2>username</h2>
        <h3>location</h3>
        <br />
        </div>
      
      <p>User's likes</p>
      <Row />



      </div>
    )
  }
}

export default Likes;