import React, { Component } from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';
import { MarkerClusterer }  from 'react-google-maps/lib/components/addons/MarkerClusterer';

// https://tomchentw.github.io/react-google-maps/#markerclusterer
const ClusteredMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
) ((props) => {
  
  const allMarkers = props.markers.map((marker, i) => (
    <Marker
      key={ i }
      position={{ lat: marker.lat, lng: marker.lng }}
    />
  ));

  return (
    <GoogleMap
      defaultZoom={ props.zoom }
      defaultCenter={ props.center }
      onClick={ props.clickMap }
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        { allMarkers }
      </MarkerClusterer>
    </GoogleMap>
  );
});


class WorthyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userMarker: [],
      zoom: 5,
      center: {
        lat: 34.05,
        lng: -118.24
      }
    };

    this.getLocations = this.getLocations.bind(this);
    this.clickMap = this.clickMap.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    // this.getLocations(); // uncomment after getLocations is hooked up
    this.setState({markers: testingMarkers}) // delete this after getLocations is hooked up;
  }

  getLocations() {
    // TODO
    // Make axios request to our server to get all the locations
    // turn them all into makers and call setState and set an array of markers to this.state.markers
  }

  // allows a user to click the map to place a pin where there location is while uploading photos
  clickMap(e) {
    console.log(e);
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

    return (
      <ClusteredMap
        markers={ markers } 
        clickMap={ clickMap }
        zoom={ this.state.zoom }
        center={ this.state.center } 
      />
    );
  }
}

const testingMarkers = [
  {
    lat: 34.05,
    lng: -118.24,
    clickHandler: () => {alert('i got clicked and my location is ' + this.lat + ' ' + this.lng)}
  },
  {
    lat: 34.25,
    lng: -118.24,
    clickHandler: () => {alert('i got clicked and my location is ' + this.lat + ' ' + this.lng)}
  },

  {
    lat: 34.35,
    lng: -118.24,
    clickHandler: () => {alert('i got clicked and my location is ' + this.lat + ' ' + this.lng)}
  },

  {
    lat: 34.45,
    lng: -118.24,
    clickHandler: () => {alert('i got clicked and my location is ' + this.lat + ' ' + this.lng)}
  }


]

export default WorthyMap;