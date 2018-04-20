import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      location: '',
      imageURL: '',
      description: '',
      submitted: '',
    };
    this.getLink = this.getLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLink(imgurLink) {
    this.setState({ imageURL: imgurLink })
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
    console.log('submitted!');
    axios.post(`/api/upload`, {
      category: this.state.category,
      location: this.state.location,
      imageURL: this.state.imageURL,
      description: this.state.description
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          submitted: 'Successfully uploaded!'
        })
      })
      .catch((err) => {
        this.setState({
          submitted: 'An error occurred. Please try again.'
        })
      })
  }

  render() {
    return (
      <Grid>
        <Row style={{height: `calc(100vh - 130px)`, paddingTop:`20px`}}>
          <Col xs={9} md={4}>
            <Worthymap isForUploadPage={true} />
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
            />
            <br />
            <div style={{textAlign: `center`, fontWeight: `bold`, fontSize: `large`}}>{this.state.submitted}</div>
          </Col>
        </Row>

      </Grid>
    )
  }
}

export default Upload;