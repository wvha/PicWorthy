import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';

/*
EXAMPLE OF HOW TO USE WORTHY MAP on a render function
A worthy map takes 3 parameters, zoom, center, and places

// zoom is how zoomed in the map should be
const zoom = 13

// center is the latitude and longitude of the location of the map
const center = {
  lat: 34.05,
  lng: 118.24
};

// places is an array of clickable pins and their location
const places = [
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

// pass those properties into our map
return <WorthyMap
  center={center}
  places={places}
  zoom={zoom}
>
*/

// WorthyMap is a wrapper around the google map making it easier for us to use
const WorthyMap = ({ center, places, zoom }) => {
  
  return (
    <GM 
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div></div>}
      containerElement={<div style={{ height: '400px'}} />}
      mapElement={<div style={{ height: '100%' }} />}
      places={places}
      center={center}
      zoom={zoom}
    />
  )
}

// GM is the google map component our WorthyMap wraps
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