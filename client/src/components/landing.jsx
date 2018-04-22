import React, { Component } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { TransitionMotion, spring } from 'react-motion';
import NavBar from './navbar.jsx';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: [],
      now: 't0'
    }

    this.leavingSpringConfig = {stiffness: 60, damping: 15};

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  handleMouseMove({pageX, pageY}) {
    this.setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  willLeave(styleCell) {
    return Object.assign(
      {},
      styleCell.style,
      {
        opacity: spring(0, this.leavingSpringConfig),
        scale: spring(2, this.leavingSpringConfig)
      }
    )
  }

  render() {
    const {mouse: [mouseX, mouseY], now} = this.state;
    const styles = mouseX == null ? [] : [{
      key: now,
      style: {
        opacity: spring(1),
        scale: spring(0),
        x: spring(mouseX),
        y: spring(mouseY),
      }
    }];

    return (
      <TransitionMotion 
        willLeave={ this.willLeave }
        styles={ styles }
      >
        {circles =>
            <div>
            <div style={{backgroundColor: "transparent"}}>
              <NavBar 
                userData={this.props.userData}
                showLogin={this.props.showLogin}
                showSignup={this.props.showSignup}
                activeModal={this.props.activeModal}
                handleClose={this.props.handleClose}
                handleShow={this.props.handleShow}
                handleShowSignup={this.props.handleShowSignup}
                handleShowLogin={this.props.handleShowLogin}
                transparent={ true }
              />
            </div>
            <div
              onMouseMove={this.handleMouseMove}
              onTouchMove={this.handleTouchMove}
              className="demo7">
              {circles.map(({key, style: {opacity, scale, x, y}}) =>
                <div
                  key={key}
                  className="demo7-ball"
                  style={{
                    opacity: opacity,
                    scale: scale,
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  }} />
              )}
            </div>
            <Jumbotron style={ jumbotronStyle }>
            <a><h1>Explore</h1></a>
            <a><h1> Share</h1></a>
            <a><h1>Discover</h1></a>
          </Jumbotron>
            </div>
          }
          {/*
        <div style={ {minHeight: `calc(100vh - 150px)`} }> 
          <Carousel style={ carouselStyle }>
            <Carousel.Item>
              <img style={ imgStyle } src="https://images.pexels.com/photos/7653/pexels-photo.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
              <Carousel.Caption>
                <h3>Golden Gate Bridge</h3>
                <p>Battery Spencer, Sausalito, CA</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img style={ imgStyle } src="https://www.californiabeaches.com/wp-content/uploads/2017/04/bigs-Lands-End-Beach-Labyrinth-with-Golden-Gate-Bridge-E1-Large-1000x610.jpg" />
              <Carousel.Caption>
                <h3>Lands End Labyrinth</h3>
                <p>Lands End Trail, San Francisco, CA</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img style={ imgStyle } src="https://upload.wikimedia.org/wikipedia/commons/5/55/20160124_GFJ2757-kerry-park-skyline_seattle-wa-panoramic.jpg" />
              <Carousel.Caption>
                <h3>Seattle Skyline</h3>
                <p>Kerry Park, Seattle, WA</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <Jumbotron style={ jumbotronStyle }>
            <h1>Explore the world. Share the adventure.</h1>
            <p>
              PicWorthy lets you share your favorite spots and find new spots worth visiting. <br />
              It gives you a map of locations and a preview of them through another person's lenses. <br />
              Discover places you never knew existed, right around the corner.
          </p>
          </Jumbotron>
        </div>*/}
      </TransitionMotion>
    );
  }
}

const carouselStyle = {
  height: "500px",
  width: "30%",
  margin: "0px"
}

const imgStyle = {
  width: '100%',
  height: '500px',
  objectFit: 'cover'
}

const jumbotronStyle = {
  position: "absolute",
  left: '30px',
  top: '10%',
  color: `#00b0ff`,
  backgroundColor: `inherit`,
  margin: 'auto',
  padding: '0px',
  textAlign: 'left',
  fontFamily: `billabong`, fontSize: `250%`, color: `#00b0ff`, textShadow: `2px 1px #cccccc`, paddingTop:`20px`
}
