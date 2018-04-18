import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import FaIconPack, {FaChevronRight, FaChevronLeft} from 'react-icons/lib/fa';
import Card from './card.jsx';

class Row extends Component {
  constructor(props) {
    super(props);
    this.displayAmount;
    this.startIndex = 0;
    this.state = {
      picsDisplay: picsDb.slice(0, this.displayAmount)
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.updateDisplayAmount = this.updateDisplayAmount.bind(this);
    this.updateRow = this.updateRow.bind(this);
  }

  updateDisplayAmount() {
    // 90 is based on chevron padding
    // 250 based on width of cards
    this.displayAmount = Math.floor((window.innerWidth - 90)/250);
    this.updateRow();
  }

  componentDidMount() {
    this.updateDisplayAmount();
    window.addEventListener('resize', this.updateDisplayAmount)
  }

  updateRow() {
    let displayArr = [];
    for (var i = 0; i < this.displayAmount; i++) {
      displayArr.push(picsDb[(this.startIndex + i) % picsDb.length])
    }
    this.setState({
      picsDisplay: displayArr
    });
  }

  handleNext() {
    this.startIndex++; 
    this.updateRow();
  }

  handlePrevious() {
    if (this.startIndex < this.displayAmount) {
      this.startIndex = this.startIndex - this.displayAmount + picsDb.length;
    } else {
      this.startIndex--;
    }
    this.updateRow();
  }

  render() {
    return (
      <div style={{textAlign: `center`}}>
        <FaChevronLeft onClick={this.handlePrevious} style={chevronStyle}/>
        {/* {this.state.picsDisplay.map((pic, i) => {
          return <img src={pic} key={i} style={{padding:`10px`}}/>
        })} */}
        {this.state.picsDisplay.map((pic, i) => {
          return <Card src={pic.src} key={i} location={pic.location}/>
        })}
        <FaChevronRight onClick={this.handleNext} style={chevronStyle}/>
        <br/>
        <br/>
      </div>
    )
  }
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
  {src: 'http://lorempixel.com/output/cats-h-c-200-400-1.jpg', location: 'Armsterdam'},
  {src: 'http://lorempixel.com/output/cats-h-g-200-400-7.jpg', location: 'Belgium'},
  {src: 'http://lorempixel.com/output/cats-h-c-200-400-2.jpg', location: 'China'},
  {src: 'http://lorempixel.com/output/cats-h-g-200-400-6.jpg', location: 'Denmark'},
  {src: 'http://lorempixel.com/output/cats-h-c-200-400-3.jpg', location: 'Ethiopia'},
  {src: 'http://lorempixel.com/output/cats-h-g-200-400-1.jpg', location: 'France'},
  {src: 'http://lorempixel.com/output/cats-h-c-200-400-4.jpg', location: 'Germany'},
  {src: 'http://lorempixel.com/output/cats-h-g-200-400-3.jpg', location:'Italy'},
  {src: 'http://lorempixel.com/output/cats-h-c-200-400-5.jpg', location:'Japan'},
  {src: 'http://lorempixel.com/output/animals-h-g-200-400-5.jpg', location: 'Korea'},
];


export default Row;