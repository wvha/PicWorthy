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
        {testMap()}
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

const testMap = () => {
  const zoom = 13
  const center = {
    lat: 34.05,
    lng: -118.24
  };
  const places = [
    {
      lat: 34.05,
      lng: -118.24,
      clickHandler: () => {alert('I am a Click handler for clicking on place here.  A real click handler goes here')}
    },
    {
      lat: 34.07,
      lng: -118.25,
      clickHandler: () => {alert('I am another place that got clicked on.  Real click handler goes here.')}
    }
  ];
  return <WorthyMap
    center={center}
    places={places}
    zoom={zoom}
  />
}
