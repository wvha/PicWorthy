import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';

/*
EXAMPLE OF HOW TO USE WORTHY MAP
center = {
  lat: 34.05,
  lng: 118.24
};

places = [
  {
    lat: 35,
    lng: 119,
    clickHandler: () => {alert('Click handler for clicking on place here')}
  },
  {
    lat: 34.5,
    lng: 118.5,
    clickHandler: () => {alert('I am another place that got clicked on')}
  }
];
<WorthyMap
  center={center}
  places={places}
>
*/

// TODO need to add functionality for the places and center prop
class WorthyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <GM 
        isMarkerShown={true}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div></div>}
        containerElement={<div style={{ height: '800px'}} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    )
  }
}

const GM = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 34.05, lng: -118.24 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -34.05, lng: 118.24 }} />}
    </GoogleMap>
  )
}));

export default WorthyMap;