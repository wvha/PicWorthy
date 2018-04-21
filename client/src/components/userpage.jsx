import React from 'react';
import Row from './row.jsx';
import axios from 'axios';

class Userpage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#87ceff`}}>Hello {this.props.userData.firstName}</h1>
        <h2 style={{fontFamily: `billabong`, textAlign: `center`, color: `#919295`}}>Your Places</h2>
        <Row rowType={"user"} data={this.props.userData} />
        <br />
      </div>
    )
  }
}

export default Userpage;