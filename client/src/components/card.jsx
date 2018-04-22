import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => (
  <span style={ spanStyle } onClick={ (e)=>{props.showDetails(e, props)} }>
    <img src={ props.picDetails.imageURL } style={ imgStyle } />
    <br/> <br/>
    <div style={ locationStyle }>{ props.picDetails.location }</div>
  </span>
)

Card.propTypes = {
  picDetails: PropTypes.shape({
    location: PropTypes.string,
    imageURL: PropTypes.string
  }).isRequired,
  showDetails: PropTypes.func.isRequired
}

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