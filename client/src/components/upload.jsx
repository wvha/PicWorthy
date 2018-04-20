import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      location: '',
      imageURL: '',
      description: '',
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
      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} md={4}>
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
          </Col>
        </Row>

      </Grid>
    )
  }
}

export default Upload;