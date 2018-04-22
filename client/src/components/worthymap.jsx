import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Grid, Row } from 'react-bootstrap';
import { MarkerClusterer }  from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";


// https://tomchentw.github.io/react-google-maps/#markerclusterer
const WorthyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWb-bdFbk9oBVzcehnMVyaG1QqVCvf8As&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100%`, border: `1px solid grey`, borderRadius: `3px`}}/>,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    },
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        zoom: null,
        bounds: null,
        center: null,
        refCenter: {lat: () => 84, lng: () => -100},
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            refCenter: refs.map.getCenter(),
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
            refCenter: nextCenter,
            zoom: 11
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
) ((props) => {
  const center = props.center || props.defaultCenter;
  const zoom = props.zoom || props.defaultZoom;
  const allMarkers = props.markers.map((marker, i) => (
    <Marker
      key={ i }
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={marker.clickHandler}
    />
  ));
  const onCenterChanged = props.onCenterChanged ? props.onCenterChanged : () => {};

  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={ zoom }
      center={ center }
      onBoundsChanged={ (...args) => {
        props.onBoundsChanged(...args); 
        onCenterChanged(props.refCenter.lat(), props.refCenter.lng());
      } }
      onClick={ props.clickMap }
      onCenterChanged={ () => onCenterChanged(props.refCenter.lat(), props.refCenter.lng()) }
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
          placeholder="Search"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            margin: 'auto auto auto auto',
            marginTop: `10px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            left: '500px'
          }}
        />
      </SearchBox>
    </GoogleMap>
  );
});

WorthyMap.propTypes = {
  markers: PropTypes.array.isRequired,
  clickMap: PropTypes.func,
  defaultZoom: PropTypes.number.isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired
}

export default WorthyMap;