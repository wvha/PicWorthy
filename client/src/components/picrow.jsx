import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import FaIconPack, {FaChevronRight, FaChevronLeft} from 'react-icons/lib/fa';
import Card from './card.jsx';


const PicRow = ({ pics, rotatePics,showHideDetails, detailedPicURL }) => {
    
  const cards = pics.map((pic, i) => (
    <Card 
      key={i} 
      showHideDetails={ showHideDetails } 
      picDetails={pic}
      selected={ pic.imageURL === detailedPicURL }
    />
  ));

  return (
    <div style={{textAlign: `center`}}>
      <a href='#'><FaChevronLeft
        onClick={(e) => rotatePics(e, 'LEFT')} 
        style={chevronStyle}
      /></a>
      { cards }
      <a href='#'><FaChevronRight
        onClick={(e) => rotatePics(e, 'RIGHT')} 
        style={chevronStyle}
      /></a>
      <br/>
      <br/>
    </div>
  )

}


const chevronStyle = {
  verticalAlign: `top`,
  paddingRight: `45px`,
  paddingTop: `170px`,
  paddingBottom: `180px`,
  display: `inline-block`,
  margin: `5px`
}

const picsDb = [
  {imageURL: 'http://lorempixel.com/output/cats-h-c-200-400-1.jpg', username: 'anna banana', location: 'Armsterdam'},
  {imageURL: 'http://lorempixel.com/output/cats-h-g-200-400-7.jpg', username: 'anna banana', location: 'Belgium'},
  {imageURL: 'http://lorempixel.com/output/cats-h-c-200-400-2.jpg', username: 'anna banana', location: 'China'},
  {imageURL: 'http://lorempixel.com/output/cats-h-g-200-400-6.jpg', username: 'anna banana', location: 'Denmark'},
  {imageURL: 'http://lorempixel.com/output/cats-h-c-200-400-3.jpg', username: 'anna banana', location: 'Ethiopia'},
  {imageURL: 'http://lorempixel.com/output/cats-h-g-200-400-1.jpg', username: 'anna banana', location: 'France'},
  {imageURL: 'http://lorempixel.com/output/cats-h-c-200-400-4.jpg', username: 'anna banana', location: 'Germany'},
  {imageURL: 'http://lorempixel.com/output/cats-h-g-200-400-3.jpg', username: 'anna banana', location:'Italy'},
  {imageURL: 'http://lorempixel.com/output/cats-h-c-200-400-5.jpg', username: 'anna banana', location:'Japan'},
  {imageURL: 'http://lorempixel.com/output/animals-h-g-200-400-5.jpg', username: 'anna banana', location: 'Korea'},
];

export default PicRow;