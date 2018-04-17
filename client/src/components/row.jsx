import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import FaIconPack, {FaChevronRight, FaChevronLeft} from 'react-icons/lib/fa';

class Row extends Component {
  constructor(props) {
    super(props);
    this.displayAmount = 5;
    this.startIndex = 0;
    this.state = {
      picsDisplay: picsDb.slice(0, this.displayAmount)
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleNext() {
    let displayArr = [];
    this.startIndex++; 
    for (var i = 0; i < this.displayAmount; i++) {
      displayArr.push(picsDb[(this.startIndex + i) % picsDb.length])
    }
    this.setState({
      picsDisplay: displayArr
    });
  }

  handlePrevious() {
    if (this.startIndex < this.displayAmount) {
      this.startIndex = this.startIndex - this.displayAmount + picsDb.length;
    } else {
      this.startIndex -= 2;
    }
    this.handleNext();
  }

  render() {
    return (
      <div style={{ width: "1190px", margin: "auto"}}>
        <FaChevronLeft onClick={this.handlePrevious} style={chevronStyle}/>
        {this.state.picsDisplay.map((pic, i) => {
          return <img src={pic} key={i} style={{padding:"10px"}}/>
        })}
        <FaChevronRight onClick={this.handleNext} style={chevronStyle}/>
        <br/>
        <br/>
      </div>
    )
  }
}

const chevronStyle = {
  paddingRight:"45px", 
  paddingTop: "180px", 
  paddingBottom: "220px"
}

const picsDb = [
  'http://lorempixel.com/output/cats-h-c-200-400-1.jpg',
  'http://lorempixel.com/output/cats-h-g-200-400-7.jpg',
  'http://lorempixel.com/output/cats-h-c-200-400-2.jpg',
  'http://lorempixel.com/output/cats-h-g-200-400-6.jpg',
  'http://lorempixel.com/output/cats-h-c-200-400-3.jpg',
  'http://lorempixel.com/output/cats-h-g-200-400-1.jpg',
  'http://lorempixel.com/output/cats-h-c-200-400-4.jpg',
  'http://lorempixel.com/output/cats-h-g-200-400-3.jpg',
  'http://lorempixel.com/output/cats-h-c-200-400-5.jpg',
  'http://lorempixel.com/output/animals-h-g-200-400-5.jpg',
];

export default Row;