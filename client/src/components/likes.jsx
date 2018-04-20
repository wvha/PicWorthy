import React from 'react';
import Row from './row.jsx';
import axios from 'axios';

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: {}
    };
  }

// need function to call users likes and set second state
  componentDidMount() {
    axios.get('/api/likes', {user: this.props.userData.username})
      .then((result) => {
        console.log('this.props.userdata.username: ', this.props.userData.username);
        console.log('success in likes//component did mount: ', result);
        this.setState({
          likes: result.data
        });
      });
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
      <Row />



      </div>
    )
  }
}

export default Likes;