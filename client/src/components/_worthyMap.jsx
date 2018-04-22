import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ClusteredMap from './clusteredmap.jsx';

class WorthyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userMarker: [],
      zoom: 4,
      position: {lat: 37.09, lng: -95.71}
    };
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    const onSuccess = ({coords}) => {
      console.log('users coords', coords);
      
      this.setState({
        position: {
          lat: coords.latitude, 
          lng: coords.longitude
        },
        zoom: 10
      });
    };

    const onError = (err) => {
      navigator.geolocation.getCurrentPosition(
        onSuccess, 
        (err2) => console.log('error getting location', err2), 
        {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: false} 
      );
    };

    navigator.geolocation.getCurrentPosition(
      onSuccess, 
      onError, 
      {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true} 
    );
  }

  render() {
    const markers = this.state.markers.concat(this.state.userMarker);

    return (
      <ClusteredMap
        markers={ this.state.markers } 
        clickMap={ () => {} }
        defaultZoom={ this.state.zoom }
        defaultCenter={ this.state.position } 
      />
    );
  }
}

export default WorthyMap;