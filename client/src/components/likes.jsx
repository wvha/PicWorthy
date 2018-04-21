import React from 'react';
import Row from './row.jsx';
import axios from 'axios';

class Likes extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <Row rowType="likes" userId={this.props.userData._id}/>
      </div>
    )
  }
}

export default Likes;