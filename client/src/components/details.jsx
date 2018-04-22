import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FaIconPack, {FaStarO, FaStar, FaFacebookSquare, FaTwitter, FaYelp, FaInstagram} from 'react-icons/lib/fa';
import axios from 'axios';

const Details = ({ detailedPicURL, pics, showHideDetails }) => {

  let pic = getPic(detailedPicURL, pics);
  
  if (pic === 'NOT_FOUND') {
    return <div />;
  }

  return (
    <div>
      <br/>
      <Grid style={ {
        background: `linear-gradient(to right, #4cc7ff 0%, #99dfff  100%)`, 
        padding: `20px`, 
        width: `100vw`
      } }>
        <Row>
          <Col 
            md={ 6 } 
            mdPush={ 6 } 
            style={ {paddingRight: `100px`} }
          >
            <h1 style={ {fontFamily: `billabong`} }>
              {pic.location }
            </h1>
            <h4>
              Submitted by: { pic.username }
            </h4>
            <p>
              { pic.description } 
            </p>
            <br />
            <DisplayStar
              pic={ pic }
            />
            {/*
            <FaInstagram 
              style={ iconStyle}  
              size={ 30 } 
            />
            <FaFacebookSquare 
              style={ iconStyle } 
              size={ 30 } 
            /> 
            <FaTwitter 
              style={ iconStyle } 
              size={ 30 } 
            />
            <FaYelp 
              style={ iconStyle } 
              size={ 30 } 
            />
            */}
          </Col>
          <Col 
            md={ 6 } 
            mdPull={ 6 }
          >
            <span style={ imgSpanStyle }>
              <img 
                src={ pic.imageURL } 
                style ={ imgStyle }
              />
            </span>
          </Col>
        </Row>
      </Grid>
      <br />
    </div>
  )
};

const getPic = (url, pics) => {
  for (pic of pics) {
    if (pic.imageURL === url) {
      return pic;
    }
  }
  return 'NOT_FOUND';
}

const DisplayStar = ({ pic, handleStarClick }) => {
  if (pic.starred) {
    return (
      <FaStar 
        style={ iconStyle } 
        size={ 40 } 
        onClick={ (e) => handleStarClick(e, pic) }
      />
    )
  } else {
    return (
      <FaStarO
        style={ iconStyle } 
        size={ 40 } 
        onClick={ (e) => handleStarClick(e, details) } 
      /> 
    );
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