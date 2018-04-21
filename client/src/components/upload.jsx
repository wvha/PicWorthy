import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

class Upload extends Component {
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
      loading: false
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

    this.setState({
      loading: true
    })

    axios.post(`/api/upload`, {
      category: this.state.category,
      location: this.state.location,
      imageURL: this.state.imageURL,
      description: this.state.description,
      user_id: this.props.userData._id,
      username: this.props.userData.username
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({
          submitted: 'Successfully uploaded!',
          loading: false
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
      <Grid>
        <Row style={{minHeight: `calc(100vh - 150px)`, paddingTop: `15px`}}>
          <Col xs={9} md={4} style={{height: `400px`}}> 
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

export default Upload;