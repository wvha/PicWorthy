import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Carousel style={carouselStyle}>
        <Carousel.Item>
          <img style={imgStyle} src="https://images.pexels.com/photos/7653/pexels-photo.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          <Carousel.Caption>
            <h3>Golden Gate Bridge</h3>
            <p>Battery Spencer, Sausalito, CA</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={imgStyle} src="https://www.californiabeaches.com/wp-content/uploads/2017/04/bigs-Lands-End-Beach-Labyrinth-with-Golden-Gate-Bridge-E1-Large-1000x610.jpg" />
          <Carousel.Caption>
            <h3>Lands End Labyrinth</h3>
            <p>Lands End Trail, San Francisco, CA</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img style={imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/5/55/20160124_GFJ2757-kerry-park-skyline_seattle-wa-panoramic.jpg" />
          <Carousel.Caption>
            <h3>Seattle Skyline</h3>
            <p>Kerry Park, Seattle, WA</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
      </Jumbotron>;
    </div>)
  }
};

const carouselStyle = {
  height: "500px",
  width: "100%",
  margin: "0px"
}

const imgStyle = {
  width: '100%',
  height: '500px',
  objectFit: 'cover'
}

export default Landing;