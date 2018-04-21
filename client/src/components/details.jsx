import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FaIconPack, {FaStarO, FaStar, FaFacebookSquare, FaTwitter, FaYelp, FaInstagram} from 'react-icons/lib/fa';
import axios from 'axios';

const Details = (props) => (
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
            { props.picDetails.location }
          </h1>
          <h4>
            Submitted by: { props.picDetails.username }
          </h4>
          <p>
            { props.picDetails.description } 
          </p>
          <br />
          <DisplayStar
            details={ props.picDetails }
            initialStar={ props.initialStar }
            handleStarClick={ props.handleStarClick }
          />
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
        </Col>
        <Col 
          md={ 6 } 
          mdPull={ 6 }
        >
          <span style={ imgSpanStyle }>
            <img 
              src={ props.picDetails.imageURL } 
              style ={ imgStyle }
            />
          </span>
        </Col>
      </Row>
    </Grid>
    <br />
  </div>
);

const DisplayStar = (props) => {
  if (props.initialStar) {
    return (
      <FaStar 
        style={ iconStyle } 
        size={ 30 } 
      />
    )
  } else {
    return (
      <FaStarO
        style={ iconStyle } 
        size={ 30 } 
        onClick={ (e) => props.handleStarClick(e, propsdetails) } 
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