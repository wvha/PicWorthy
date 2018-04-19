import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';
import RowComp from './row.jsx';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 41.9, lng: -87.624},
      zoom: 5
    };
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    const onSuccess = ({coords}) => {
      console.log('users coords', coords);
      this.setState({
        position: {lat: coords.latitude, lng: coords.longitude},
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

  render() {
    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`}}>
        <Row style={{margin: `20px`}}>
          <WorthyMap 
            isForUploadPage={ false } position={this.state.position} zoom={this.state.zoom}
          />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`}}>
          Around You
        </div>
        <Row style={rowStyle}>
          <RowComp />
        </Row>
        <Row style={rowStyle}>
          {'Replace with description component'}
        </Row>
        <Row style={rowStyle}>
          {'Replace with footer component'}
        </Row>
      </Grid>
    );
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}