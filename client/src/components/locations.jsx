import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';

import WorthyMap from './worthymap.jsx';
import PicRow from './picrow.jsx';
import Details from './details.jsx';
import fetchClosestPics from '../helpers/fetchClosestPics.jsx';


export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: [],
      markers: [],
      userMarker: [],
      zoom: 4,
      position: {lat: 37.09, lng: -95.71},
    };

    this.updatePictures = _.throttle(this.updatePictures.bind(this), 1000);
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

  updatePictures(lat, lng) {
    fetchClosestPics(lat, lng)
      .then(({data}) => this.setState({pics: data}))
  }

  render() {
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
            showDetails={ () => {} } 
            rowType="locations"
            pics={ this.state.pics }
            />
        </Row>
        <Row style={rowStyle}>
          {'renderclickedcard'}
        </Row>
      </Grid>
    );
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}


/*


export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 41.9, lng: -87.624},
      zoom: 5,
      detailProps: undefined,
      lastClickCard: undefined,
      starred: false,
      userData: {}
    };
    this.showDetails = this.showDetails.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
  }

  showDetails(e, props) {
    if (this.state.lastClickCard === undefined || this.state.lastClickCard.picDetails._id !== props.picDetails._id) {
      this.setState({
        detailProps: props,
        lastClickCard: props
      })
    } else {
      this.setState({
        detailProps: undefined,
        lastClickCard: undefined
      })
    } 
  }

  checkFavorites() {
    const photoArr = this.state.userData.photos;
    const img = this.state.detailProps.picDetails._id;
    return photoArr.indexOf(img) !== -1;
  }

  renderClickedCard() {
    if (this.state.detailProps !== undefined) {
      return <Details 
              picDetails={this.state.detailProps.picDetails} 
              initialStar={this.checkFavorites()} 
              handleStarClick={this.handleStarClick}
              changeStarState={this.changeStarState} />;
    }
  }

  handleStarClick(e, details) {
    axios.patch('/api/favorites', {details: details.picDetails, userData: this.state.userData})
      .then ((result) => {
        console.log(result.data);
        this.setState({
          userData: result.data
        })
      })
  }

  render() {
    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`, minHeight: `calc(100vh - 150px)`}}>
        <Row style={{margin: `20px`, height:`calc((100vh - 150px)/2)`, minHeight: `400px`}}>
          <WorthyMap 
            isForUploadPage={ false } position={this.state.position} zoom={this.state.zoom}
          />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`, color: `#32bfff`}}>
          Around You
        </div>
        <Row style={rowStyle}>
          <RowComp showDetails={this.showDetails} rowType="locations"/>
        </Row>
        <Row style={rowStyle}>
          {this.renderClickedCard()}
        </Row>
      </Grid>
    );
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}
*/