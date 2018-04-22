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
      detailedPicURL: 'NONE',
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
      .then(({data}) => {
        const clickHandler = this.showHideDetails;
        console.log(data);
        const markers = data.map((pic) => ({
            lat: pic.loc.coordinates[1],
            lng: pic.loc.coordinates[0],
            clickHandler: (e) => clickHandler(e, pic.imageURL)
          })
        );
        this.setState({
          pics: data,
          markers: markers
        })
      })
  
  }

  createMarkers(ics) {

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
            detailedPicURL={ this.state.detailedPicURL }
          />
        </Row>
        <Row style={rowStyle}>
          <Details 
            detailedPicURL={ this.state.detailedPicURL }
            pics={ this.state.pics }
            showHideDetails={ this.showHideDetails }
          />
        </Row>
      </Grid>
    );
  }
}

const showHideDetails = function(e, imageURL) {
  if (e.preventDefault !== undefined) {
    e.preventDefault();
  }

  if (this.state.detailedPicURL === imageURL) {
    const detailedPicURL = 'NONE';
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    setTimeout(() => this.setState({detailedPicURL}), 322);

  } else {
    const detailedPicURL = imageURL;
    const coordinates = this.state.pics.filter(pic => pic.imageURL === imageURL)[0].loc.coordinates;
    const position = {
      lat: coordinates[1],
      lng: coordinates[0]
    }
    this.setState({
      detailedPicURL,
      position,
      zoom: 10
    });
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}