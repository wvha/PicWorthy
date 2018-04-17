import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Grid>
        <Row>
          <WorthyMap 
            isForUploadPage={ true }
          />
        </Row>
        <span>
          Places
        </span>
        <button>go back to places</button>
        <Row>
          {'REPLACE WITH SCROLLER THING COMPONENTS'}
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

