import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavbarComp from './components/navbar.jsx';
import { Navbar } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <NavbarComp />
        <div>did this render?</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
