import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Details = ({info}) => (
  <div>
    {/* {rgba(150, 183, 192, 0.5)} */}
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
        </Col>
        <Col md={6} mdPull={6}>
          <span style={imgSpanStyle}>
            <img src={info.src} style ={imgStyle}/>
          </span>
        </Col>
      </Row>
    </Grid>
  </div>
);

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

export default Details;