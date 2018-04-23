import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';

import WorthyMap from './worthymap.jsx';
import PicRow from './picrow.jsx';
import Details from './details.jsx';
import fetchClosestPics from '../helpers/fetchClosestPics.jsx';
import getUserLocation from '../helpers/getUserLocation.jsx';
import { updateDisplayAmount } from '../helpers/picture.jsx';


export default class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: [],
      displayAmount: 0,
      markers: [],
      zoom: 4,
      position: {lat: 37.09, lng: -95.71},
      detailedPicURL: 'NONE',
      userData: props.userData,
      userLikes: props.userLikes
    };
    // props.userData.then((result) => this.setState({userData: result.data}));
    // props.userLikes.then((result) => this.setState({userLikes: result.data}));

    this.updatePictures = _.throttle(this.updatePictures.bind(this), 1000);
    this.rotatePics = rotatePics.bind(this);
    this.updateDisplayAmount = updateDisplayAmount.bind(this);
    this.getUserLocation = getUserLocation.bind(this);
    this.showHideDetails = showHideDetails.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
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

  handleStarClick(e, { category, location, imageURL, description, loc}) {

    axios.post('/api/favorites', {
      category,
      location,
      imageURL,
      description,
      user_id: this.state.userData._id,
      username: this.state.userData.username,
      latLng: {
        lat: loc.coordinates[1],
        lng: loc.coordinates[0]
      }
    })
      .then(({data}) => this.setState({userData: data}))
  }

  render() {
    const pics = this.state.userData.likes.slice(0, this.state.displayAmount);

    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <div>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>{this.props.userData.firstName}'s Favorites</h1>
        <br />
        </div>
        <PicRow 
          showHideDetails={ this.showHideDetails } 
          rowType="locations"
          pics={ pics }
          rotatePics={ this.rotatePics }
          detailedPicURL={ this.state.detailedPicURL }
        />
        <br/>
        <Details 
          detailedPicURL={ this.state.detailedPicURL }
          pics={ this.state.userData.likes }
          showHideDetails={ this.showHideDetails }
          handleStarClick={ this.handleStarClick }
          userFavorites={ this.state.userData.likes }
        />
      </div>
    )
    //               LOCATION RENDER          ///
    /*
    const pics = this.state.pics.slice(0, this.state.displayAmount);
    console.log(this.state.userData)
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
            handleStarClick={ this.handleStarClick }
            userFavorites={ this.state.userData.likes }
          />
        </Row>
      </Grid>
    );
  }
      */
      //            OLD LIKES RENDER                    //
      /*
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <div>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>{this.props.userData.firstName}'s Favorites</h1>
        <br />
        </div>
        <Row rowType="likes" userId={this.props.userData._id} showDetails={this.showDetails} />
        <br/>
        {this.renderClickedCard()}
      </div>
    )
  */
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
    //const coordinates = this.state.pics.filter(pic => pic.imageURL === imageURL)[0].loc.coordinates;
    // const position = {
    //   lat: coordinates[1],
    //   lng: coordinates[0]
    // }
    this.setState({
      detailedPicURL,
    //  position,
    //  zoom: 10
    });
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}

const rotatePics = function(e, direction) {
  e.preventDefault();

  let userData = Object.assign({}, this.state.userData);
  let pics = [...userData.likes];
  
  if (direction === 'LEFT') {
    pics.unshift(pics.pop());

  } else if (direction === 'RIGHT') {
    pics.push(pics.shift());
  }
  userData = Object.assign({}, userData, {likes: pics});
  this.setState({userData});
}

