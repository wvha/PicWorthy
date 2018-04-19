import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DisplayAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'waiting for info from database'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('displaying!');
    axios.get(`/upload`)
      .then(res => {
        this.setState({
          info: res.data
      });
      console.log(this.state.info);
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="submit"
            type="submit"
            value="Display"
            />
        </form><br></br>
        <div>
          {this.state.info.toString()}
        </div>
      </div>
    )
  }
}

export default DisplayAll;