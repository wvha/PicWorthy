import React, { Component } from 'react';
import axios from 'axios';

class UploadForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Category
          <input
            name="category"
            type="text"
            value={this.props.category}
            onChange={this.props.handleInputChange} />
        </label><br></br>
        <label>
          Location
          <input
            name="location"
            type="text"
            value={this.props.location}
            onChange={this.props.handleInputChange} />
        </label><br></br>
        <label>
          Image URL
          <input
            name="imageURL"
            type="text"
            value={this.props.imageURL}
            onChange={this.props.handleInputChange} />
        </label><br></br>
        <label>
          Description
          <input
            name="description"
            type="text"
            value={this.props.description}
            onChange={this.props.handleInputChange} />
        </label><br></br>
        <input
          name="submit"
          type="submit" />
      </form>
    );
  }
}

export default UploadForm;