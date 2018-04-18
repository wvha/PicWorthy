import React, { Component } from 'react';
import _ from 'lodash';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';
import { MarkerClusterer }  from 'react-google-maps/lib/components/addons/MarkerClusterer';
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


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
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        zoom: 5,
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          // hacky way of making sure the zoom updates even if the user changed the zoom
          this.setState({
            zoom: 1
          })
          this.setState({
            center: nextCenter,
            zoom: 11
          });
          console.log(this.state);
        },
      })
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
      ref={props.onMapMounted}
      zoom={ props.zoom }
      center={ props.center }
      onBoundsChanged={ props.onBoundsChanged }
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
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
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