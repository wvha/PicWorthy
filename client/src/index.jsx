import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Signup from './components/signup.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>did this render?
        <Signup />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
