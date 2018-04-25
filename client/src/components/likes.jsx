// CAN BE DELETED

import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';

import WorthyMap from './worthymap.jsx';
import PicRow from './picrow.jsx';
import Details from './details.jsx';
import fetchClosestPics from '../helpers/fetchClosestPics.jsx';
import getUserLocation from '../helpers/getUserLocation.jsx';


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

    this.setState({
      detailedPicURL,
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






const likesRender = function() {
  const pics = this.state.userData.likes.slice(0, this.state.displayAmount);

  return (
    <div style={{minHeight: `calc(100vh - 150px)`}}>
      <div>
      
      <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>
      {this.props.userData.firstName}'s Favorites</h1>
      
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
}

export default likesRender;

