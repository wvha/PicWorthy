import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';
import RowComp from './row.jsx';
import Details from './details.jsx';
import axios from 'axios';

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
    axios.patch('/api/favorites', {details: details, userData: this.state.userData})
      .then ((result) => {
        console.log(result.data);
        this.setState({
          userData: result.data
        })
      })
  }

  componentDidMount() {
    axios.get('/api/loggedInYet').then((result) => {
      this.setState({
        userData: result.data
      })
    });
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