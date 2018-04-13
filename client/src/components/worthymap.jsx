import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';

/*
EXAMPLE OF HOW TO USE WORTHY MAP
zoom = 13
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
  zoom={zoom}
>
*/

// TODO need to add functionality for the places and center prop
const WorthyMap = ({ center, places, zoom }) => {
  
  return (
    <GM 
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div></div>}
      containerElement={<div style={{ height: '800px'}} />}
      mapElement={<div style={{ height: '100%' }} />}
      places={places}
      center={center}
      zoom={zoom}
    />
  )
}


const GM = 
  withScriptjs(withGoogleMap(
    ({ places=[], center={lat: 34.05, lng: -118.24}, zoom=13 }) => {

  const renderPlaces = places.map(
    ({ lat, lng, clickHandler}) =>
      <Marker 
        position={{ lat: lat, lng: lng }}
        onClick={ clickHandler }
      />
  )
  
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={center}
    >
      {renderPlaces}
    </GoogleMap>
  )
}));

export default WorthyMap;