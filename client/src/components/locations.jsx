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
          isMarkerShown={true}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div></div>}
          containerElement={<div style={{ height: '800px'}} />}
          mapElement={<div style={{ height: '100%' }} />}
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