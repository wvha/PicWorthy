import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import WorthyMap from './worthymap.jsx';
import RowComp from './row.jsx';
import Details from './details.jsx';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 41.9, lng: -87.624},
      zoom: 5,
      detailProps: undefined,
      lastClickCard: undefined
    };
    this.showDetails = this.showDetails.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
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

  showDetails(e, props) {
    if (this.state.lastClickCard === undefined || this.state.lastClickCard.src !== props.src) {
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

  handleClickCard() {
    if (this.state.detailProps !== undefined) {
      return <Details info={this.state.detailProps}/>
    }
  }

  render() {
    return (
      <Grid style={{margin: `0`, width: `100vw`, paddingLeft: `0px`, paddingRight: `0px`}}>
        <Row style={{margin: `20px`}}>
          <WorthyMap 
            isForUploadPage={ false } position={this.state.position} zoom={this.state.zoom}
          />
        </Row>
        <div style={{textAlign: `center`, fontFamily: `billabong`, fontSize: `275%`, color: `#87ceff`}}>
          Around You
        </div>
        <Row style={rowStyle}>
          <RowComp showDetails={this.showDetails}/>
        </Row>
        <Row style={rowStyle}>
          {this.handleClickCard()}
        </Row>
      </Grid>
    );
  }
}

const rowStyle = {
  marginLeft: `0px`, 
  marginRight: `0px`
}