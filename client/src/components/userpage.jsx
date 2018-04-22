import React from 'react';
import PicRow from './picrow.jsx';
import axios from 'axios';

export default class Userpage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>Hello {this.props.userData.firstName}</h1>
        <h2 style={{fontFamily: `billabong`, textAlign: `center`, color: `#919295`}}>Your Places</h2>
        <PicRow rowType={"user"} data={this.props.userData} />
        <br />
      </div>
    )
  }
}