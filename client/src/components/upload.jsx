import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      location: '',
      imageURL: '',
      description: '',
      user_id: '',
      username: '',
      submitted: '',
      loading: false,
      latLng: {lat: null, lng: null},
      uploadStatus: []
    };
    this.getLink = this.getLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pinLocation = this.pinLocation.bind(this);
  }

  getLink(imgurLink) {
    this.setState({ imageURL: imgurLink })
  }

  pinLocation({lat, lng}) {
    this.setState({
      latLng: {
        lat: lat,
        lng: lng,
      }
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { category, location, description, imageURL, latLng} = this.state;

    let invalidFields = [];
    if (category === '') {
      invalidFields.push('Please enter a category');
    } 
    if (location === '') {
      invalidFields.push('Please enter a location');
    }
    //if (latLng.lat === null || latLng.lng === null) {
      //invalidFields.push('Please drop pin on location on the map');
    //}
    if (description === '') {
      invalidFields.push('Please enter a description');
    }
    if (imageURL === '') {
      invalidFields.push('Please upload a image')
    }
    if (invalidFields.length > 0) {
      this.setState({uploadStatus: invalidFields});
      return;
    } else {
      this.setState({uploadStatus: []})
    }

    this.setState({
      loading: true
    })

    axios.post(`/api/upload`, {
      category: category,
      location: location,
      imageURL: imageURL,
      description: description,
      user_id: this.props.userData._id,
      username: this.props.userData.username,
      latLng: {lat: 39, lng: -83}
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          submitted: 'Successfully uploaded!',
          loading: false
        })
      })
      .then(() => {
        this.setState({
          category: '',
          description: '',
          imageURL: ''
        })
      })
      .catch((err) => {
        this.setState({
          submitted: 'An error occurred. Please try again.',
          loading: false
        })
      })
  }

  render() {
    return (
      <Grid style={{minHeight: `calc(100vh - 130px)`}}>
        <Row style={{padding: `50px`}}>
          <Col xs={9} md={4} style={{height: `400px`}}> 
            <Worthymap 
              getLocationUpload={this.getLocationUpload}
              onMapClick={this.pinLocation}
              defaultZoom={10}
              defaultCenter={{lat: 80, lng: 80}}
              markers={[]}
            />
          </Col>
          <Col xs={6} md={4}>
            <DropZone getLink={this.getLink} />
          </Col>
          <Col xs={6} md={4}>
            <UploadForm
              category={this.state.category}
              location={this.state.location}
              imageURL={this.state.imageURL}
              description={this.state.description}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              uploadStatus={this.state.uploadStatus}
            />
            <br />
            <div style={{width: `100px`, margin: `auto`, position: `relative`, top:`80px`}}>
              <BeatLoader color={`#919295`} loading={this.state.loading} />
            </div>
            <div style={{textAlign: `center`, fontWeight: `bold`, fontSize: `large`, position: `relative`, top:`80px`}}>
              {this.state.submitted}
            </div>
          </Col>
        </Row>

      </Grid>
    )
  }
}

