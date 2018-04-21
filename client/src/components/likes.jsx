import React from 'react';
import Row from './row.jsx';
import axios from 'axios';

class Likes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('thispropslikes', this.props);
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <div>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#87ceff`}}>{this.props.userData.firstName}'s Favorites</h1>
        <br />
        </div>
        <Row rowType="likes" userId={this.props.userData._id}/>
      </div>
    )
  }
}

export default Likes;