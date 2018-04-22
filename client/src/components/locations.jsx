import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';

import WorthyMap from './worthymap.jsx';
import PicRow from './picrow.jsx';
import Details from './details.jsx';
import fetchClosestPics from '../helpers/fetchClosestPics.jsx';
import getUserLocation from '../helpers/getUserLocation.jsx';
import { updateDisplayAmount, rotatePics } from '../helpers/picture.jsx';


export default class Locations extends Component {
  constructor() {
    super();
    this.state = {
      pics: [],
      displayAmount: 0,
      markers: [],
      zoom: 4,
      position: {lat: 37.09, lng: -95.71},
      detailedPicURL: 'NONE'
    };

    this.updatePictures = _.throttle(this.updatePictures.bind(this), 1000);
    this.rotatePics = rotatePics.bind(this);
    this.updateDisplayAmount = updateDisplayAmount.bind(this);
    this.getUserLocation = getUserLocation.bind(this);
    this.showHideDetails = showHideDetails.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
    this.updateDisplayAmount();
    window.addEventListener('resize', this.updateDisplayAmount);
  }

  updatePictures(lat, lng) {
    fetchClosestPics(lat, lng)
      .then(({data}) => this.setState({pics: data}))
  }

  render() {
    const pics = this.state.pics.slice(0, this.state.displayAmount);

    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`, minHeight: `calc(100vh - 150px)`}}>
        <Row style={{margin: `20px`, height:`calc((100vh - 150px)/2)`, minHeight: `400px`}}>
        <WorthyMap
          markers={ this.state.markers } 
          defaultZoom={ this.state.zoom }
          defaultCenter={ this.state.position } 
          onCenterChanged={ this.updatePictures }
        />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`, color: `#32bfff`}}>
          Around You
        </div>
        <Row style={rowStyle}>
          <PicRow 
            showHideDetails={ this.showHideDetails } 
            rowType="locations"
            pics={ pics }
            rotatePics={ this.rotatePics }
          />
        </Row>
        <Row style={rowStyle}>
          <Details 
            detailedPicURL={ this.state.detailedPicURL }
            pics={ pics }
            showHideDetails={ this.showHideDetails }
          />
        </Row>
      </Grid>
    );
  }
}

const showHideDetails = function(imageURL) {
  console.log(imageURL);
  const detailedPicURL = this.state.detailedPicURL !== imageURL 
    ? imageURL
    : 'NONE';

  this.setState({detailedPicURL});
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}