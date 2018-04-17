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
      <Grid style={{margin: "0"}}>
        <Row>
          <WorthyMap 
            isForUploadPage={ true }
          />
        </Row>
        <br />
        <span>
          Places
        </span>
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

