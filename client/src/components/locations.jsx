import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';
import RowComp from './row.jsx';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`}}>
        <Row style={{margin: `20px`}}>
          <WorthyMap 
            isForUploadPage={ true }
          />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`}}>
          Around You
        </div>
        <Row>
          <RowComp />
        </Row>
        <Row>
          {'Replace with description component'}
        </Row>
        <Row>
          {'Replace with footer component'}
        </Row>
      </Grid>
    );
  }
}

