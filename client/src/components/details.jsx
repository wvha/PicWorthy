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
    const { info } = this.props;

    return (
      <div>
        <br/>
        <Grid style={{backgroundColor: `rgba(135,206,255, 0.3)`, padding: `20px`, width: `100vw`}}>
          <Row>
            <Col md={6} mdPush={6} style={{paddingRight: `100px`}}>
              <h1 style={{fontFamily: `billabong`}}>
                {info.location}
              </h1>
              <h4>
                Submitted by: {info.username}
              </h4>
              <p>
                {/* random text */}
                Built purse maids cease her ham new seven among and. Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law. Wisdom happen suffer common the appear ham beauty her had. Or belonging zealously existence as by resources. 
              </p>
              {this.displayStar(info)}
              <FaInstagram style={iconStyle} size={30} />
              <FaFacebookSquare style={iconStyle} size={30} /> 
              <FaTwitter style={iconStyle} size={30} />
              <FaYelp style={iconStyle} size={30} />
            </Col>
            <Col md={6} mdPull={6}>
              <span style={imgSpanStyle}>
                <img src={info.src} style ={imgStyle}/>
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
}

const iconStyle ={
  paddingRight: `10px`
}

export default Details;