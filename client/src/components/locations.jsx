import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';
import RowComp from './row.jsx';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 41.9, lng: -87.624},
      zoom: 5
    };
  }


  render() {
    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`}}>
        <Row style={{margin: `20px`}}>
          <WorthyMap 
            isForUploadPage={ false } position={this.state.position} zoom={this.state.zoom}
          />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`}}>
          Around You
        </div>
        <Row style={rowStyle}>
          <RowComp />
        </Row>
        <Row style={rowStyle}>
          {'Replace with description component'}
        </Row>
        <Row style={rowStyle}>
          {'Replace with footer component'}
        </Row>
      </Grid>
    );
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}