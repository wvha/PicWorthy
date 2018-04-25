import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';

const Landing = () => (
  <div style={{ minHeight: `calc(100vh - 150px)` }}>
    
    <Carousel style={carouselStyle}>
      
      <Carousel.Item>
        
        <div style={divImgStyle1}>
          <img style={imgStyle} src="https://images.pexels.com/photos/7653/pexels-photo.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        </div>
        
        <Carousel.Caption>
          <h3>Golden Gate Bridge</h3>
          <p>Battery Spencer, Sausalito, CA</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        
        <div style={divImgStyle2}>
          <img style={imgStyle} src="https://www.californiabeaches.com/wp-content/uploads/2017/04/bigs-Lands-End-Beach-Labyrinth-with-Golden-Gate-Bridge-E1-Large-1000x610.jpg" />
        </div>
        
        <Carousel.Caption>
          <h3>Lands End Labyrinth</h3>
          <p>Lands End Trail, San Francisco, CA</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <div style={divImgStyle3}>
          <img style={imgStyle} src="https://upload.wikimedia.org/wikipedia/commons/5/55/20160124_GFJ2757-kerry-park-skyline_seattle-wa-panoramic.jpg" />
        </div>
        
        <Carousel.Caption>
          <h3>Seattle Skyline</h3>
          <p>Kerry Park, Seattle, WA</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <Jumbotron style={jumbotronStyle}>
      
      <h1>Explore the world. Share the adventure.</h1>
      
      <p>
        PicWorthy lets you share your favorite spots and find new spots worth visiting. <br />
        It gives you a map of locations and a preview of them through another person's lenses. <br />
        Discover places you never knew existed, right around the corner.
    </p>
    </Jumbotron>

  </div>
)

const carouselStyle = {
  height: "calc(100vh - 50px)",
  width: "100%",
  margin: "0px",
}

const imgStyle = {
  visibility: `hidden`
}

const jumbotronStyle = {
  backgroundColor: `inherit`,
  width: '80%',
  margin: 'auto',
  padding: '0px',
  textAlign: 'center'
}

const divImgStyle1 = {
  backgroundImage: `url(https://images.pexels.com/photos/7653/pexels-photo.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
  backgroundSize: `cover`,
  backgroundRepeat: `no-repeat`,
  width: `100%`,
  height: `calc(100vh - 50px)`,
  backgroundPosition: `50% 50%`
}

const divImgStyle2 = {
  backgroundImage: `url(https://www.californiabeaches.com/wp-content/uploads/2017/04/bigs-Lands-End-Beach-Labyrinth-with-Golden-Gate-Bridge-E1-Large-1000x610.jpg)`,
  backgroundSize: `cover`,
  backgroundRepeat: `no-repeat`,
  width: `100%`,
  height: `calc(100vh - 50px)`,
  backgroundPosition: `50% 50%`
}

const divImgStyle3 = {
  backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/5/55/20160124_GFJ2757-kerry-park-skyline_seattle-wa-panoramic.jpg)`,
  backgroundSize: `cover`,
  backgroundRepeat: `no-repeat`,
  width: `100%`,
  height: `calc(100vh - 50px)`,
  backgroundPosition: `50% 50%`
}

export default Landing;