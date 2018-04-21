import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FaIconPack, {FaStarO, FaStar, FaFacebookSquare, FaTwitter, FaYelp, FaInstagram} from 'react-icons/lib/fa';
import axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);
  }

  displayStar(details) {
    if (this.props.initialStar) {
      return <FaStar style={iconStyle} size={30} />
    } else {
      return <FaStarO style={iconStyle} size={30} onClick={(e) => {this.props.handleStarClick(e, details)}}/> ;
    }
  }

  render() {
    return (
      <div>
        <br/>
        <Grid style={{background: `linear-gradient(to right, #00b0ff 0%, #00d7ff  100%)`, padding: `20px`, width: `100vw`}}>
          <Row>
            <Col md={6} mdPush={6} style={{paddingRight: `100px`}}>
              <h1 style={{fontFamily: `billabong`}}>
                {this.props.picDetails.location}
              </h1>
              <h4>
                Submitted by: {this.props.picDetails.username}
              </h4>
              <p>
                {this.props.picDetails.description} 
              </p>
              <br />
              {this.displayStar(this.props.picDetails)}
              <FaInstagram style={iconStyle} size={30} />
              <FaFacebookSquare style={iconStyle} size={30} /> 
              <FaTwitter style={iconStyle} size={30} />
              <FaYelp style={iconStyle} size={30} />
            </Col>
            <Col md={6} mdPull={6}>
              <span style={imgSpanStyle}>
                <img src={this.props.picDetails.imageURL} style ={imgStyle}/>
              </span>
            </Col>
          </Row>
        </Grid>
        <br />
      </div>
    )
  }
}

const imgSpanStyle= {
  display: `inline-block`,
  float: `right`,
  padding: `15px`,
  backgroundColor: `white`,
  borderRadius: `3px`,
  border: `2px solid black`
}

const imgStyle = {
  border: `1px solid black`,
  height: `100%`,
  width: `100%`,
  objectFit: `contain`
}

const iconStyle ={
  paddingRight: `10px`
}

export default Details;