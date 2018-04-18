import React, { Component } from 'react';

const Card = ({src, location}) => (
  <span style={spanStyle}>
    <img src={src} style={imgStyle} />
    <br/> <br/>
    <div style={locationStyle}>{location}</div>
  </span>
)

const spanStyle ={
  display: `inline-block`,
  padding: `15px 15px 70px 15px`,
  height: `350px`,
  width: `250px`,
  border: `1px solid black`,  
  margin: `5px`,
  borderRadius: `3px`,
  boxShadow: `5px 5px 3px grey`,
  backgroundColor: `white`
}

const imgStyle = {
  border: `1px solid #555`,
  height: `100%`,
  width: `100%`,
  objectFit: `cover`
}

const locationStyle = {
  textTransform: `capitalize`,
  fontFamily: `billabong, Comic Sans MS, Arial, sans-serif`,
  fontWeight: `bold`,
  fontSize: `xx-large`
}

export default Card;