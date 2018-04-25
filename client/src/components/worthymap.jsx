/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * DOCUMENTATION IS COOOL https://tomchentw.github.io/react-google-maps/ *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer }  from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";


  /*
   *
   *  THe worthy map uses higher order component.  It composes a bunch of functions 
   *  and together and applies it to the google map
   * 
   */

const WorthyMap = compose(

  
  /*
   *  withProps you pass in default props that get used everytime by the google map
   * 
   */

  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWb-bdFbk9oBVzcehnMVyaG1QqVCvf8As&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100%`, border: `1px solid grey`, borderRadius: `3px`}}/>,
    mapElement: <div style={{ height: `100%` }} />,
  }),


  /*
   * withHandlers lets you pass in default handlers that get used everytime
   *  
   */


  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    },
  }),


  /*
   * the componentWillMount is where we put our event handlers
   *
   * everything in state gets passed down as a prop
   *  
   * the ref in onMapMounted is how we get a reference to the map dom node
   * it allows us to be able to reference things refs.map.getCenter() to get center of map
   * documentation has methods available on the map and ref.map.method is how you access them
   * 
   * google map react library has events we can attatch handlers to like onPlacesChanged
   * 
   * 
   */


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
          // if user manually changes the zoom the state wouldn't realize the state changed
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

  /*
   *
   * withScriptjs and withGoogleMap are just functions the react-google-maps requires
   * for the map to work well.
   *  
   */

  withScriptjs,
  withGoogleMap
) 
  

  /*
   *
   * starting here is when the render method starts
   * all props passed into worthymap along with the default props and handlers
   * also the state in the composed functions get passed in as props here
   *
   * 
   */

  
  ((props) => {
  const center = props.center || props.defaultCenter;
  const zoom = props.zoom || props.defaultZoom;
  const allMarkers = props.markers.map((marker, i) => (
    <Marker
      key={ i }
      position={{ lat: marker.lat, lng: marker.lng }} 
      onClick={(e) => marker.clickHandler(e)}
    />
  ));
  const onCenterChanged = props.onCenterChanged ? props.onCenterChanged : () => {};

  /*
   * see documentation for google-maps-react for props and examples
   * 
   */

  return (

    <GoogleMap
      ref={props.onMapMounted}
      zoom={ zoom }
      center={ center }
      onBoundsChanged={ (...args) => {
        props.onBoundsChanged(...args); 
        onCenterChanged(props.refCenter.lat(), props.refCenter.lng());
      } }
      onClick={ props.onMapClick }
      onCenterChanged={ () => onCenterChanged(props.refCenter.lat(), props.refCenter.lng()) }
    >
      {zoom < 12 
      ? 


      /*
       *
       * We can pass in Markers or Clusters of markers into the map
       *
       */



      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        { allMarkers }
      </MarkerClusterer>
      :
      { allMarkers }
      }


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

