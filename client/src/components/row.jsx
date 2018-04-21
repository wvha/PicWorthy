import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import FaIconPack, {FaChevronRight, FaChevronLeft} from 'react-icons/lib/fa';
import Card from './card.jsx';
import axios from 'axios';

class Row extends Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    this.displayAmount;
    this.startIndex = 0;
    this.state = {
      picStatic: picsDb,
      picsDisplay: picsDb.slice(0, this.displayAmount), //picsDb
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
    console.log(this.props);
    if (this.props.rowType === 'user') {
      axios.get('/api/userposts', {username: this.props.data.username})
        .then(res => {
          console.log('set state in axios get req');
          this.setState({picsDisplay: res.data.slice(0, this.displayAmount)});
          this.setState({picStatic: res.data});
        });
    } else if (this.props.rowType === 'locations') {
      axios.get('/api/upload')
        .then((res) => {
          if (res.data.length > 0){
            this.setState({
              picsDisplay: res.data.slice(0, this.displayAmount),
              picStatic: res.data
            })
          }
        })
    }

    this.updateDisplayAmount();
    window.addEventListener('resize', this.updateDisplayAmount);
  }

  updateRow() {
    let displayArr = [];
    for (var i = 0; i < this.displayAmount; i++) {
      displayArr.push(this.state.picStatic[(this.startIndex + i) % this.state.picStatic.length]) // picsDb to picStatic
    }
    console.log('set state in update row');
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
      this.startIndex = this.startIndex - this.displayAmount + this.state.picStatic.length;
    } else {
      this.startIndex--;
    }
    this.updateRow();
  }

  render() {
    return (
      <div style={{textAlign: `center`}}>
        <FaChevronLeft onClick={this.handlePrevious} style={chevronStyle}/>
        {this.state.picsDisplay.map((pic, i) => {
          return <Card src={pic.imageURL} key={i} location={pic.location} username={pic.username} showDetails={this.props.showDetails} picDetails={pic}/>
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


export default Row;