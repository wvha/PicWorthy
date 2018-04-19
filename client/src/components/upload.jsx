import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      location: '',
      imageURL: '',
      description: '',
    };

  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);  
  }

handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState ({
    [name]: value
  });
}

handleSubmit(event) {
  event.preventDefault();
  console.log('submitted!');
  axios.post(`/upload`, { 
    category: this.state.category,
    location: this.state.location,
    imageURL: this.state.imageURL,
    description: this.state.description
   })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Category
          <input
            name="category"
            type="text"
            value={this.state.category}
            onChange={this.handleInputChange} />
        </label><br></br>
        <label>
          Location
          <input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.handleInputChange} />
        </label><br></br>
        <label>
           Image URL
          <input
            name="imageURL"
            type="text"
            value={this.state.imageURL}
            onChange={this.handleInputChange} />
        </label><br></br>
        <label>
          Description
          <input
           name="description"
           type="text"
           value={this.state.description}
           onChange={this.handleInputChange} />
        </label><br></br>
        <input
          name="submit"
          type="submit" />
      </form>
    );
  }
}

export default UploadForm;