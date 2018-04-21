import React, { Component } from 'react';
import _ from 'lodash';
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
    // zoom: props.zoom,
    // center: props.position

    this.getLocations = this.getLocations.bind(this);
    this.clickMap = this.clickMap.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    this.getUserLocation();
    this.getLocations();
  }

  getUserLocation() {
    const onSuccess = ({coords}) => {
      console.log('users coords', coords);
      
      this.setState({
        position: {
          lat: coords.latitude, 
          lng: coords.longitude
        },
        zoom: 9
      });
    };

    // if we can't get users location we try again without high accuracy
    const onError = (err) => {
      navigator.geolocation.getCurrentPosition(
        onSuccess, 
        (err2) => console.log('error getting location', err2), 
        {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: false} 
      );
    };

    // but first we try to get it with high accuracy
    navigator.geolocation.getCurrentPosition(
      onSuccess, 
      onError, 
      {maximumAge: 3600000, timeout: 5000, enableHighAccuracy: true} // maxAge is how old a cached result can be, timeout is how long to try getting position.
    );
  }

  getLocations() {
    if (!this.props.isForUploadPage) {
      this.setState({markers: testingMarkers}) // delete this after getLocations is hooked up;
      // TODO
      // Make axios request to our server to get all the locations
      // turn them all into makers and call setState and set an array of markers to this.state.markers
    }
  }

  // allows a user to click the map to place a pin where there location is while uploading photos
  clickMap(e) {
    console.log(e);
    this.props.getLocationUpload({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });

    this.setState({
      userMarker: [{
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        clickHandler: () => {}
      }]
    })
  }

  render() {
    const markers = this.state.markers.concat(this.state.userMarker);

    let clickMap;
    if (this.props.isForUploadPage) {
      clickMap = this.clickMap;
    } else {
      clickMap = () => {};
    }
    console.log('renderprops', this.state.zoom, this.state.position)
    return (
      <ClusteredMap
        markers={ markers } 
        clickMap={ clickMap }
        defaultZoom={ this.state.zoom }
        defaultCenter={ this.state.position } 
      />
    );
  }
}


const testingMarkers = [
  {
    lat: 34.05,
    lng: -118.24,
    clickHandler: function(e) {alert('i got clicked and my event is ' + JSON.stringify(e))}
  },
  {
    lat: 34.25,
    lng: -118.24,
    clickHandler: function(e) {alert('i got clicked and my event is ' + JSON.stringify(e))}
  },

  {
    lat: 34.35,
    lng: -118.24,
     clickHandler: function(e) {alert('i got clicked and my event is ' + JSON.stringify(e))}
  },

  {
    lat: 34.45,
    lng: -118.24,
    clickHandler: function(e) {alert('i got clicked and my event is ' + JSON.stringify(e))}
  }

]


export default WorthyMap;